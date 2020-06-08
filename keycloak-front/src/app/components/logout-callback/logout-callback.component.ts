import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-logout-callback',
  templateUrl: './logout-callback.component.html',
  styleUrls: ['./logout-callback.component.styl']
})
export class LogoutCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.authService.completeLogout();

    this.authService.resourceRequested = null;
    this.router.navigate(['/']);
  }

}
