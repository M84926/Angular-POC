import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouting } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HomeComponent } from './home/home.component';
import { BaseApp } from './shared/base-app.model';
import { AuthGuard } from './shared/auth-gaurd.service';
import { KendoGridExampleComponent } from './kendo-grid-example/kendo-grid-example.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './kendo-grid-example/user.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './authentication/token.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    KendoGridExampleComponent,
    HeaderComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule ,
    ReactiveFormsModule,
    AppRouting,
    GridModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService, BaseApp, AuthGuard, UserService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
