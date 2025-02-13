import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './component/home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {EventService} from "@shared/event/service/event.service";
import {EventStore} from "@shared/event/store/event.store";
import {EventCardModule} from "@shared/event-card/event-card.module";


@NgModule({
  declarations: [
    HomeComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    EventCardModule,
  ],
  providers: [
    EventService,
    EventStore,
  ]
})
export class HomeModule {
}

