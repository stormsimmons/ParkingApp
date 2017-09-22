import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  public ngOnInit():void {
    if (this.activatedRoute) {
      this.activatedRoute.queryParams.subscribe((params: Params): void => {
        const accessToken: string = params['access_token'];
        localStorage.setItem('token', accessToken);
        this.router.navigateByUrl('/');
      });
    }
  }
}
