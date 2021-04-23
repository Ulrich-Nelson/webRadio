import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// service permettant de communiquer avec l'API de l'application
export class HttpCustomerService {

  constructor( private httpClient: HttpClient) { }

  post(serviceName: string, data: any) {
    const apiUrl: string = "https://api-radio-world.herokuapp.com";

    const headers = new HttpHeaders();
    const options = { headers: headers, withCredintials: true };
    const url = apiUrl + serviceName;
    
    return this.httpClient.post(url, JSON.stringify(data), options);
    }

}
