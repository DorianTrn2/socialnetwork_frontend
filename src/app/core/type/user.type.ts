import {Event} from "@core/type/event.type";

export interface User {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  birthday: Date;
  role_id: number;
}

export interface UserProfile {
  user: User;
  likedEvents: Event[];
  createdEvents: Event[];
}
