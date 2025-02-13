import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {APP_URL} from "@core/constant/url.constant";

export const AuthGuard = (): boolean => {
  const router: Router = inject(Router);
  const authenticationStore: AuthenticationStore = inject(AuthenticationStore);

  if (!authenticationStore.connectedUser$()) {
    router.navigateByUrl(APP_URL.LOGIN).then();
    return false;
  }
  return true;
}
