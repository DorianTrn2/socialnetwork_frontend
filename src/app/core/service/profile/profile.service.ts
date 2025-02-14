import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_ENDPOINT, BACKEND_URI, BACKEND_USER_ENDPOINT} from "@core/constant/url.constant";
import {UserProfile} from "@core/type/user.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly URL: string = `${BACKEND_URI}/${BACKEND_ENDPOINT.USER}/${BACKEND_USER_ENDPOINT.PROFILE}`;

  private readonly http: HttpClient = inject(HttpClient);

  public getMyProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.URL, {withCredentials: true});
  }
}
