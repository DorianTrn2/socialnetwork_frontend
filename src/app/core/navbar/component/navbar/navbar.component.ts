import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {APP_URL} from "../../../constant/url.constant";
import {AuthenticationStore} from "../../../store/authentication/authentication.store";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isLoggedIn: boolean = inject(AuthenticationStore).isLoggedIn;

  protected readonly APP_URL = APP_URL;

  private readonly router: Router = inject(Router);

  public navigateTo(destinationUrl: string): void {
    this.router.navigateByUrl(destinationUrl).then();
  }
}
