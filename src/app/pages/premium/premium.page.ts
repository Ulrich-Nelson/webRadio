import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage implements OnInit {

  public activeTab: string = 'Bills'
  //Récupération des factures du customer
  public bills: any[] = [];

//Envoyer un email aux administrateurs de l'application
  // public email: string = "";
  // public object: string = "";
  // public message: string = "";

  constructor( public alertController : AlertController, 
    private authservice: AuthCustomerService,
   private toastMessage: ToastMessageService,
   private modalController: ModalController,
   private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBillsAction();
  }


  /************* RENDRE ACTIF LES BOUTONS DE NAVIGATIONS******************* */
  segmentChange(e: any){
    this.activeTab = e.target.value;
  }

  /*----RECUPERATION DES FACTURES DU CUSTOMER------*/
async getBillsAction(): Promise<void>{
  this.authservice.getBills(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.bills = data.bills
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  }
  )
}



/*-------------TRAITEMENT DES DONNEES POUR L'ENVOIE DES MESSAGES AUX ADMINISTRATEURS----------*/
async onSubmit(form: NgForm){
  const email = form.value['email'];
  const object = form.value['object'];
  const message = form.value['message'];
  console.log(form.value)
  if (object == '') {
    this.toastMessage.presentToast("Please specify the subject of the message", "danger")
  } else if (object <= 5){
    this.toastMessage.presentToast("Your item is very short", "danger")
  } else if (message == ''){
    this.toastMessage.presentToast("Please enter the message to send", "danger")
  }else if (message <= 10){
    this.toastMessage.presentToast("Sorry your message is very short", "danger")
  }
  else {
    this.authservice.sendMailToDeveloper(await this.authservice.getToken(), form.value)
    .subscribe(async (data:any) => {

      this.toastMessage.presentToast("Your message has been successfully sent", "success")
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  }
  )
  }

}
  

}
