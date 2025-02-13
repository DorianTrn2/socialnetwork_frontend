import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {EVENT_THEME, EventTheme} from "@core/constant/theme.constant";
import {MAX_PRICE, MIN_PRICE} from "@feature/home/constant/filter.constant";

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.scss']
})
export class EventFilterComponent {
  @Input({required: true}) filterFormGroup!: FormGroup;

  public eventThemes: EventTheme[] = Object.keys(EVENT_THEME) as EventTheme[];

  protected readonly EVENT_THEME = EVENT_THEME;

  protected readonly MAX_PRICE = MAX_PRICE;

  protected readonly MIN_PRICE = MIN_PRICE;

  public onSubmit(): void {
    console.log("submitted");
  }
}
