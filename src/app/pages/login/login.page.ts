import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { Customer } from 'src/app/interfaces.ts/Custumer';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 // variage pour l'affichage du RGPD
currentPosition: any;
height: any;
minimumThreshold: any;
startPosition: any;
 

 //Variable pour la connion des customers
 email: ""
 password: ""
 loginForm: FormGroup;

  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService) { }

  ngOnInit() {
    this.initForm();
    this.close();
  }

  

/*-------------TRAITEMENT DES DONNEES POUR LA CONNEXION----------*/
initForm(){
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })
}

loginAction(){
  this.authservice.login(this.loginForm.value)
  .pipe()
  .subscribe((data:Customer) => {
    this.storageServive.store(AuthConstants.AUTH, data)
    console.log(data)
    this.router.navigateByUrl('tabs/profil')
    this.toastMessage.presentToast("Utilisateur connecté.")
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message)
  }
  )
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
