class ApiError extends Error {
    public statusCode: number;
    public success: boolean;
    public errors: string[]
    constructor(message: string = "Something went wrong", statusCode: number = 500, errors: string[] = []) {
        super(message);
        this.statusCode = statusCode;
        this.success = false;
    }
}
export default ApiError;