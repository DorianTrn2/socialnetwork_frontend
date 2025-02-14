import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {Event} from "@core/type/event.type";
import {EventService} from "@shared/event/service/event.service";
import {inject} from "@angular/core";
import {map, of, tap} from "rxjs";
import {NavigationService} from "@core/service/navigation/navigation.service";
import {APP_URL} from "@core/constant/url.constant";

export const eventResolver: ResolveFn<Event> = (route: ActivatedRouteSnapshot) => {
  const eventService: EventService = inject(EventService);

  const navigationService: NavigationService = inject(NavigationService);

  const eventId: string | null = route.paramMap.get('event_id');

  if (!eventId) {
    navigationService.navigateTo(APP_URL.HOME);
    return of({} as Event); // Value won't be used here if null
  }

  return eventService.getEventById(eventId).pipe(
    tap((event: Event | null) => {
      if (!event) {
        navigationService.navigateTo(APP_URL.HOME);
      }
    }),
    map((event: Event | null) => event as Event), // Value won't be used here if null
  );
};
