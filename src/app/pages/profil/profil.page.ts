import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  // tableau des factures
  factures: Array<any> = []
  currentPosition: any;
  height: any;
  minimumThreshold: any;
  startPosition: any; 

 //Variable pour la mise à jour du profil des customers.
 firstname:string;
 lastname: string;
 email: string;
 dateOfBirth: string;

 editnForm: FormGroup;

  
  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService) { }


  ngOnInit() {
    this.initForm();
    this.close();
  }
  


  /*----MISE A JOUR DES DONNEES DU CUSTOMER------*/

initForm(){
  this.editnForm = this.formBuilder.group({
    firstname: [ Validators.required],
    lastname: [Validators.required],
    email: [[Validators.required, Validators.email]],
    dateOfBirth: [Validators.required],
    password: [Validators.required],
    confPassword: [ Validators.required],

  })
}





 /*--------------DECONNEXION DU CUSTOMER----------*/
  confirmLogout() {
    this.alertController.create({
      header: 'Are you sure you want to logout ?',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Yes',
        }
      ]
    }).then(res => {
      res.present();
    });
  }


 /*--------------TRAITEMENT DES DONNEES RGPD----------*/
 open(){
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "0px";
  (<HTMLStyleElement>document.querySelector(".bg")).style.display = "block";
}

close(){
  this.currentPosition = 0;
  this.startPosition = 0;
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "-1000px";
  (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0,0,0)";
  (<HTMLStyleElement>document.querySelector(".bg")).style.display = "none";

}

touchMove(evt: TouchEvent){
  if (this.startPosition == 0) {
    this.startPosition = evt.touches[0].clientY;
  }
  this.height = document.querySelector(".bottomSheet").clientHeight;
  var y = evt.touches[0].clientY;
  this.currentPosition = y - this.startPosition;
  if (this.currentPosition > 0 && this.startPosition > 0) {
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
  }
}

touchEnd(){
  this.minimumThreshold = this.height - 130;
  if (this.currentPosition < this.minimumThreshold) {
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
  } else {
    this.close();
  }
}


  // openmodal(){
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No'
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire(
  //         'Removed!',
  //         'Product removed successfully.',
  //         'success'
  //       )
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire(
  //         'Cancelled',
  //         'Product still in our database.)',
  //         'error'
  //       )
  //     }
  //   })
  // }   

}
