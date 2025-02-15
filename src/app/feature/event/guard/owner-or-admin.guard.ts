import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {inject} from "@angular/core";
import {UserProfile} from "@core/type/user.type";
import {Event} from "@core/type/event.type";
import {USER_ROLE_ID} from "@core/constant/user-role.constant";
import {ProfileService} from "@core/service/profile/profile.service";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {APP_URL} from "@core/constant/url.constant";
import {EventService} from "@shared/event/service/event.service";

export const OwnerOrAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const authenticationStore: AuthenticationStore = inject(AuthenticationStore);
  const router: Router = inject(Router);
  const eventService: EventService = inject(EventService);
  const profileService: ProfileService = inject(ProfileService);

  // Resolver
  const event: Event | undefined = route.data["event"];
  const connectedUser: UserProfile | null = authenticationStore.connectedUser$();

  // 1. Si l'utilisateur est déjà connecté, vérifie son rôle
  if (connectedUser) {
    return checkAuthorization(connectedUser, event, eventService, route);
  }

  // 2. Sinon, récupère le profil utilisateur depuis le backend
  return profileService.getMyProfile().pipe(
    switchMap((profile: UserProfile | null) => {
      if (profile) {
        authenticationStore.login(profile);
        return checkAuthorization(profile, event, eventService, route);
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

function checkAuthorization(
  user: UserProfile,
  event: Event | undefined,
  eventService: EventService,
  route: ActivatedRouteSnapshot
): Observable<boolean> {
  // Si l'utilisateur est admin, il a accès
  if (user.user.role_id === USER_ROLE_ID.ADMIN) {
    return of(true);
  }

  // Si l'événement est déjà résolu, on vérifie le propriétaire
  if (event) {
    return of(event.created_by_email === user.user.email);
  }

  // Sinon, on récupère l'événement via l'API
  return eventService.getEventById(route.paramMap.get('event_id') as string).pipe(
    map((event: Event | null) => {
      return event ? event.created_by_email === user.user.email : false;
    }),
    catchError(() => of(false))
  );
}
