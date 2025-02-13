import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./feature/home/component/home/home.component";
import {APP_URL} from "./core/constant/url.constant";
import {ChatsComponent} from "./feature/chats/component/chats/chats.component";
import {ProfileComponent} from "./feature/profile/component/profile/profile.component";
import {LoginComponent} from "./feature/login/component/login/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_URL.HOME,
    pathMatch: 'full'
  },
  {
    path: APP_URL.HOME,
    component: HomeComponent,
  },
  {
    path: APP_URL.CHATS,
    component: ChatsComponent,
  },
  {
    path: APP_URL.PROFILE,
    component: ProfileComponent,
  },
  {
    path: APP_URL.LOGIN,
    component: LoginComponent,
  },

  // Unknown path
  {
    path: '**',
    redirectTo: APP_URL.HOME
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
