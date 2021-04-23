import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { Customer } from '../interfaces.ts/Custumer';
import { HttpCustomerService } from './http-customer.service';
import { StorageCutomerService } from './storage-cutomer.service';

@Injectable({
  providedIn: 'root'
})

// Authentification des customers à l'application
export class AuthCustomerService {

  constructor( private httpService: HttpCustomerService, private storageService: StorageCutomerService, 
  private router: Router, private httpClient: HttpClient) { }

    // Connexion des customers
    login(customer: Customer): Observable<object> {
      return this.httpClient.post('http://localhost:3000/customer/login', {
        "email": customer.email,
        "password": customer.password
      });
      }    
      
      //Inscription des customers
      register(customer: Customer): Observable<object> {
      return this.httpClient.post('http://localhost:3000/customer/register', {
        "firstname": customer.dateOfBirth ,
        "lastname": customer.lastname ,
        "email": customer.email,
        "dateOfBirth": customer.dateOfBirth ,
        "password": customer.password,

      });
      }

      //Envoie d'email pour la rénitialisation du mot de passe des customers
      forgotPassword(customer: Customer): Observable<object> {
        return this.httpClient.post('http://localhost:3000/customer/forgot', {
          "email": customer.email,
        });
        }

      
      //Déconnexion des customers
      logout() {
      this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
      this.router.navigate(['login']);
      });
      }

}
