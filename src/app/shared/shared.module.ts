import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventCardModule} from "./event-card/event-card.module";
import {UserSmallCardModule} from "@shared/user-small-card/user-small-card.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventCardModule,
    UserSmallCardModule,
  ],
  exports: [
    EventCardModule,
    UserSmallCardModule,
  ]
})
export class SharedModule {
}
