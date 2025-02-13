import {ResolveFn} from '@angular/router';
import {UserProfile} from "@core/type/user.type";
import {ProfileService} from "@feature/profile/service/profile.service";
import {inject} from "@angular/core";

export const profileResolver: ResolveFn<UserProfile> = (route, state) => {
  const profileService: ProfileService = inject(ProfileService);

  return profileService.getMyProfile();
};
