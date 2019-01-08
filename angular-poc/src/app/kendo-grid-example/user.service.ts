import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApp } from "../shared/base-app.model";
import { ApiResponse, IApiResponse } from "../shared/api-response.model";

@Injectable()
export class UserService {

    constructor(private _http: HttpClient, private _base: BaseApp) { }

    getUsers() {
        
        return new Promise((resolve,reject) => {
            var uri = this._base.Url + 'user/GetAllUsers';
            this._http.get(uri).subscribe((response: IApiResponse) => {
                resolve(response);
            });
        });        
    }

}