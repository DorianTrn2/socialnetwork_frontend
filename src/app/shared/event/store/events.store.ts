import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {Event} from "@core/type/event.type";

@Injectable()
export class EventsStore {
  private events$$: WritableSignal<Event[] | null> = signal(null);

  public readonly events$: Signal<Event[] | null> = this.events$$.asReadonly();

  public setEvents(events: Event[] | null): void {
    this.events$$.set(events);
  }
}
