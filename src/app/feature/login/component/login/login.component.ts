import {Component, inject, OnInit} from '@angular/core';
import {AuthenticationStore} from "@core/store/authentication/authentication.store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly authenticationStore: AuthenticationStore = inject(AuthenticationStore);

  // TODO to remove when login works
  public ngOnInit() {
    this.authenticationStore.login({
      username: "Xx_KevinDu48_xX",
      birthdate: new Date(Date.now()),
      firstname: "Denis",
      isAdmin: false,
      mail: "mail@mail.mail",
      lastname: "De Nice",
      role_id: 4856,
    })
  }
}
