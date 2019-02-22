import {AfterViewInit, Component, ElementRef, OnInit, Renderer, TemplateRef} from '@angular/core';
import {Router} from "@angular/router";


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {RegisterService} from "@app/core/services/Register.service";
import {HttpErrorResponse} from "@angular/common/http";
import {EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE} from "@app/app.constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit, AfterViewInit {
  confirmPassword: string;
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  registerAccount: any;
  success: boolean;

  bsModalRef: BsModalRef;
  public termsAgreed = false

  constructor(
      private registerservice: RegisterService,
    private router: Router,  
    private modalService: BsModalService,
      private elementRef: ElementRef,
      private renderer: Renderer) {}
 
   ngOnInit() {
     this.success = false;
     this.registerAccount = {};
   }
  //
  // register(event){
  //   event.preventDefault();
  //   this.router.navigate(['/dashboard'])
  // }

  register(){
    if (this.registerAccount.password !== this.confirmPassword){
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      this.registerAccount.langKey = 'en';
      this.registerservice.save(this.registerAccount).subscribe(
          () => {
            this.success = true;
          },
          response => this.processError(response)
      );
    }
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }

  openModal(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.bsModalRef = this.modalService.show(template);
  }

  onTermsAgree(){
    this.termsAgreed = true
    this.bsModalRef.hide()
  }

  onTermsClose(){
    this.bsModalRef.hide()
  }

  ngAfterViewInit() {
  }


}
