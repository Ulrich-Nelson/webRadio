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

    //Rétourner le token du customer connecté
    getToken(){
      return this.storageService.get(AuthConstants.TOKEN)
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

      // Connexion des customers
      login(customer: Customer): Observable<object> {
        return this.httpClient.post('http://localhost:3000/customer/login', {
          "email": customer.email,
          "password": customer.password
        });
        }

      //Récupérer les informations de l'utilisateur connecté
      getProfil(token: string): Observable<object> {
        const headers = {'Authorization':  token };
        return this.httpClient.get('http://localhost:3000/customer/getProfil', { headers });
      }

      //Mise à jour du profil des customers
      editProfil(token: string, customer: Customer): Observable<any>  {
        const headers = {'Authorization':  token };
        return this.httpClient.put('http://localhost:3000/customer/edit_profil', customer, { headers });
        }

        //Récupération des factures du customer
        getBills(token: string): Observable<object> {
          const headers = {'Authorization':  token };
          return this.httpClient.get('http://localhost:3000/customer/bills', {headers});  
          }
        
        //Récupérer les songs du logiciel
        getSongRadio(token: string){
          const headers = {'Authorization':  token };
          return this.httpClient.get('http://localhost:3000/customer/getSongs', {headers});  
        }

         //Récupérer les songs mis en favorite
         getFavoriteSong(token: string){
          const headers = {'Authorization':  token };
          return this.httpClient.get('http://localhost:3000/customer/getFavorite', {headers});  
        }


      //Envoie d'email pour la rénitialisation du mot de passe des customers
      forgotPassword(customer: Customer): Observable<object> {
        return this.httpClient.post('http://localhost:3000/customer/forgot', {
          "email": customer.email,
        });
        }

      //Déconnexion des customers
      logout(token: string): Observable<object> {
          const headers = {'Authorization':  token };
          return this.httpClient.delete('http://localhost:3000/customer/logout', { headers });
        }



}
