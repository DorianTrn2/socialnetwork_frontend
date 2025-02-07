import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './component/home/home.component';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
  ],
})
export class HomeModule {
}

