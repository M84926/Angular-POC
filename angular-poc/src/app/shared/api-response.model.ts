export interface IApiResponse{
    isSuccess: boolean,
    data: any[],
    message: string[]
}

export class ApiResponse {

    public success: boolean;
    public message: string[];
    public data: any[];

    // constructor(isSuccess: boolean, data: [], message: []){
    //     this.success = isSuccess;
    //     this.message = message;
    //     this.data = data;
    // }

    constructor(apiResponse: IApiResponse){
        this.success = apiResponse.isSuccess;
        this.message = apiResponse.message;
        this.data = apiResponse.data;
    }
}