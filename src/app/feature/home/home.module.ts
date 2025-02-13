import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './component/home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {EventService} from "@shared/event/service/event.service";
import {EventStore} from "@shared/event/store/event.store";
import {EventCardModule} from "@shared/event-card/event-card.module";
import {EventFilterComponent} from './component/event-filter/event-filter.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    HomeComponent,
    EventFilterComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    EventCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSliderModule,
    MatSelectModule,
  ],
  providers: [
    EventService,
    EventStore,
  ]
})
export class HomeModule {
}

