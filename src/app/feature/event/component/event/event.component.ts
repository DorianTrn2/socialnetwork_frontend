import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Event} from "@core/type/event.type";
import {FormControl} from "@angular/forms";
import {APP_URL, BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI, EVENT_URL} from "@core/constant/url.constant";
import {User} from "@core/type/user.type";
import {AuthenticationStore} from "@core/store/authentication/authentication.store";
import {EventService} from "@shared/event/service/event.service";
import {NavigationService} from "@core/service/navigation/navigation.service";
import {USER_ROLE_ID} from "@core/constant/user-role.constant";
import {ChatService} from "@shared/chat/service/chats.service";
import {catchError, of} from "rxjs";

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

  public userCanEditEvent!: boolean;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  private readonly authenticationStore: AuthenticationStore = inject(AuthenticationStore);

  private readonly eventService: EventService = inject(EventService);

  private readonly navigationService: NavigationService = inject(NavigationService);

  private readonly chatService: ChatService = inject(ChatService);

  public ngOnInit(): void {
    // Resolver
    this.event = this.route.snapshot.data["event"];
    this.userWhoLikesEvent$$.set(this.route.snapshot.data["userWhoLikesEvent"]);

    this.eventImageUrl = `${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}/${this.event._id}/${BACKEND_EVENT_ENDPOINT.GET_IMAGE}`;

    const userLikeEvent: boolean = this.userWhoLikesEvent$$().some((user: User) => user.username === this.authenticationStore.connectedUser$()?.user?.username ?? false)
    this.eventLiked$$.set(userLikeEvent);
    this.likeEventFormControl = new FormControl(userLikeEvent, {nonNullable: true});

    this.userCanEditEvent = this.authenticationStore.connectedUser$()?.user?.email === this.event.created_by_email || this.authenticationStore.connectedUser$()?.user?.role_id === USER_ROLE_ID.ADMIN;

    this.likeEventFormControl.valueChanges.subscribe((liked: boolean) => {
      this.eventLiked$$.set(liked);
      this.eventService.likeOrUnlikeEvent(this.event._id, liked);

      this.eventService.getUserWhoLikedEvent(this.event._id).subscribe((users: User[]) => {
        this.userWhoLikesEvent$$.set(users);
      })
    })
  }

  public onEditEventClick(): void {
    this.navigationService.navigateRelative([EVENT_URL.UPDATE], this.route).then();
  }

  public onStartConversationClick(user: User): void {
    if (user.email === this.authenticationStore.connectedUser$()?.user?.email) {
      return;
    }
    this.chatService.startChatWithUser(user.email).pipe(
      catchError(() => {
        this.navigationService.navigateTo(APP_URL.CHATS);
        return of(null);
      })
    ).subscribe(() => {
      this.navigationService.navigateTo(APP_URL.CHATS);
    });
  }
}
