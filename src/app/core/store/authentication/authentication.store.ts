import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {UserType} from "@core/type/user.type";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationStore {
    private connectedUser$$: WritableSignal<UserType | null> = signal(null);
    public readonly connectedUser$: Signal<UserType | null> = this.connectedUser$$.asReadonly();

    public login(user: UserType): void {
        this.connectedUser$$.set(user);
    }

    public logout(): void {
        this.connectedUser$$.set(null);
    }
}
