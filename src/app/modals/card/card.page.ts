import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  constructor( private modalController: ModalController,) { }

  ngOnInit() {
  }




/*----FERMER LA FENETRE MODALE DANS LA PAGE DE SOUSCRIPTION------*/
async closeModalCard(){
  await this.modalController.dismiss()
}


}
