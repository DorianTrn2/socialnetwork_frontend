import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {User} from "@core/type/user";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationStore {
    private connectedUser$$: WritableSignal<User | null> = signal(null);
    public readonly connectedUser$: Signal<User | null> = this.connectedUser$$.asReadonly();

    public login(user: User): void {
        this.connectedUser$$.set(user);
    }

    public logout(): void {
        this.connectedUser$$.set(null);
    }
}
