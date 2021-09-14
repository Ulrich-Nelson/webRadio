import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController, ModalController, Platform } from '@ionic/angular';
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
    private modalController: ModalController,
    private menu: MenuController, private plateform: Platform) {}




  /*--------------DECONNEXION DU CUSTOMER----------*/
  ionDidClose(){
    // this.menu.enable(false, 'main-menu');
    this.menu.close('main-menu')
  
  }

  async confirmLogout() {
    this.ionDidClose()
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
            this.toastMessage.presentToast("The disconnection has been canceled", "warning")
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
              this.router.navigateByUrl('home')
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




  /*--------------SUPPRESSION DU COMPTE D'UN UTILISATEUR----------*/
async deleteAccount() {
  this.ionDidClose()
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Are you sure you want to delete your account?',
    message: 'Deleting your account will result in the deletion of your personal information as well as your favorited music. We were very happy to have you with us. ',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'cancel',
        handler: () => {
          this.toastMessage.presentToast("Good resolution", "warning")
        }
      }, {
        text: 'Yes',
        cssClass: 'danger',
        handler: async () => {
          this.authservice.deleteAccount(await this.authservice.getToken())
          .pipe()
          .subscribe(() =>{
            this.storageServive.removeStorageItem(AuthConstants.TOKEN)
            this.storageServive.removeStorageItem(AuthConstants.AUTH)
            this.storageServive.removeStorageItem(AuthConstants.SUBSCRIPTION)
            this.storageServive.clear();   
            this.toastMessage.presentToast("Your account has been deleted. Our team works for the processing of your data", "success")
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


  /*--------------DECONNEXION DU CUSTOMER----------*/
  async unSubscription() {
    this.ionDidClose()
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Unsubscribe?',
      message: 'Deleting your account will result in the deletion of your personal information as well as your favorited music. We were very happy to have you with us. ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'cancel',
          handler: () => {
            this.toastMessage.presentToast("Good resolution", "warning")
          }
        }, {
          text: 'Yes',
          cssClass: 'danger',
          handler: async () => {
            this.authservice.unSubscription(await this.authservice.getToken())
            .pipe()
            .subscribe(() =>{
              // this.storageServive.removeStorageItem(AuthConstants.TOKEN)
              // this.storageServive.removeStorageItem(AuthConstants.AUTH)
              // this.storageServive.removeStorageItem(AuthConstants.SUBSCRIPTION)
              // this.storageServive.clear();   
              this.toastMessage.presentToast("Your account has been deleted. Our team works for the processing of your data", "success")
              // this.router.navigateByUrl('login')
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
