import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { LogoutCallbackComponent } from './components/logout-callback/logout-callback.component';

@NgModule({
  declarations: [
    AppComponent
    , LoginComponent
    , HomeComponent, UserInfoComponent, AuthCallbackComponent, LogoutCallbackComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , AppRoutingModule
    , HttpClientModule
    , BrowserAnimationsModule
    // , MatInputModule
    , MatButtonModule
    // , MatFormFieldModule
    , MatCardModule
    , MatToolbarModule
    , MatMenuModule
  ],
  providers: [
    AuthGuardService
    , AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
