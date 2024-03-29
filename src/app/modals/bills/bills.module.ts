import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BillsPageRoutingModule } from './bills-routing.module';

// import { BillsPage } from './bills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillsPageRoutingModule,
    NgbModule
  ],
  // declarations: [BillsPage]
})
export class BillsPageModule {}
