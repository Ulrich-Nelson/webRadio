import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscribePageRoutingModule } from './subscribe-routing.module';
import { SubscribePage } from './subscribe.page';
import { CardPage } from 'src/app/modals/card/card.page';
import { StripePage } from 'src/app/modals/stripe/stripe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SubscribePageRoutingModule
  ],
  declarations: [SubscribePage, CardPage, StripePage],
  entryComponents: [CardPage, StripePage]
})
export class SubscribePageModule {}
