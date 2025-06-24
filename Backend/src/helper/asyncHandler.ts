import { Request, Response, NextFunction } from "express";
type Controller = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<Response | void | string>;
const asyncHandler = (fn: Controller) =>
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