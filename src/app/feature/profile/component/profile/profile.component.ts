import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {UserProfile} from "@core/type/user.type";
import {BACKEND_ENDPOINT, BACKEND_URI, BACKEND_USER_ENDPOINT} from "@core/constant/url.constant";
import {ActivatedRoute} from "@angular/router";
import {USER_ROLE} from "@core/constant/user-role.constant";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public userProfile!: UserProfile;

  public displayCreatedEvents$$: WritableSignal<boolean> = signal(true);

  public displayCreatedEventsFormControl!: FormControl<boolean>;

  public displayCreatedEventsFormGroup!: FormGroup;

  public userImageUrl!: string;

  protected readonly USER_ROLE = USER_ROLE;

  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.userProfile = this.route.snapshot.data["userProfile"];
    this.userImageUrl = `${BACKEND_URI}/${BACKEND_ENDPOINT.USER}/${this.userProfile.user.username}/${BACKEND_USER_ENDPOINT.GET_IMAGE}`;

    this.displayCreatedEventsFormControl = new FormControl(true, {nonNullable: true});
    this.displayCreatedEventsFormGroup = new FormGroup({
      displayCreatedEvents: this.displayCreatedEventsFormControl,
    });

    this.displayCreatedEventsFormControl.valueChanges.subscribe((displayCreatedEvents: boolean) => {
      console.log(displayCreatedEvents);
      this.displayCreatedEvents$$.set(displayCreatedEvents);
    })
  }
}
