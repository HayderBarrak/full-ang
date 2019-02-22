import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';
import {User} from "@app/shared/user/User.model";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
private username: string;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {
    return this.http.post<any>(`/api/api/authenticate`, { username, password })
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.id_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', user.id_token);
              localStorage.setItem('currentUser', JSON.stringify({username: username , token: user.id_token}));

              this.currentUserSubject.next(user);
          }

          return user;
        }));
  }



  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
