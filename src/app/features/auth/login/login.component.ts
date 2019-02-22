import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {loginService} from "@app/features/auth/login/login.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {StateStorageService} from "@app/features/auth/access/state-storage.service";
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@app/core/services";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    password: string;
    rememberMe: boolean;
    username: string;


  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthService)
  {
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['dashboard/analytics']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }


    get f() { return this.loginForm.controls; }




    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['dashboard/analytics']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }







  //
  // login(){
  //     this.loginservice.login(this.username,this.password).pipe(first()).
  //         subscribe(
  //             data =>
  //                 this.router.navigate(['home'])
  //     )
  // }




  // login() {
  //   this.loginservice.attemptAuth(this.username, this.password).subscribe(
  //       data => {
  //         this.token.saveToken(data.token);
  //        console.log("works");
  //        this.router.navigate(['home'])
  //       }
  //   );
  // }

    // login() {
    //     this.loginservice
    //         .login({
    //             username: this.username,
    //             password: this.password,
    //             rememberMe: this.rememberMe
    //         })
    //         .then(() => {
    //             this.authenticationError = false;
    //             this.activeModal.dismiss('login success');
    //             if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
    //                 this.router.navigate(['']);
    //             }
    //
    //
    //             // previousState was set in the authExpiredInterceptor before being redirected to login modal.
    //             // since login is successful, go to stored previousState and clear previousState
    //             const redirect = this.stateStorageService.getUrl();
    //             if (redirect) {
    //                 this.stateStorageService.storeUrl(null);
    //                 this.router.navigate([redirect]);
    //             }
    //         })
    //         .catch(() => {
    //             this.authenticationError = true;
    //         });
    //     this.router.navigate(['home'])
    // }
    //
    //
    //




   // login(event){
    // event.preventDefault();
    //



}
