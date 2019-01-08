import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import { ApiResponse, IApiResponse } from "../shared/api-response.model";
import { BaseApp } from "../shared/base-app.model";
import { Subject } from "rxjs";

@Injectable()
export class AuthenticationService {

    isLoggedIn: Subject<boolean> = new Subject<boolean>();

    constructor(private _http: Http, private _base: BaseApp) { }

    authenticateUser(email: string, password: string): Promise<boolean> {

        return new Promise((resolve, reject) => {
            var uri = this._base.Url + 'user/AuthenticateUser?email=' + email + '&password=' + password;
            this._http.post(uri,{}).subscribe(
                (response) => {
                    var resJson = response.json();
                    localStorage.setItem('token',resJson.token);
                    resolve(true);
                },
                (error) => {
                    reject(error);
                });
        });
    }

    logout(){
        localStorage.removeItem('token');
        this.isLoggedIn.next(this.isAuthenticated());
    }

    getToken(){
        return localStorage.getItem('token');
    }

    isAuthenticated() {
        var token = localStorage.getItem('token');
        if(token != null && token != undefined){
            return true;
        }else{
            return false;
        }
    }
}