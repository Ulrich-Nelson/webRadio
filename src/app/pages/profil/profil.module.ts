import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';


import { ProfilPage } from './profil.page';
import { BillsPage } from 'src/app/modals/bills/bills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProfilPage, BillsPage], //Utiliser Bills comme page modal dans la page de profil
  entryComponents: [BillsPage]
})
export class ProfilPageModule {}
