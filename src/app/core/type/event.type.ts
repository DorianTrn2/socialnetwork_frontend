import {EventTheme} from "@core/constant/theme.constant";

export interface Event {
  created_by_email: string,
  theme_code: EventTheme,
  name: string,
  date: Date,
  price: number,
  _id: string,
}
