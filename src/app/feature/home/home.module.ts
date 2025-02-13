import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './component/home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    HomeComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    SharedModule,
  ],
})
export class HomeModule {
}

