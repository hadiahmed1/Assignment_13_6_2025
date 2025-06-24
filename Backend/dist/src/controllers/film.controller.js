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
import ApiResponse from "../helper/ApiResponse";
export const getFilms = asyncHandler(async (req, res) => {
    const LIMIT = 10;
    const { page } = req.params || 1;
    const { sort, sortby, category, language, release_year, min_length = 0, max_length } = req.body;
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
                min_length ? { length: { gte: Number(min_length) } } : {},
                max_length ? { length: { lte: Number(max_length) } } : {},
            ]
        },
        select: {
            film_id: true,
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
            sortby === 'title' ? { title: sort } : {},
            sortby === 'release_year' ? { release_year: sort } : {},
            sortby === 'language'
                ? {
                    language_film_language_idTolanguage: {
                        name: sort,
                    },
                }
                : {},
            sortby === 'length' ? { length: sort } : {},
            sortby === 'rating' ? { rating: sort } : {},
        ],
        skip: (Number(page) - 1) * LIMIT,
        take: LIMIT
    });
    return res.send(new ApiResponse("Films fetched successfully", 200, { films }));
});
export const getFilmDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const film = await prisma.film.findFirst({
        where: { film_id: Number(id) },
        select: {
            film_id: true,
            title: true,
            release_year: true,
            length: true,
            replacement_cost: true,
            rating: true,
            description: true,
            film_actor: {
                select: {
                    actor: true,
                }
            },
            film_category: {
                select: {
                    category: true
                }
            },
            rental_rate: true,
            inventory: true,
            language_film_language_idTolanguage: {
                select: {
                    name: true,
                },
            },
        },
    });
    return res.json(new ApiResponse(film?.title || "", 200, { film }));
});
