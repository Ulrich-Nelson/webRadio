import { Component, OnInit } from '@angular/core';
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

  constructor( public alertController : AlertController, 
    private authservice: AuthCustomerService,
   private toastMessage: ToastMessageService,
   private modalController: ModalController) { }

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



  

}
