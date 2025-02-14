import {Component, inject, OnInit} from '@angular/core';
import {User} from "@core/type/user.type";
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

  protected readonly connectedUser: User | null = inject(AuthenticationStore).connectedUser$()?.user ?? null;

  protected readonly APP_URL = APP_URL;

  protected readonly LOGIN_FRAGMENT = LOGIN_FRAGMENT;

  protected readonly navigationService: NavigationService = inject(NavigationService);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private eventNameFormControl!: FormControl<string | null>;

  private minimumPriceFormControl!: FormControl<number>;

  private maximumPriceFormControl!: FormControl<number>;

  private themeFormControl!: FormControl<EventTheme | null>;

  private dateFormControl!: FormControl<Date | null>;

  private sortByDateFormControl!: FormControl<boolean>;

  private sortByDateOrderFormControl!: FormControl<boolean>;

  private sortByPriceFormControl!: FormControl<boolean>;

  private sortByPriceOrderFormControl!: FormControl<boolean>;

  private readonly eventService: EventService = inject(EventService);

  public ngOnInit(): void {
    // Resolver
    this.events = this.route.snapshot.data["events"];

    this.eventNameFormControl = new FormControl(null);
    this.themeFormControl = new FormControl(null);
    this.minimumPriceFormControl = new FormControl(MIN_PRICE, {nonNullable: true});
    this.maximumPriceFormControl = new FormControl(MAX_PRICE, {nonNullable: true});
    this.dateFormControl = new FormControl(null);

    this.sortByDateFormControl = new FormControl(false, {nonNullable: true});
    this.sortByPriceFormControl = new FormControl(false, {nonNullable: true});
    this.sortByDateOrderFormControl = new FormControl(true, {nonNullable: true});
    this.sortByDateOrderFormControl.disable();
    this.sortByPriceOrderFormControl = new FormControl(true, {nonNullable: true});
    this.sortByPriceOrderFormControl.disable();

    this.filterFormGroup = new FormGroup({
      name: this.eventNameFormControl,
      minimumPrice: this.minimumPriceFormControl,
      maximumPrice: this.maximumPriceFormControl,
      theme: this.themeFormControl,
      date: this.dateFormControl,
      sortByDate: this.sortByDateFormControl,
      sortByPrice: this.sortByPriceFormControl,
      sortByDateOrder: this.sortByDateOrderFormControl,
      sortByPriceOrder: this.sortByPriceOrderFormControl,
    });
  }

  public onFiltersSubmit(): void {
    this.eventService.getFilteredEvents(
      this.minimumPriceFormControl.value,
      this.maximumPriceFormControl.value,
      this.eventNameFormControl.value,
      this.themeFormControl.value,
      this.dateFormControl.value,
      this.sortByDateFormControl.value,
      this.sortByPriceFormControl.value,
      this.sortByDateFormControl.value ? this.sortByDateOrderFormControl.value : this.sortByPriceOrderFormControl.value,
    ).subscribe((events: Event[]) => {
      this.events = events;
    });
  }
}
