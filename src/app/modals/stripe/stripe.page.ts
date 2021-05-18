import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.page.html',
  styleUrls: ['./stripe.page.scss'],
})
export class StripePage implements OnInit {

  constructor( private modalController: ModalController) { }

  ngOnInit() {
  }


  /*----FERMER LA FENETRE MODALE DANS LA PAGE DE SOUSCRIPTION------*/
async closeModalStripe(){
  await this.modalController.dismiss()
}


}
