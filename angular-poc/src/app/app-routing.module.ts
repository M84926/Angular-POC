import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthenticationComponent } from "./authentication/authentication.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./shared/auth-gaurd.service";
import { KendoGridExampleComponent } from "./kendo-grid-example/kendo-grid-example.component";
import { KendoServerPagingComponent } from "./kendo-server-paging/kendo-server-paging.component";

const appRoutes = [
    { path: '', component: AuthenticationComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'kendo-grid-example', component: KendoGridExampleComponent, canActivate: [AuthGuard] },
    { path: 'kendo-server-paging', component: KendoServerPagingComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting {

}