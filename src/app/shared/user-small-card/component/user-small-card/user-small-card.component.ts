import {Component, Input, OnInit} from '@angular/core';
import {User} from "@core/type/user.type";
import {BACKEND_ENDPOINT, BACKEND_URI, BACKEND_USER_ENDPOINT} from "@core/constant/url.constant";

@Component({
  selector: 'app-user-small-card',
  templateUrl: './user-small-card.component.html',
  styleUrls: ['./user-small-card.component.scss']
})
export class UserSmallCardComponent implements OnInit {
  @Input({required: true}) user!: User;

  public userImageUrl!: string;

  public ngOnInit(): void {
    this.userImageUrl = `${BACKEND_URI}/${BACKEND_ENDPOINT.USER}/${this.user.username}/${BACKEND_USER_ENDPOINT.GET_IMAGE}`;
  }
}
