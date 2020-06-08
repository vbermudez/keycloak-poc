import { Injectable } from '@angular/core';

import { environment as env } from '../../environments/environment';

import { UserManager, UserManagerSettings, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private umSettings: UserManagerSettings = {
    authority: `${env.openIdClientConfig['auth-server-url']}realms/${env.openIdClientConfig.realm}/`,
    client_id: env.openIdClientConfig.resource,
    redirect_uri: env.openIdRedirectUrl,
    post_logout_redirect_uri: env.openIdLogoutRedirectUrl,
    response_type: "id_token token",
    scope: "profile",
    filterProtocolClaims: true,
    loadUserInfo: true
  };
  private manager = new UserManager(this.umSettings);
  private user: User = null;
  
  public resourceRequested: string = null;

  constructor() { 
    this.manager.getUser().then(user => this.user = user);
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  async startAuthentication(): Promise<void> {
    return await this.manager.signinRedirect();
  }

  async completeAuthentication(): Promise<void> {
    this.user = await this.manager.signinRedirectCallback();

    return;
  }

  async startLogout(): Promise<void> {
    return await this.manager.signoutRedirect();
  }

  async completeLogout(): Promise<void> {
    const singoutResponse = await this.manager.signoutRedirectCallback();

    return;
  }
}
