class ApiResponse {
    message;
    statusCode;
    data;
    constructor(message, statusCode = 200, data) {
        this.message = message || "";
        this.statusCode = statusCode;
        this.data = data || {};
    }
}
export default ApiResponse;
