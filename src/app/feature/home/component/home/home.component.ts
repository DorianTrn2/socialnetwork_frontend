import {Component, inject, OnInit, Signal} from '@angular/core';
import {UserType} from "@core/type/user.type";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {NavigationService} from "@core/service/navigation/navigation.service";
import {APP_URL, LOGIN_FRAGMENT} from "@core/constant/url.constant";
import {Event} from "@core/type/event.type";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {EventTheme} from "@core/constant/theme.constant";
import {MAX_PRICE, MIN_PRICE} from "@feature/home/constant/filter.constant";
import {EventService} from "@shared/event/service/event.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public events!: Event[];

  public filterFormGroup!: FormGroup;

  protected readonly connectedUser$: Signal<UserType | null> = inject(AuthenticationStore).connectedUser$;

  protected readonly APP_URL = APP_URL;

  protected readonly LOGIN_FRAGMENT = LOGIN_FRAGMENT;

  protected readonly navigationService: NavigationService = inject(NavigationService);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private eventNameFormControl!: FormControl<string | null>;

  private minimumPriceFormControl!: FormControl<number>;

  private maximumPriceFormControl!: FormControl<number>;

  private themeFormControl!: FormControl<EventTheme | null>;

  private readonly eventService: EventService = inject(EventService);

  public ngOnInit(): void {
    // Resolver
    this.events = this.route.snapshot.data["events"];

    this.eventNameFormControl = new FormControl(null);
    this.themeFormControl = new FormControl(null);
    this.minimumPriceFormControl = new FormControl(MIN_PRICE, {nonNullable: true});
    this.maximumPriceFormControl = new FormControl(MAX_PRICE, {nonNullable: true});

    this.filterFormGroup = new FormGroup({
      name: this.eventNameFormControl,
      minimumPrice: this.minimumPriceFormControl,
      maximumPrice: this.maximumPriceFormControl,
      theme: this.themeFormControl,
    });
  }

  public onFiltersSubmit(): void {
    this.eventService.getFilteredEvents(
      this.minimumPriceFormControl.value,
      this.maximumPriceFormControl.value,
      this.eventNameFormControl.value,
      this.themeFormControl.value
    ).subscribe((events: Event[]) => {
      this.events = events;
    });
  }
}
