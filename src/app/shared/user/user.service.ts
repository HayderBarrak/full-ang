import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import {createRequestOption} from "@app/shared/utils/request-util";
import { IUser} from "@app/shared/user/User.model";
import {LocalStorageService} from "ngx-webstorage";

@Injectable({ providedIn: 'root' })
export class UserService {



    constructor(private http: HttpClient, private localStorage: LocalStorageService ) {}

    create(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>('api/api/users', user, { observe: 'response' });
    }

    update(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>('api/api/users', user, { observe: 'response' });
    }

    find(login: string): Observable<HttpResponse<IUser>> {
        return this.http.get<IUser>(`${'api/api/users'}/${login}`, { observe: 'response' });
    }

    query(req?: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(req);
        const headers = {"Authorization" : 'Bearer ' + localStorage.getItem('token')}
        return this.http.get<IUser[]>('/api/api/users', { params: options, observe: 'response',headers: headers });
    }

    delete(login: string): Observable<HttpResponse<any>> {
        return this.http.delete(`${'/api/api/users'}/${login}`, { observe: 'response' });
    }

    authorities(): Observable<string[]> {
        return this.http.get<string[]>('api/api/users/authorities');
    }
}
