import {inject, Injectable} from '@angular/core';
import {BACKEND_ENDPOINT, BACKEND_URI, BACKEND_USER_ENDPOINT} from "@core/constant/url.constant";
import {HttpClient} from "@angular/common/http";
import {User} from "@core/type/user.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {
  private readonly baseUrl: string = `${BACKEND_URI}/${BACKEND_ENDPOINT.USER}`;

  private readonly http: HttpClient = inject(HttpClient);

  public updateUserProfile(user: User): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${BACKEND_USER_ENDPOINT.UPDATE}`, user, {withCredentials: true});
  }

  public postUserImage(image: File): Observable<void> {
    const url: string = this.baseUrl + '/' + BACKEND_USER_ENDPOINT.SEND_IMAGE;

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<void>(url, formData, {withCredentials: true});
  }
}
