import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {APP_URL, LOGIN_FRAGMENT} from "../../../../core/constant/url.constant";
import {LoginForm} from '../../model/loginForm';
import {RegisterForm} from '../../model/registerForm';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: LoginForm;
  registerData: RegisterForm;
  hide: boolean;
  isRegister: boolean;

  protected readonly APP_URL = APP_URL;
  private readonly router: Router = inject(Router);
  private readonly loginService: LoginService = inject(LoginService);

  constructor() {
    this.loginData = new LoginForm('', '');
    this.registerData = new RegisterForm('', '', '', '', '', '');
    this.hide = true;
    this.isRegister = false;
  }

  ngOnInit() {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    if (fragment === LOGIN_FRAGMENT.LOGOUT) {
      this.logoutController();
    }
    this.isRegister = (fragment === LOGIN_FRAGMENT.REGISTER);
  }

  onSubmit(xxForm: any) {
    if (xxForm.invalid) {
      return;
    }
    if (this.isRegister) {
      this.registerController();
    } else {
      this.loginController();
    }
  }

  public navigateToRegister(): void {
    this.router.navigate([], {fragment: LOGIN_FRAGMENT.REGISTER}).then();
    this.isRegister = true;
  }

  public navigateToLogin(): void {
    this.router.navigate([], {fragment: ''}).then();
    this.isRegister = false;
  }

  public loginController(): void {
    this.registerData = new RegisterForm('', '', '', '', '', '');
    this.loginService.login(this.loginData.login, this.loginData.password)
      .subscribe({
        next: (response: any) => {
          console.log('Login next:', response);
          this.router.navigate(['/' + APP_URL.HOME]).then();
        },
        error: (error: any) => {
          if (error.status === 401) {
            console.error('Login failed: Forbidden', error);
          } else {
            console.error('Login failed:', error);
          }
        }
      });
    this.loginData = new LoginForm('', '');
  }

  public logoutController(): void {
    this.loginService.logout().subscribe({
      next: (response: any) => {
        console.log('Logout next:', response);
        this.router.navigate(['/' + APP_URL.LOGIN]).then();
      },
      error: (error: any) => {
        console.error('Logout failed:', error);
      }
    });
  }

  public registerController(): void {
    this.loginData = new LoginForm('', '');
    this.loginService.register(
      this.registerData.login,
      this.registerData.password,
      this.registerData.email,
      this.registerData.firstname,
      this.registerData.lastname,
      this.registerData.birthday)
      .subscribe({
        next: (response: any) => {
          console.log('Register next:', response);
          this.navigateToLogin();
        },
        error: (error: any) => {
          console.error('Register failed:', error);
        }
      });

    this.registerData = new RegisterForm('', '', '', '', '', '');
  }


}
