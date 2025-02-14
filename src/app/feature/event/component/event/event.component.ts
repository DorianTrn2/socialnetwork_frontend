import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Event} from "@core/type/event.type";
import {FormControl} from "@angular/forms";
import {BACKEND_ENDPOINT, BACKEND_EVENT_ENDPOINT, BACKEND_URI} from "@core/constant/url.constant";
import {User} from "@core/type/user.type";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public event!: Event;

  public userWhoLikesEvent!: User[];

  public likeEventFormControl!: FormControl<boolean>;

  public eventImageUrl!: string;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    // Resolver
    this.event = this.route.snapshot.data["event"];
    this.userWhoLikesEvent = this.route.snapshot.data["userWhoLikesEvent"];
    this.eventImageUrl = `${BACKEND_URI}/${BACKEND_ENDPOINT.EVENT}/${this.event._id}/${BACKEND_EVENT_ENDPOINT.GET_IMAGE}`;
  }
}
