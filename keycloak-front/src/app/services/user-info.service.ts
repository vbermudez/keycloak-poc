import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private authService: AuthService) { }

  async requestUserInfo(): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.getAuthorizationHeaderValue()
        , 'Accept': 'application/json'
      })
    };

    return await this.http.get(`${env.apiUrl}/userinfo`, httpOptions).pipe(
      tap(_ => console.log('requestUserInfo ejecutado')),
      catchError( this.handleErr<any>('requestUserInfo', null) )
    ).toPromise();
  }

  async openIdConfig(): Promise<any> {
    const configUrl = `${env.openIdClientConfig["auth-server-url"]}${env.openIdConfigUri}`;
    
    return await this.http.get(configUrl).pipe(
      tap(_ => console.log('openIdConfig ejecutado')),
      catchError( this.handleErr<any>('openIdConfig', null) )
    ).toPromise();
  }

  private handleErr<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
