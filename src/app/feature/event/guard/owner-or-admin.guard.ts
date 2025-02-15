import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {inject} from "@angular/core";
import {UserProfile} from "@core/type/user.type";
import {Event} from "@core/type/event.type";
import {USER_ROLE_ID} from "@core/constant/user-role.constant";
import {ProfileService} from "@core/service/profile/profile.service";
import {catchError, of} from "rxjs";
import {APP_URL} from "@core/constant/url.constant";

export const OwnerOrAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
  const authenticationStore: AuthenticationStore = inject(AuthenticationStore);
  const router: Router = inject(Router);

  // Resolver
  const event: Event = route.data["event"];

  const connectedUser: UserProfile | null = authenticationStore.connectedUser$();

  if (!connectedUser) {
    const profileService: ProfileService = inject(ProfileService);

    profileService.getMyProfile().pipe(
      catchError(() => {
        router.navigateByUrl(APP_URL.LOGIN).then();
        return of(null)
      })
    ).subscribe((profile: UserProfile | null) => {
      if (profile) {
        authenticationStore.login(profile);
        if (profile.user.role_id === USER_ROLE_ID.ADMIN || profile.user.email === event.created_by_email) {
          return true;
        }
      }
      router.navigateByUrl(APP_URL.HOME).then();
      return false;
    });

    router.navigateByUrl(APP_URL.HOME).then();
    return false;
  }

  // Return true only if user is owner or admin
  if (connectedUser.user.role_id === USER_ROLE_ID.ADMIN || connectedUser.user.email === event.created_by_email) {
    return true;
  }

  router.navigateByUrl(APP_URL.HOME).then();
  return false;

};
