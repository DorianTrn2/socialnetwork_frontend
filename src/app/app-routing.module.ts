import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "@feature/home/component/home/home.component";
import {APP_URL} from "@core/constant/url.constant";
import {ChatsComponent} from "@feature/chats/component/chats/chats.component";
import {ProfileComponent} from "@feature/profile/component/profile/profile.component";
import {LoginComponent} from "@feature/login/component/login/login.component";
import {eventResolver} from "@shared/event/resolver/event.resolver";
import {AuthGuard} from "@core/guard/auth.guard";
import {profileResolver} from "@feature/profile/component/resolver/profile.resolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: APP_URL.HOME,
    pathMatch: 'full'
  },
  {
    path: APP_URL.HOME,
    component: HomeComponent,
    resolve: {
      events: eventResolver
    },
  },
  {
    path: APP_URL.CHATS,
    component: ChatsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: APP_URL.PROFILE,
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      userProfile: profileResolver,
    }
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
