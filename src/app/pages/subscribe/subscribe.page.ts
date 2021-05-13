import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController} from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CardPage } from 'src/app/modals/card/card.page';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {

 currentPosition: any;
 height: any;
 minimumThreshold: any;
 startPosition: any; 


  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private toastMessage: ToastMessageService,
    private modalController: ModalController) { }

  ngOnInit() {
  }


/*----AFFICHER LA PAGE MODALE POUR LES TERMES PRIVEES DE LA CARTE------*/
async openModalCard(): Promise<any>{
  const modal = await this.modalController.create({
    component:CardPage,
    swipeToClose: true,
    cssClass:'my-cardModal-class',

  });
  return await modal.present();
}



/*--------------DECONNEXION DU CUSTOMER----------*/
async confirmLogout() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Are you sure you want to logout ?',
    message: ' Finaliser votre abonnement afin de beneficier de l\'application',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.toastMessage.presentToast("Finaliser votre souscription", "warning")
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
            this.toastMessage.presentToast("Utilisateur déconnecté", "success")
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




  
/*--------------TRAITEMENT DES DONNEES RGPD----------*/
open(){
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "0px";
  (<HTMLStyleElement>document.querySelector(".bg")).style.display = "block";
}

close(){
  this.currentPosition = 0;
  this.startPosition = 0;
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "-1000px";
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0,0,0)";
  (<HTMLStyleElement>document.querySelector(".bg")).style.display = "none";

}


touchMove(evt: TouchEvent){
  if (this.startPosition == 0) {
    this.startPosition = evt.touches[0].clientY;
  }
  this.height = document.querySelector(".bottomSheet").clientHeight;
  var y = evt.touches[0].clientY;
  this.currentPosition = y - this.startPosition;
  if (this.currentPosition > 0 && this.startPosition > 0) {
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
  }
}

touchEnd(){
  this.minimumThreshold = this.height - 130;
  if (this.currentPosition < this.minimumThreshold) {
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
  } else {
    this.close();
  }
}



}
