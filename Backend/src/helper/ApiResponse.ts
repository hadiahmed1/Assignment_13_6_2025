class ApiResponse {
    message: string;
    statusCode: number;
    data: object;
    constructor(message: string, statusCode: number = 200, data?: object) {
        this.message = message || "";
        this.statusCode = statusCode;
        this.data = data || {};
    }
}

export default ApiResponse;