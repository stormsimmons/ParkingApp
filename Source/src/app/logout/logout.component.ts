import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logOut(){
    const url = environment.domain;

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = `http://cpt.innovation.euromonitor.local/auth/authorize?response_type=token&client_id=0zyrWYATtw&redirect_uri=${encodeURIComponent(`${url}/#/callback`)}`;
    
   }
}
