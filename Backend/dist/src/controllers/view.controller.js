import prisma from "../config/prisma.config";
import asyncHandler from "../helper/asyncHandler";
export const addView = asyncHandler(async (req, res) => {
    const data = req.body;
    await prisma.view.create({ data });
    return ("okay");
});
