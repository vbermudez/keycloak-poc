import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LogoutCallbackComponent } from './components/logout-callback/logout-callback.component';

import { HomeComponent } from './components/home/home.component';
// import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
  , { path: 'auth-callback', component: AuthCallbackComponent }
  , { path: 'logout-callback', component: LogoutCallbackComponent }
  , { path: 'userinfo', component: UserInfoComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
