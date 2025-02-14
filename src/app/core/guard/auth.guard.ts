import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {ProfileService} from "@core/service/profile/profile.service";
import {catchError, of} from "rxjs";
import {UserProfile} from "@core/type/user.type";
import {APP_URL} from "@core/constant/url.constant";

export const AuthGuard = (): boolean => {
  const router: Router = inject(Router);
  const authenticationStore: AuthenticationStore = inject(AuthenticationStore);

  if (!authenticationStore.connectedUser$()) {
    const profileService: ProfileService = inject(ProfileService);

    profileService.getMyProfile().pipe(
      catchError(() => {
        router.navigateByUrl(APP_URL.LOGIN).then();
        return of(null)
      })
    ).subscribe((profile: UserProfile | null) => {
      if (profile) {
        authenticationStore.login(profile);
        return true;
      }
      return false;
    });
  }
  return true;
}
