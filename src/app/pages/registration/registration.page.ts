import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { PrivacyPage } from 'src/app/modals/privacy/privacy.page';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {


//Les informations sur le RGPD
 public currentPosition: any;
 public height: any;
 public minimumThreshold: any;
 public startPosition: any; 


 //Variable pour la connion des customers
 public firstname:string = "";
 public lastname:string  = "";
 public email:string = "";
 public dateOfBirth:string = "";
 public password:string = "";
 public confPassword:string = "";
 public acceptTerms: boolean = false;
 public registerForm: FormGroup;
 public showPassword: boolean = false;
 public showPassword2: boolean = false;
 public passwordToggleIcon: string = 'eye-off';
 public passwordToggleIcon2: string = 'eye-off';


 constructor( public alertController : AlertController, 
  private router: Router, private authservice: AuthCustomerService,
  private modalController: ModalController,
  private formBuilder: FormBuilder,
  private toastMessage: ToastMessageService) { }


  ngOnInit() {
    //this.close();
    this.initForm();
  }



/*----TRAITEMENT DES DONNEES POUR LA INSCRIPTION-------*/
initForm(): void{
  this.registerForm = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: ['', Validators.required],
    password: ['', Validators.required],
    confPassword: ['', Validators.required],
    acceptTerms: [false, [Validators.required]],

  })
}


//Afficher ou masquer le mot de passe
togglePassword(): void{
  this.showPassword = !this.showPassword;
  if(this.passwordToggleIcon == 'eye-off'){
    this.passwordToggleIcon = 'eye';
  }else{
    this.passwordToggleIcon = 'eye-off'
  }
}


togglePassword2(): void{
  this.showPassword2 = !this.showPassword2;
  if(this.passwordToggleIcon2 == 'eye-off'){
    this.passwordToggleIcon2 = 'eye';
  }else{
    this.passwordToggleIcon2 = 'eye-off'
  }
}

registerAction():void{
  let password: string = this.registerForm.value.password;
  let confPassword: string = this.registerForm.value.confPassword;
  let termsValid: boolean = this.registerForm.value.acceptTerms
  console.log(this.registerForm.value)
  if (password != confPassword) {
    this.toastMessage.presentToast("Passwords are different", "danger")
  } else if (termsValid == false){
    this.toastMessage.presentToast("You must accept the privacy terms", "danger")
  } else {
    this.authservice.register(this.registerForm.value)
    .pipe()
    .subscribe(() => {
      this.router.navigateByUrl('login')
      this.toastMessage.presentToast("Your account has been successfully created", "success")
    },
    (error) =>{
      this.toastMessage.presentToast(error.error.message, "danger")
    })
  }
  
}


/*----AFFICHER LA PAGE MODALE POUR LES FACTURES DU CUSTOMER------*/
async openModalPrivacy(): Promise<any>{
  const modal = await this.modalController.create({
    component:PrivacyPage,
    swipeToClose: true,
    cssClass:'my-privacyModal-class',

  });
  return await modal.present();
}



}



  /*--------------TRAITEMENT DES DONNEES RGPD----------*/
  // open(){
  //   (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "0px";
  //   (<HTMLStyleElement>document.querySelector(".bg")).style.display = "block";
  // }

  // close(){
  //   this.currentPosition = 0;
  //   this.startPosition = 0;
  //   (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.bottom = "-1000px";
  //   (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0,0,0)";
  //   (<HTMLStyleElement>document.querySelector(".bg")).style.display = "none";

  // }

  // touchMove(evt: TouchEvent){
  //   if (this.startPosition == 0) {
  //     this.startPosition = evt.touches[0].clientY;
  //   }
  //   this.height = document.querySelector(".bottomSheet").clientHeight;
  //   var y = evt.touches[0].clientY;
  //   this.currentPosition = y - this.startPosition;
  //   if (this.currentPosition > 0 && this.startPosition > 0) {
  //     (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px," + this.currentPosition + "px,0px)";
  //   }
  // }

  // touchEnd(){
  //   this.minimumThreshold = this.height - 130;
  //   if (this.currentPosition < this.minimumThreshold) {
  //     (<HTMLStyleElement>document.querySelector(".bottomSheet")).style.transform = "translate3d(0px,0px,0px)";
  //   } else {
  //     this.close();
  //   }
  // }
