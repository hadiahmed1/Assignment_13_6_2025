import prisma from "../config/prisma.config";
import asyncHandler from "../helper/asyncHandler";
import { Request, Response } from "express";

export const addView = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    await prisma.view.create({data})
    return("okay")
})