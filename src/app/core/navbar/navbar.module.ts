import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './component/navbar/navbar.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class NavbarModule {
}
