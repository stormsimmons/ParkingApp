import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthGuard implements CanActivate {


  private user;


  constructor(private http: Http, private router: Router) { }

  canActivate() {
    return new Observable<boolean>(observer => {

      var url = environment.domain;


      const accessToken = localStorage.getItem('token');

      if (accessToken) {
        const headers = new Headers();
        headers.append('authorization', `Bearer ${accessToken}`);

        this.http.get(`http://cpt.innovation.euromonitor.local/auth/user`, {
          headers
        })
          .map((x) => x.json()).subscribe((json) => {
            if (json) {
              this.user = json;
              localStorage.setItem('user', this.user.username);

              observer.next(true);
              observer.complete();
            } else {
              window.location.href = `http://cpt.innovation.euromonitor.local/auth/authorize?response_type=token&client_id=0zyrWYATtw&redirect_uri=${encodeURIComponent(`${url}/#/callback`)}`;
              observer.next(false);
              observer.complete();
            }
          });

      } else {
        window.location.href = `http://cpt.innovation.euromonitor.local/auth/authorize?response_type=token&client_id=0zyrWYATtw&redirect_uri=${encodeURIComponent(`${url}/#/callback`)}`;
        observer.next(false);
        observer.complete();
      }

    });
  }
}
