import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Event} from "@core/type/event.type";
import {FormControl} from "@angular/forms";
import {BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI, EVENTS_URL} from "@core/constant/url.constant";
import {User} from "@core/type/user.type";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {EventService} from "@shared/event/service/event.service";
import {NavigationService} from "@core/service/navigation/navigation.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public event!: Event;

  public userWhoLikesEvent$$: WritableSignal<User[]> = signal([]);

  public eventLiked$$: WritableSignal<boolean> = signal(false);

  public likeEventFormControl!: FormControl<boolean>;

  public eventImageUrl!: string;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly authenticationStore: AuthenticationStore = inject(AuthenticationStore);

  private readonly eventService: EventService = inject(EventService);

  private readonly navigationService: NavigationService = inject(NavigationService);

  public ngOnInit(): void {
    // Resolver
    this.event = this.route.snapshot.data["event"];
    this.userWhoLikesEvent$$.set(this.route.snapshot.data["userWhoLikesEvent"]);

    this.eventImageUrl = `${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}/${this.event._id}/${BACKEND_EVENT_ENDPOINT.GET_IMAGE}`;

    const userLikeEvent: boolean = this.userWhoLikesEvent$$().some((user: User) => user.username === this.authenticationStore.connectedUser$()?.user?.username ?? false)
    this.eventLiked$$.set(userLikeEvent);
    this.likeEventFormControl = new FormControl(userLikeEvent, {nonNullable: true});

    this.likeEventFormControl.valueChanges.subscribe((liked: boolean) => {
      this.eventLiked$$.set(liked);
      this.eventService.likeOrUnlikeEvent(this.event._id, liked);

      this.eventService.getUserWhoLikedEvent(this.event._id).subscribe((users: User[]) => {
        this.userWhoLikesEvent$$.set(users);
      })
    })
  }

  public onEditEventClick(): void {
    this.navigationService.navigateRelative([EVENTS_URL.UPDATE], this.route);
  }
}
