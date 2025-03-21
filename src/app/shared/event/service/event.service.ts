import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";
import {Event} from "@core/type/event.type";
import {EventTheme} from "@core/constant/theme.constant";
import {User} from "@core/type/user.type";

@Injectable()
export class EventService {
  private readonly baseUrl: string = `${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}`;

  private readonly http: HttpClient = inject(HttpClient);

  public getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  public getEventById(eventId: string): Observable<Event | null> {
    return this.http.get<Event | null>(this.baseUrl + '/' + eventId);
  }

  public getFilteredEvents(minPrice: number, maxPrice: number, name: string | null, themeCode: EventTheme | null, date: Date | null, orderByDate: boolean, orderByPrice: boolean, ascendingOrder: boolean): Observable<Event[]> {
    let url: string = this.baseUrl;
    url += `?price_min=${minPrice}&price_max=${maxPrice}`;

    if (name) {
      url += `&name=${name}`;
    }

    if (themeCode) {
      url += `&theme_code=${themeCode}`;
    }

    if (date) {
      url += `&date=${date.toString()}`;
    }

    if (orderByDate) {
      url += `&sort_by_date=${ascendingOrder ? 1 : -1}`
    } else if (orderByPrice) {
      url += `&sort_by_price=${ascendingOrder ? 1 : -1}`
    }
    return this.http.get<Event[]>(url);
  }

  public getUserWhoLikedEvent(eventId: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/' + eventId + '/' + BACKEND_EVENT_ENDPOINT.LIKES);
  }

  public likeOrUnlikeEvent(eventId: string, liked: boolean): void {
    const url: string = this.baseUrl + '/' + eventId + '/' + (liked ? BACKEND_EVENT_ENDPOINT.LIKE : BACKEND_EVENT_ENDPOINT.UNLIKE);
    this.http.post(url, null, {withCredentials: true}).subscribe();
  }

  public postNewEvent(event: Event): Observable<Event | null> {
    const url: string = this.baseUrl + '/' + BACKEND_EVENT_ENDPOINT.NEW;
    return this.http.post<Event | null>(url, event, {withCredentials: true});
  }

  public updateEvent(event: Event): Observable<void> {
    const url: string = this.baseUrl + '/' + event._id + '/' + BACKEND_EVENT_ENDPOINT.UPDATE;
    return this.http.put<void>(url, event, {withCredentials: true});
  }

  public postEventImage(eventId: string, image: File): Observable<void> {
    const url: string = this.baseUrl + '/' + eventId + '/' + BACKEND_EVENT_ENDPOINT.SEND_IMAGE;

    const formData = new FormData();
    formData.append('image', image);

    return this.http.post<void>(url, formData, {withCredentials: true});
  }
}
