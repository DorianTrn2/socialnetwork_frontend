import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {FeatureModule} from "@feature/feature.module";
import {CoreModule} from "@core/core.module";
import {SharedModule} from "@shared/shared.module";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    // App modules
    FeatureModule,
    CoreModule,
    SharedModule,
  ],
  exports: [SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
