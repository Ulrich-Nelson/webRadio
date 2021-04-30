import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Song } from 'src/app/interfaces.ts/songs';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.page.html',
  styleUrls: ['./radio.page.scss'],
})

export class RadioPage implements OnInit {


  //mettre la radio en pause
  isPlaying : boolean = false;

  //récupérer les songs du logiciel
  songsData: Song

  constructor(
    public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService
  ) { }

  ngOnInit() {
    this.getSongRadioAction();
  }

// jouer la radio
  play(){
    this.isPlaying = true;
  }
//mettre la musique en pause
  pause(){
    this.isPlaying = false;
  }


/*----RECUPERATION DES SONGS DU LOGICIEL------*/
async getSongRadioAction(): Promise<void>{
  this.authservice.getSongRadio(await this.authservice.getToken())
  .pipe()
  .subscribe(async (data: any) => {
    this.songsData = data.songs
    console.log(this.songsData)
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  })
}






}


