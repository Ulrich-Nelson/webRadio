import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage implements OnInit {

 currentPosition: any;
 height: any;
 minimumThreshold: any;
 startPosition: any; 
  constructor(public alertController : AlertController) { }

  ngOnInit() {
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



}
