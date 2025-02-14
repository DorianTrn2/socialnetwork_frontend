import {ResolveFn} from '@angular/router';
import {UserProfile} from "@core/type/user.type";
import {inject} from "@angular/core";
import {ProfileService} from "@core/service/profile/profile.service";

export const profileResolver: ResolveFn<UserProfile> = (route, state) => {
  const profileService: ProfileService = inject(ProfileService);

  return profileService.getMyProfile();
};
