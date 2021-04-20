import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _router: Router, private _httpClient: HttpClientModule)  {

   }

}
