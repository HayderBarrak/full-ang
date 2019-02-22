import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import {UserModule} from "../../../blank/src/app/shared/user/user.module";
import {FormsModule} from "@angular/forms";

import {UserService} from "@app/shared/user/user.service";
import {AccountService} from "@app/features/auth/access/account.service";
import {UserRouteAccessService} from "@app/features/auth/access/user-route-access-service";
import {StateStorageService} from "@app/features/auth/access/state-storage.service";
import {LoginModalService} from "@app/features/auth/login/login-modal.service";
import {loginService} from "@app/features/auth/login/login.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {LoginComponent} from "@app/features/auth/login/login.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { AuthService} from "@app/core/services";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "@app/features/auth/login/jwt.interceptor";
import {AuthGuard} from "@app/core/guards/auth.guard";




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
      UserModule,
      FormsModule
  ],
  providers: [
      UserService,AccountService,UserRouteAccessService,StateStorageService,LoginModalService,loginService,LocalStorageService,SessionStorageService,AuthService,AuthGuard],
  bootstrap: [AppComponent],})
export class AppModule { }
