import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './component/home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {EventService} from "@shared/event/service/event.service";
import {EventCardModule} from "@shared/event-card/event-card.module";
import {EventFilterComponent} from './component/event-filter/event-filter.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


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
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    EventService,
  ]
})
export class HomeModule {
}

