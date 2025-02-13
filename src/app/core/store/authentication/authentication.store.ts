import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationStore {
  public isLoggedIn: boolean = false;
}
