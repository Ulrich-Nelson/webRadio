import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY: string = "Authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url: string = environment.url
  public cutomerInfo = null;
  public  authenticationState = new BehaviorSubject(false);

  // constructeur pour l'authentification des customers
  constructor( private _router: Router,
     private _httpClient: HttpClient,
      private helper: JwtHelperService,
      private storage: Storage,
      private plt: Platform,
      private tostMessage: ToastController )  {
        //Récupération du token des customers
        this.plt.ready().then(() =>  {
          this.checkToken();
        })

   }

   //Récupération du token des customers
   checkToken() {
    this.storage.get(TOKEN_KEY).then((token: string) => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.cutomerInfo = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }


  // Inscription des customers à l'application
  register(customer: any) {
    return this._httpClient.post(`${this.url}/customer/register`, customer).pipe(
      (e: any) => {
        this.openToast(e.error.message);
        throw new Error(e);
      }
    );
  }

  // Connexion des customers à l'application
  login(customer: any) {
    return this._httpClient.post(`${this.url}/customer/login`, customer)
      .pipe(
        tap((res: { [x: string]: string; }) => {
          this.storage.set(TOKEN_KEY, res['token']);
          this.cutomerInfo = this.helper.decodeToken(res['token']);
          this.authenticationState.next(true);
        }),
        (e: any) => {
          this.openToast(e.error.message);
          throw new Error(e);
        }
      );
  }

  // Déconnexion des customers à l'application
  logout(): void {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  //Rétourne si le customer est connecté ou non
  isAuthenticated() {
    return this.authenticationState.value;
  }


  // Message d'information au customer
  async openToast(message: string): Promise<void> {
    const toast = await this.tostMessage.create({
      message: message,
      animated: true,
      position: 'top',
      color: 'red',
      duration: 3000
    });
    toast.present();
  }



}



//Déclaration de la fonction tap
function tap(arg0: (res: { [x: string]: string; }) => void): import("rxjs").OperatorFunction<Object, unknown> {
  throw new Error('Function not implemented.');
}

