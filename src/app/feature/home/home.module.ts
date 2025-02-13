import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './component/home/home.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    HomeComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
})
export class HomeModule {
}

