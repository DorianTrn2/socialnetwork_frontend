import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {Event} from "@core/type/event.type";
import {APP_URL, BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";
import {EVENT_THEME} from "@core/constant/theme.constant";
import {NavigationService} from "@core/service/navigation/navigation.service";
import {DATE_PIPE_DEFAULT_OPTIONS} from "@angular/common";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input({required: true}) event!: Event;

  public eventImageUrl$$: WritableSignal<string> = signal("");

  protected readonly EVENT_THEME = EVENT_THEME;
  protected readonly DATE_PIPE_DEFAULT_OPTIONS = DATE_PIPE_DEFAULT_OPTIONS;
  private readonly navigationService: NavigationService = inject(NavigationService);

  public ngOnInit(): void {
    this.eventImageUrl$$.set(`${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}/${this.event._id}/${BACKEND_EVENT_ENDPOINT.GET_IMAGE}`)
  }

  public onEventClick(): void {
    this.navigationService.navigateTo(APP_URL.EVENT + '/' + this.event._id);
  }
}
