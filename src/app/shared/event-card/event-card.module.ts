import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventCardComponent} from './component/event-card/event-card.component';
import {MatCardModule} from "@angular/material/card";


@NgModule({
    declarations: [
        EventCardComponent
    ],
    exports: [
        EventCardComponent
    ],
    imports: [
        CommonModule,
        MatCardModule
    ]
})
export class EventCardModule {
}
