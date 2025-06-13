// Films module

// • Views – save the filter and sorting combination, by hitting a Save
// filter button which open a modal with a text field to take the view name. There should
// be a button in the list page called views, on clicking it should open a right panel with
// the list of saved views, I can run any saved view instantly by clicking on the saved
// view. When I run a view, it should also update the filter conditions.
// • Movie details - On clicking a film, a right panel with multiple tabs should open. The
// first tab should display the film info. The next tab should display the actors.
import prisma from "../config/prisma.config";
import asyncHandler from "../helper/asyncHandler";
import { Request, Response } from "express";

// • List - list all the films with title, release year, language, length, replacement cost and rating.
// • Sort - sort the columns title, release year, language, length and
// rating.
// • Filter -filter films by category, language, release year, length
// (greater than, less than, equal to) and actor. Multiple filter conditions should work in
// AND mode.
type FilmSort = {
    title?: 'asc' | 'desc';
    release_year?: 'asc' | 'desc';
    language?: 'asc' | 'desc';
    length?: 'asc' | 'desc';
    rating?: 'asc' | 'desc';
};
type searchFilter = {
    page: number;
    sort: FilmSort;
    category: string[];
    language: string;
    release_year: number;
    min_length: number;
    max_length: number;
}

export const getFilms = asyncHandler(async (req: Request, res: Response) => {
    const LIMIT = 10;
    const { page = 1, sort = { title: 'asc' }, category, language, release_year, min_length = 0, max_length }: searchFilter = req.body;
    const films = await prisma.film.findMany({
        where: {
            AND: [
                category ? {
                    film_category: {
                        some: { category: { name: category } }
                    }
                } : {},
                language ? {
                    language_film_language_idTolanguage: {
                        name: language,
                    },
                } : {},
                release_year ? { release_year: release_year } : {},
                min_length ? { length: { gte: min_length } } : {},
                max_length ? { length: { lte: max_length } } : {},
            ],
        },
        select: {
            title: true,
            release_year: true,
            length: true,
            replacement_cost: true,
            rating: true,
            language_film_language_idTolanguage: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: [
            sort.title ? { title: sort.title } : {},
            sort.release_year ? { release_year: sort.release_year } : {},
            sort.language
                ? {
                    language_film_language_idTolanguage: {
                        name: sort.language,
                    },
                }
                : {},
            sort.length ? { length: sort.length } : {},
            sort.rating ? { rating: sort.rating } : {},
        ],
        skip: (page - 1) * LIMIT,
        take: LIMIT
    });
    return res.send(films)
})


