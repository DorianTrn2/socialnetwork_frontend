import {Component, inject, Signal} from '@angular/core';
import {APP_URL, EVENT_URL, LOGIN_FRAGMENT} from "@core/constant/url.constant";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {UserProfile} from "@core/type/user.type";
import {NavigationService} from "@core/service/navigation/navigation.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  protected readonly connectedUser$: Signal<UserProfile | null> = inject(AuthenticationStore).connectedUser$;

  protected readonly APP_URL = APP_URL;

  protected readonly EVENTS_URL = EVENT_URL;

  protected readonly LOGIN_FRAGMENT = LOGIN_FRAGMENT;

  protected readonly navigationService: NavigationService = inject(NavigationService);
}
