import {Component, inject, OnInit, Signal} from '@angular/core';
import {UserType} from "@core/type/user.type";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {NavigationService} from "@core/service/navigation/navigation.service";
import {APP_URL, LOGIN_FRAGMENT} from "@core/constant/url.constant";
import {Event} from "@core/type/event.type";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public events!: Event[];

  protected readonly connectedUser$: Signal<UserType | null> = inject(AuthenticationStore).connectedUser$;

  protected readonly APP_URL = APP_URL;

  protected readonly LOGIN_FRAGMENT = LOGIN_FRAGMENT;

  protected readonly navigationService: NavigationService = inject(NavigationService);

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    // Resolver
    this.events = this.route.snapshot.data["events"];
  }
}
