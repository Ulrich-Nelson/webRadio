import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthConstants } from './config/auth-constants';
import { AuthCustomerService } from './services/auth-customer.service';
import { StorageCutomerService } from './services/storage-cutomer.service';
import { ToastMessageService } from './services/toast-message.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService,
    private modalController: ModalController) {}




  /*--------------DECONNEXION DU CUSTOMER----------*/
  async confirmLogout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Are you sure you want to logout ?',
      message: '',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.toastMessage.presentToast("The disconnection has been canceled", "light")
          }
        }, {
          text: 'Yes',
          handler: async () => {
            this.authservice.logout(await this.authservice.getToken())
            .pipe()
            .subscribe(() =>{
              this.storageServive.removeStorageItem(AuthConstants.TOKEN)
              this.storageServive.removeStorageItem(AuthConstants.AUTH)
              this.storageServive.removeStorageItem(AuthConstants.SUBSCRIPTION)
              this.storageServive.clear();   
              this.toastMessage.presentToast("You have been disconnected", "success")
              this.router.navigateByUrl('login')
            },
            (error) => {
              this.toastMessage.presentToast(error.error.message, "danger")
            }
            );
          }
        }
      ]
    });

    await alert.present();
  }


  
}
