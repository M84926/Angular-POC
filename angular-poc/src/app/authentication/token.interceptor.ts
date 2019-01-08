import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { catchError } from 'rxjs/operators/catchError';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    //   constructor(public auth: AuthenticationService) {}

    auth: AuthenticationService;

    constructor(inj: Injector, private router: Router) {
        this.auth = inj.get(AuthenticationService)
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request).pipe(
            catchError((err: string, caught: Observable<any>) => this.handleHttpClientError(err, caught))
        );
    }

    handleHttpClientError(err: any, caught: Observable<any>) {
        if (err.status === 401 || err.status === 403) {
            this.auth.logout();
            //navigate /delete cookies or whatever
            this.router.navigateByUrl(`/`);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
           // return Observable. .of(err.message);
        }
        return Observable.throw(err);
        // or return Observable.throw('Auth error');
    }
}