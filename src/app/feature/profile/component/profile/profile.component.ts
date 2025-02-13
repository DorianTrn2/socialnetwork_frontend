import {Component, computed, inject, Signal} from '@angular/core';
import {User} from "@core/type/user.type";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {BACKEND_ENDPOINT, BACKEND_URI, BACKEND_USER_ENDPOINT} from "@core/constant/url.constant";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public user$: Signal<User | null> = inject(AuthenticationStore).connectedUser$;

  public userImageUrl$: Signal<string> = computed(() => {
    const user: User | null = this.user$();
    if (user) {
      return `${BACKEND_URI}/${BACKEND_ENDPOINT.USER}/${user.username}/${BACKEND_USER_ENDPOINT.GET_IMAGE}`;
    }
    return '';
  });
}
