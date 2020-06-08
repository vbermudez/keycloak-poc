import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'keycloak-front';

  constructor(private authService: AuthService) { }

  async logout(): Promise<void> {
    return this.authService.startLogout();
  }
}
