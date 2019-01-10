import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseApp } from "../shared/base-app.model";
import { ApiResponse, IApiResponse } from "../shared/api-response.model";

@Injectable()
export class UserService {

    constructor(private _http: HttpClient, private _base: BaseApp) { }

    getUsers(skip = 1, take = 99999, orderBy = 'firstName=asc') {
debugger;
        return new Promise((resolve, reject) => {

            var uri = this._base.Url + 'user/GetAllUsers'
            uri += '?skip=' + skip + '&take=' + take;
            uri += '&orderBy=' + orderBy ;

            this._http.get(uri).subscribe((response: IApiResponse) => {
                resolve(response);
            });
        });
    }



}