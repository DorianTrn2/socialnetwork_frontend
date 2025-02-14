import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {UserProfile} from "@core/type/user.type";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationStore {
  private connectedUser$$: WritableSignal<UserProfile | null> = signal(null);
  public readonly connectedUser$: Signal<UserProfile | null> = this.connectedUser$$.asReadonly();

  public login(user: UserProfile): void {
    this.connectedUser$$.set(user);
  }

  public logout(): void {
    this.connectedUser$$.set(null);
  }
}
