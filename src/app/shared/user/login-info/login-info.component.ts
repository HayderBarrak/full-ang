import {Component, OnInit} from '@angular/core';
import { UserService } from '@app/core/services/user.service';
import { LayoutService } from '@app/core/services/layout.service';
import {AuthService} from "@app/core/services";
import {BehaviorSubject} from "rxjs";
import {User} from "@app/shared/user/User.model";

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {
  connectedUser = JSON.parse(localStorage.getItem('currentUser')).username;

  constructor(
    public us: UserService,
              private authser: AuthService,
              private layoutService: LayoutService) {

  }

  ngOnInit() {
    console.log(this.connectedUser);
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
