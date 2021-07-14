import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Customer } from 'src/app/interfaces.ts/Custumer';
import { BillsPage } from 'src/app/modals/bills/bills.page';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit{

  public currentPosition: any;
  public height: any;
  public minimumThreshold: any;
  public startPosition: any; 

 //Variable pour la mise à jour du profil des customers.
 public customerData: any;
 public editProfilForm: FormGroup;
 public profilData: Customer;

 //Information de l'utilisateur connecté
 public firstname:string;
 public lastname: string;
 public email: string;
 public dateOfBirth: string;
 public avatar : string;
//Récupération des songs en favorites
public favoriteData: any[] = [];

//Récupération des factures du customer
 public bills: any[] = [];
  
  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet) { }


  ngOnInit() {
    this.initForm();
    this.getProfilAction();
    this.getFavoriteSongAction();
    this.getBillsAction();
  }



  /*----RECUPERATION DES SONGS MIS EN FAVORITES------*/
  async getFavoriteSongAction(): Promise<void>{
    this.authservice.getFavoriteSong(await this.authservice.getToken())
    .pipe()
    .subscribe(async (data: any) => {
      this.favoriteData = data.favorites
    },
    (error) =>{
      this.toastMessage.presentToast(error.error.message, "warning")
    })
  }
  

  /*----RECUPERATION DES FACTURES DU CUSTOMER------*/
async getBillsAction(): Promise<void>{
  this.authservice.getBills(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.bills = data.bills
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "warning")
  }
  )
}




/*----RECUPERE LES INFORMATION DU CUSTOMER CONNECTE------*/
async getProfilAction(): Promise<void>{
  this.authservice.getProfil(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.firstname = data.user.firstname;
    this.lastname = data.user.lastname;
    this.email = data.user.email;
    this.dateOfBirth = data.user.dateOfBirth;
    this.avatar = data.user.avatar;
    this.profilData = data.user
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "warning")
  }
  )
}



/*********************** RESET PROFIL ****************************/
reset(){
  this.getProfilAction();
  }



/*----AFFICHER LA PAGE MODALE POUR LES FACTURES DU CUSTOMER------*/
async openModal(): Promise<any>{
  const modal = await this.modalController.create({
    component:BillsPage,
    swipeToClose: true,
    cssClass:'my-billsModal-class',
    //presentingElement: await this.modalController.getTop()

  });
  return await modal.present();
}




/*----MISE A JOUR DES DONNEES DU CUSTOMER------*/
initForm(): void{
  this.editProfilForm = this.formBuilder.group({
    firstname: [this.firstname, Validators.required],
    lastname: [this.lastname, Validators.required],
    email: [this.email, [Validators.required, Validators.email]],
    dateOfBirth: [this.dateOfBirth, Validators.required],
  });
}

  async editProfilAction(){
    const customer = this.editProfilForm.value
    this.authservice.editProfil(await this.authservice.getToken(), customer)
    .pipe()
    .subscribe(async (data: any) => {
      console.log(data.customer);
    this.toastMessage.presentToast("your profile has been updated", "success")
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "warning")
  }
  )
}






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