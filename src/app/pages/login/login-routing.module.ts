import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCardGuard } from 'src/app/guards/add-card.guard';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    // canActivate: [AddCardGuard] // protéger la route
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
