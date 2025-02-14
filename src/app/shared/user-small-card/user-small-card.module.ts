import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserSmallCardComponent} from './component/user-small-card/user-small-card.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    UserSmallCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    UserSmallCardComponent
  ]
})
export class UserSmallCardModule {
}
