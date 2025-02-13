import {Component, inject, Signal} from '@angular/core';
import {User} from "@core/type/user";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {NavigationService} from "@core/service/navigation/navigation.service";
import {APP_URL, LOGIN_FRAGMENT} from "@core/constant/url.constant";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  protected readonly connectedUser$: Signal<User | null> = inject(AuthenticationStore).connectedUser$;

  protected readonly APP_URL = APP_URL;

  protected readonly LOGIN_FRAGMENT = LOGIN_FRAGMENT;

  protected readonly navigationService: NavigationService = inject(NavigationService);
}
