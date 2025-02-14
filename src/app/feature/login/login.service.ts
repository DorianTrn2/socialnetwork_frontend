import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/constant/url.constant';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private base_url = API_URL+'/auth';
    private login_url = this.base_url+'/login';
    private register_url = this.base_url+'/register';
    private logout_url = this.base_url+'/logout';

    constructor(private http: HttpClient) { }

    login(login: string, password: string): any {
        const loginData = { login, password };
        return this.http.post<any>(this.login_url, loginData, {withCredentials: true, responseType: 'json'});
    }

    register(login: string, password: string, email: string, firstname: string, lastname: string, birthday: string): any {
        const registerData = { login, password, email, firstname, lastname, birthday };
        return this.http.post<any>(this.register_url, registerData);
    }

    logout(): any {
        return this.http.post<any>(this.logout_url, null, {withCredentials: true});
    }

}