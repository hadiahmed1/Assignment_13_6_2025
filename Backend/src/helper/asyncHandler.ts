import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .catch(error => {
                console.error(error);
                res.status(error.statusCode || 500).json({
                    success: false,
                    message: (error as Error).message,
                    errors: error.errors
                });
            });
    };

export default asyncHandler;