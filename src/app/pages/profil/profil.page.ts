import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { BillCustomer } from 'src/app/interfaces.ts/Bills';
import { Customer } from 'src/app/interfaces.ts/Custumer';
import { BillsPage } from 'src/app/modals/bills/bills.page';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  currentPosition: any;
  height: any;
  minimumThreshold: any;
  startPosition: any; 

 //Variable pour la mise à jour du profil des customers.
 customerData: any;
 editProfilForm: FormGroup;
 profilData: Customer;

 //Information de l'utilisateur connecté
 firstname:string;
 lastname: string;
 email: string;
 dateOfBirth: string;
 avatar : string;

  
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
    console.log(data)
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  }
  )
}

/*----ANNULER LA MISE A JOUR DU PROFILE------*/



/*----AFFICHER LA PAGE MODALE POUR LES FACTURES DU CUSTOMER------*/
async openModal(): Promise<any>{
  const modal = await this.modalController.create({
    component:BillsPage,
    swipeToClose: true,
    cssClass:'my-custom-class',
    presentingElement: await this.modalController.getTop()

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
    console.log(customer)
    this.authservice.editProfil(await this.authservice.getToken(), customer)
    .pipe()
    .subscribe(async (data: any) => {
    console.log(data)
    this.toastMessage.presentToast("Profile mis à jour", "success")
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  }
  )
}


/*********************** RESET PROFIL ****************************/
reset(){
this.getProfilAction();
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
            this.toastMessage.presentToast("Bonne resolution.", "primary")
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
              this.toastMessage.presentToast("error.error.message", "danger")
            }
            );
          }
        }
      ]
    });

    await alert.present();
  }





}