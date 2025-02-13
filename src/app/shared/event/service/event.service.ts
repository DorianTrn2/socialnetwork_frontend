import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {BACKEND_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";
import {EventStore} from "@shared/event/store/event.store";
import {Event} from "@core/type/event.type";

@Injectable()
export class EventService {
  private readonly URL: string = `${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}`;

  private readonly http: HttpClient = inject(HttpClient);

  private readonly eventStore: EventStore = inject(EventStore);

  public getEvents(): Observable<Event[]> {
    const storedEvents: Event[] | null = this.eventStore.events$();
    if (storedEvents !== null) {
      return of(storedEvents);
    }

    return this.http.get<Event[]>(this.URL).pipe(
      tap((events: Event[]) => {
        this.eventStore.setEvents(events);
      })
    );
  }
}
