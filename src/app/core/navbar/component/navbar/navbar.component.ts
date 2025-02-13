import {Component, inject, Signal} from '@angular/core';
import {Router} from "@angular/router";
import {APP_URL} from "../../../constant/url.constant";
import {AuthenticationStore} from "../../../store/authentication/authentication.store";
import {User} from "../../../type/user";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  protected readonly connectedUser$: Signal<User | null> = inject(AuthenticationStore).connectedUser$;

  protected readonly APP_URL = APP_URL;

  private readonly router: Router = inject(Router);

  public navigateTo(destinationUrl: string): void {
    this.router.navigateByUrl(destinationUrl).then();
  }
}
