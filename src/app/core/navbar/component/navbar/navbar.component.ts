import {Component, inject, Signal} from '@angular/core';
import {APP_URL} from "@core/constant/url.constant";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {User} from "@core/type/user.type";
import {NavigationService} from "@core/service/navigation/navigation.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  protected readonly connectedUser$: Signal<User | null> = inject(AuthenticationStore).connectedUser$;

  protected readonly APP_URL = APP_URL;

  protected readonly navigationService: NavigationService = inject(NavigationService);
}
