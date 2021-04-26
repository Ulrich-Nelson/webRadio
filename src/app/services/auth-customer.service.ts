import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { Customer } from '../interfaces.ts/Custumer';
import { HttpCustomerService } from './http-customer.service';
import { StorageCutomerService } from './storage-cutomer.service';

@Injectable({
  providedIn: 'root'
})

// Authentification des customers à l'application
export class AuthCustomerService {

  userData$ = new BehaviorSubject<any>([]);
  
  constructor( private httpService: HttpCustomerService, private storageService: StorageCutomerService, 
  private router: Router, private httpClient: HttpClient) { }


  //Accéder au information de l'utilisateur
  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
    this.userData$.next(res);
    });
    }

    // Connexion des customers
    login(customer: Customer): Observable<object> {
      return this.httpClient.post('https://api-radio-world.herokuapp.com/customer/login', {
        "email": customer.email,
        "password": customer.password
      });
      }    
      
      //Inscription des customers
      register(customer: Customer): Observable<object> {
      return this.httpClient.post('https://api-radio-world.herokuapp.com/customer/register', {
        "firstname": customer.dateOfBirth ,
        "lastname": customer.lastname ,
        "email": customer.email,
        "dateOfBirth": customer.dateOfBirth ,
        "password": customer.password,

      });
      }

      //Mise à jour du profil des customers
      editProfil(customer: Customer): Observable<object> {
        return this.httpClient.put('https://api-radio-world.herokuapp.com/customer/edit_profil', {
          "firstname": customer.dateOfBirth ,
          "lastname": customer.lastname ,
          "email": customer.email,
          "dateOfBirth": customer.dateOfBirth ,
  
        });
        }

      //Envoie d'email pour la rénitialisation du mot de passe des customers
      forgotPassword(customer: Customer): Observable<object> {
        return this.httpClient.post('https://api-radio-world.herokuapp.com/customer/forgot', {
          "email": customer.email,
        });
        }


      //Déconnexion des customers
      logout(token: string): Observable<object> {
          const headers = { 'Authorization': token };
          return this.httpClient.delete('http://localhost:3000/customer/forgot', { headers });
        }
      
      logoutt() {
        this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
        this.userData$.next('');
        this.router.navigate(['login']);
      });
      }

}
