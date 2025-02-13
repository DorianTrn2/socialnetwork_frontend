import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly router: Router = inject(Router);

  public navigateTo(destinationUrl: string, fragment?: string): void {
    this.router.navigate(
      [destinationUrl], {
        fragment
      }
    ).then();
  }
}
