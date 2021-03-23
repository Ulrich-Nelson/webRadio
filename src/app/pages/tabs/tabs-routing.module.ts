import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      //chargement de la page permettant de consulter son profil
      {
        path: 'profil',
        children: [
          {
            path: '',
            loadChildren: () => import('../profil/profil.module').then( m => m.ProfilPageModule)
          },
        ]
      },
      //chargement de la page permettant d'écouter la radio
      {
        path: 'radio',
        children: [
          {
            path: '',
            loadChildren: () => import('../radio/radio.module').then(m => m.RadioPageModule)
          },
        ]
      },

      // chargement de la page permettant d 'écouter les musiques en favorite
      {
        path: 'favorites',
        children: [
          {
            path: '',
            loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesPageModule)
          },
        ]
      },
      {// route par défaut 
        path: '',
        redirectTo: 'tabs/profil',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
