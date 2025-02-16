import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent} from './component/event/event.component';
import {EventCardModule} from "@shared/event-card/event-card.module";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {EventFormComponent} from './component/event-form/event-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    EventComponent,
    EventFormComponent
  ],
  imports: [
    CommonModule,
    EventCardModule,
    MatCardModule,
    MatFormFieldModule,
    MatRadioModule,
    ReactiveFormsModule,
    SharedModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule
  ]
})
export class EventModule {
}
