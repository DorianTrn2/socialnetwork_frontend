import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeModule} from "./home/home.module";
import {ChatsModule} from "./chats/chats.module";
import {ProfileModule} from "./profile/profile.module";
import {LoginModule} from "./login/login.module";
import {EventModule} from "./event/event.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Feature modules
    HomeModule,
    ChatsModule,
    ProfileModule,
    LoginModule,
    EventModule,
  ]
})
export class FeatureModule {
}
