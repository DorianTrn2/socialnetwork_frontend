import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "@feature/home/component/home/home.component";
import {APP_URL, EVENT_URL, USER_URL} from "@core/constant/url.constant";
import {ChatsComponent} from "@feature/chats/component/chats/chats.component";
import {ProfileComponent} from "@feature/profile/component/profile/profile.component";
import {LoginComponent} from "@feature/login/component/login/login.component";
import {eventsResolver} from "@shared/event/resolver/events.resolver";
import {AuthGuard} from "@core/guard/auth.guard";
import {profileResolver} from "@feature/profile/resolver/profile.resolver";
import {EventComponent} from "@feature/event/component/event/event.component";
import {eventResolver} from "@shared/event/resolver/event.resolver";
import {authResolver} from "@core/resolver/auth.resolver";
import {userWhoLikesEventResolver} from "@shared/event/resolver/user-who-likes-event.resolver";
import {EventFormComponent} from "@feature/event/component/event-form/event-form.component";
import {OwnerOrAdminGuard} from "@feature/event/guard/owner-or-admin.guard";
import {ProfileEditComponent} from "@feature/profile/component/profile-edit/profile-edit.component";

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
      events: eventsResolver,
      auth: authResolver,
    },
  },
  {
    path: APP_URL.CHATS,
    component: ChatsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: APP_URL.PROFILE,
    canActivate: [AuthGuard],
    resolve: {
      userProfile: profileResolver,
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfileComponent,
      },
      {
        path: USER_URL.UPDATE,
        component: ProfileEditComponent,
      },

    ]
  },
  {
    path: APP_URL.EVENT,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: APP_URL.HOME,
        pathMatch: 'full'
      },
      {
        path: EVENT_URL.NEW,
        component: EventFormComponent,
      },
      {
        path: ':event_id',
        resolve: {
          event: eventResolver,
          userWhoLikesEvent: userWhoLikesEventResolver,
        },
        runGuardsAndResolvers: 'always',
        children: [
          {
            path: '',
            component: EventComponent,
          },
          {
            path: EVENT_URL.UPDATE,
            component: EventFormComponent,
            canActivate: [OwnerOrAdminGuard],
          },
          {
            path: '**',
            redirectTo: APP_URL.HOME
          },
        ]
      },
      {
        path: '**',
        redirectTo: APP_URL.HOME
      },
    ]
  },
  {
    path: APP_URL.LOGIN,
    component: LoginComponent,
    resolve: {
      auth: authResolver,
    }
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
