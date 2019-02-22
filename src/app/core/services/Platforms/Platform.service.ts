import {Injectable} from "@angular/core";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";
import {IUser} from "@app/shared/user/User.model";
import {createRequestOption} from "@app/shared/utils/request-util";
import {PlatformModel} from "@app/core/services/Platforms/platform.model";
import {RequestOptions} from "@angular/http";

@Injectable({ providedIn: 'root' })
export class platformService {


    constructor(private http: HttpClient, private localStorage: LocalStorageService ) {}

    // page? : string,rows? : string, sidx?: string, sord?: string
    //  const options = createRequestOption(req);

    //const options = new RequestOptions({params: myParam});

    queryPlatforms(): Observable<PlatformModel[]> {
        const headers = {"Authorization" : 'Bearer ' + localStorage.getItem('token')}
        return this.http.get<PlatformModel[]>('/api/sandbox/api/plateformes' , { headers: headers});
    }

    update(platformModel: PlatformModel): Observable<HttpResponse<PlatformModel>> {
        const headers = {"Authorization" : 'Bearer ' + localStorage.getItem('token')}
        return this.http.put<PlatformModel>('api/sandbox/api/plateformes', platformModel, { observe: 'response' , headers: headers });
    }


    delete(id: string): Observable<HttpResponse<any>> {
        const headers = {"Authorization" : 'Bearer ' + localStorage.getItem('token')}
        return this.http.delete(`api/sandbox/api/plateformes/${id}`, { observe: 'response' , headers: headers });
    }

    create(platform: PlatformModel): Observable<HttpResponse<PlatformModel>> {
        const headers = {"Authorization" : 'Bearer ' + localStorage.getItem('token')}
        return this.http.post<PlatformModel>('api/sandbox/api/plateformes', platform, { observe: 'response' , headers: headers });
    }


}