import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {ProfileService} from "@core/service/profile/profile.service";
import {catchError, of} from "rxjs";
import {UserProfile} from "@core/type/user.type";

export const authResolver: ResolveFn<boolean> = (route, state) => {
  const authenticationStore: AuthenticationStore = inject(AuthenticationStore);

  if (!authenticationStore.connectedUser$()) {
    const profileService: ProfileService = inject(ProfileService);

    profileService.getMyProfile().pipe(
      catchError(() => {
        return of(null)
      })
    ).subscribe((profile: UserProfile | null) => {
      if (profile) {
        authenticationStore.login(profile);
      }
    });
    return false;
  }
  return true;
};
