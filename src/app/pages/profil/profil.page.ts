import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  // tableau des factures
  factures: Array<any> = []
  // Current positon of the swipe
  currentPosition: any;
  //height of the bottom sheet div
  height: any;
  //Minimum height to dismiss the bottom sheet
  minimumThreshold: any;
  //Starting position of the swipe
  startPosition: any; 

  
  constructor(public alertController : AlertController) { }

  ngOnInit() {
    //close bottom Sheet on loading the page
    this.close();
  }
  

  //Message d'alerte pour la déconnexion
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
 
  // Ouvir le RGPD
  open(){
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "0px";
    (<HTMLStyleElement>document.querySelector(".bg")).style.display = "block";
  }

  close(){
    this.currentPosition = 0;
    this.startPosition = 0;
    //Hidding Bottom Sheet by setting bottom value in negative value
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "-1000px";
    //Reset Bottom Sheet Translate value
    (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0,0,0)";
    // Hide Background Overlay
    (<HTMLStyleElement>document.querySelector(".bg")).style.display = "none";

  }

  // On Swiping the bottom Sheet
  touchMove(evt: TouchEvent){
    //if there is no starting value, then store first touch value in startPosition variable
    if (this.startPosition == 0) {
      this.startPosition = evt.touches[0].clientY;
    }
    //Get bottom sheet height
    this.height = document.querySelector(".bottomSheet").clientHeight;
    //Top position in every touch move
    var y = evt.touches[0].clientY;
    //Calculate currentPositon value for swinping the bottom sheet
    this.currentPosition = y - this.startPosition;
    // Do swiping, if current positon & start position values are greater than 0
    if (this.currentPosition > 0 && this.startPosition > 0) {
      (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
    }
  }

  // On Stop touching

  touchEnd(){
    //calculate minimum height for close the Bottom Sheet
    this.minimumThreshold = this.height - 130;
    // if current position is less than minimim heigth, then fully open the Bottom Sheet
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
