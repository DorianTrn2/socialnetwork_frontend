import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {Event} from "@core/type/event.type";
import {BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";
import {EVENT_THEME} from "@core/constant/theme.constant";

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
    @Input({required: true}) event!: Event;

    public eventImageUrl$$: WritableSignal<string> = signal("");
    
    protected readonly EVENT_THEME = EVENT_THEME;

    public ngOnInit(): void {
        this.eventImageUrl$$.set(`${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}/${this.event._id}/${BACKEND_EVENT_ENDPOINT.GET_IMAGE}`)
    }
}
