import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(public toastController: ToastController) { }

  // Message d'information au customer
  async presentToast(messageInfo: string, colorCard: string) {
    const toast = await this.toastController.create({
      message: messageInfo,
      animated: true,
      position: "top",
      color: colorCard,
      cssClass: 'secondary',
      duration: 2000,
      translucent: true
    });
    toast.present();
  }


}
