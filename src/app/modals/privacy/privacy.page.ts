import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  constructor( public alertController : AlertController, 
   private modalController: ModalController) { }

  ngOnInit() {
  }


/*----FERMER LA FENETRE DANS LA PAGE DE CONNEXION------*/
async closeModalPrivacy(){
  await this.modalController.dismiss()
}
}
