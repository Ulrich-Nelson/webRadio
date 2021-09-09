import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadpageService {

  constructor(public loadingCtrl: LoadingController) { }

  //Présentation du spinner lors su chargement de la page
  Spinner() {
      this.loadingCtrl.create({
          spinner: 'bubbles',
          duration: 2000,
          cssClass:'ion-loading-class',
          backdropDismiss: true,
          message: 'Radio world  Loading...👨 ',
      }).then((res) => {
          res.present();
      });
  }


}


