import {ResolveFn} from '@angular/router';
import {User} from "@core/type/user.type";
import {EventService} from "@shared/event/service/event.service";
import {inject} from "@angular/core";
import {APP_URL} from "@core/constant/url.constant";
import {of} from "rxjs";
import {NavigationService} from "@core/service/navigation/navigation.service";

export const userWhoLikesEventResolver: ResolveFn<User[]> = (route) => {
  const eventService: EventService = inject(EventService);
  const navigationService: NavigationService = inject(NavigationService);

  const eventId: string | null = route.paramMap.get('event_id');

  if (!eventId) {
    navigationService.navigateTo(APP_URL.HOME);
    return of([]);
  }

  return eventService.getUserWhoLikedEvent(eventId);
};
