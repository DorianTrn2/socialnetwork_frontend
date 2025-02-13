import {Component, inject, Signal} from '@angular/core';
import {User} from "../../../../core/type/user";
import {AuthenticationStore} from "../../../../core/store/authentication/authentication.store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  protected readonly connectedUser$: Signal<User | null> = inject(AuthenticationStore).connectedUser$;
}
