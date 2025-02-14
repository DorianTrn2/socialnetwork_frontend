import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BACKEND_AUTH_ENDPOINT, BACKEND_ENDPOINT, BACKEND_URI} from 'src/app/core/constant/url.constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private base_url = BACKEND_URI + '/' + BACKEND_ENDPOINT.AUTH + '/';
  private login_url = this.base_url + '/' + BACKEND_AUTH_ENDPOINT.LOGIN;
  private register_url = this.base_url + '/' + BACKEND_AUTH_ENDPOINT.REGISTER;
  private logout_url = this.base_url + '/' + BACKEND_AUTH_ENDPOINT.LOGOUT;

  constructor(private http: HttpClient) {
  }

  public login(login: string, password: string): any {
    const loginData = {login, password};
    return this.http.post<any>(this.login_url, loginData, {withCredentials: true, responseType: 'json'});
  }

  public register(login: string, password: string, email: string, firstname: string, lastname: string, birthday: string): any {
    const registerData = {login, password, email, firstname, lastname, birthday};
    return this.http.post<any>(this.register_url, registerData);
  }

  public logout(): any {
    return this.http.post<any>(this.logout_url, null, {withCredentials: true});
  }

}
