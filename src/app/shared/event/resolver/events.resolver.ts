import {ResolveFn} from '@angular/router';
import {Event} from "@core/type/event.type";
import {EventService} from "@shared/event/service/event.service";
import {inject} from "@angular/core";

export const eventsResolver: ResolveFn<Event[]> = () => {
  const eventService: EventService = inject(EventService);
  return eventService.getEvents();
};
