const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(error => {
        console.error(error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message,
            errors: error.errors
        });
    });
};
export default asyncHandler;
