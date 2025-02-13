import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {BACKEND_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";
import {EventStore} from "@shared/event/store/event.store";
import {Event} from "@core/type/event.type";
import {EventTheme} from "@core/constant/theme.constant";

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

  public getFilteredEvents(minPrice: number, maxPrice: number, name: string | null, themeCode: EventTheme | null, orderByDate: boolean, orderByPrice: boolean, ascendingOrder: boolean): Observable<Event[]> {
    let url: string = this.URL;
    url += `?price_min=${minPrice}&price_max=${maxPrice}`;

    if (name) {
      url += `&name=${name}`;
    }

    if (themeCode) {
      url += `&theme_code=${themeCode}`;
    }

    if (orderByDate) {
      url += `&sort_by_date=${ascendingOrder ? 1 : -1}`
    } else if (orderByPrice) {
      url += `&sort_by_price=${ascendingOrder ? 1 : -1}`
    }
    return this.http.get<Event[]>(url);
  }
}
