interface ApiResponseData {
    status: number;
    message?: string | any[];
    data?: any;
}

class ApiResponse implements ApiResponseData {
    constructor(public status: number, public message: string = "", public data: any = null) {
        
    }
}

class ApiError extends ApiResponse {
    constructor(status: number, message: string = "", data: any = null) {
        super(status, message, data);
    }
}

export { ApiResponse, ApiError };