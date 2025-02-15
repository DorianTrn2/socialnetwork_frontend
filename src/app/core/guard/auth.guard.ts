import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {ProfileService} from "@core/service/profile/profile.service";
import {catchError, Observable, of, switchMap} from "rxjs";
import {UserProfile} from "@core/type/user.type";
import {APP_URL} from "@core/constant/url.constant";

export const AuthGuard = (): Observable<boolean> => {
  const router: Router = inject(Router);
  const authenticationStore: AuthenticationStore = inject(AuthenticationStore);
  const profileService: ProfileService = inject(ProfileService);

  const connectedUser = authenticationStore.connectedUser$();

  // Si l'utilisateur est déjà connecté, il a accès
  if (connectedUser) {
    return of(true);
  }

  // Sinon, on tente de récupérer son profil
  return profileService.getMyProfile().pipe(
    switchMap((profile: UserProfile | null) => {
      if (profile) {
        authenticationStore.login(profile);
        return of(true);
      } else {
        router.navigateByUrl(APP_URL.LOGIN);
        return of(false);
      }
    }),
    catchError(() => {
      router.navigateByUrl(APP_URL.LOGIN);
      return of(false);
    })
  );
};
