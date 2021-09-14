import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController} from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CardPage } from 'src/app/modals/card/card.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadpageService } from 'src/app/services/loadpage.service';
import { StripePage } from 'src/app/modals/stripe/stripe.page';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {

 public currentPosition: any;
 public height: any;
 public minimumThreshold: any;
 public startPosition: any; 

 //Propriété pour la souscription Stripe
public addCardForm: FormGroup;
public cartNumber: number;
public month: number;
public expirationDate: number;
public CVC: number;
public nameOnCard: string;
public acceptTerms: boolean = false;

 


  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private toastMessage: ToastMessageService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private presentSpinner: LoadpageService) { }

  ngOnInit() {
    this.initForm();
    this.openModalStripe();
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




/*******************SOUSCRIPTION A L'ABONNEMENT STRIPE*************** */
initForm(){
  this.addCardForm = this.formBuilder.group({
    cartNumber: ['', Validators.required],
    month: ['', Validators.required],
    expirationDate: ['', Validators.required],
    CVC: ['', Validators.required],
    nameOnCard: ['', Validators.required],
    acceptTerms: [false, [Validators.required]]
  })
}

async subscriptionAction(){
  if (this.addCardForm.value.acceptTerms == false) {
    this.toastMessage.presentToast("You must accept the privacy terms", "danger")
  } else {
    console.log(this.addCardForm.value)
  this.presentSpinner.Spinner();
  this.authservice.subscription(await this.authservice.getToken(), this.addCardForm.value)
  .subscribe(async (data:any) =>{
    console.log(data)
    this.router.navigateByUrl('tabs/profil')
    this.toastMessage.presentToast("Your subscription has been taken into account", "success")
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  } )
    
  }
  
}


/*--------------DECONNEXION DU CUSTOMER----------*/
async confirmLogout() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Are you sure you want to logout ?',
    message: 'Finalize your subscription in order to benefit from all the services of the application',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.toastMessage.presentToast("Finalize your subscription", "warning")
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





/*----AFFICHER LA PAGE MODALE POUR LES TERMES PRIVEES DE LA CARTE------*/
async openModalStripe(): Promise<any>{
  const modal = await this.modalController.create({
    component:StripePage,
    swipeToClose: true,
    cssClass:'my-StripeModal-class',

  });
  return await modal.present();
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
