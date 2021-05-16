import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscribePageRoutingModule } from './subscribe-routing.module';
import { SubscribePage } from './subscribe.page';
import { CardPage } from 'src/app/modals/card/card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SubscribePageRoutingModule
  ],
  declarations: [SubscribePage, CardPage],
  entryComponents: [CardPage]
})
export class SubscribePageModule {}
