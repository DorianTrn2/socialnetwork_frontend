import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeModule} from "./home/home.module";
import {ChatsModule} from "./chats/chats.module";
import {EventsModule} from "./events/events.module";
import {ProfileModule} from "./profile/profile.module";
import {LoginModule} from "./login/login.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Feature modules
    HomeModule,
    ChatsModule,
    EventsModule,
    ProfileModule,
    LoginModule
  ]
})
export class FeatureModule {
}
