import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthConstants } from 'src/app/config/auth-constants';
import { PrivacyPage } from 'src/app/modals/privacy/privacy.page';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { StorageCutomerService } from 'src/app/services/storage-cutomer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { FacebookLoginPlugin } from '@capacitor-community/facebook-login';
import { Plugins, registerWebPlugin } from '@capacitor/core';
import { isPlatform } from '@ionic/angular';
import { FacebookLogin } from '@capacitor-community/facebook-login';
import { LoadpageService } from 'src/app/services/loadpage.service';

import { GoogleAuth} from '@codetrix-studio/capacitor-google-auth';

registerWebPlugin(FacebookLogin);



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 // variage pour l'affichage du RGPD
public currentPosition: any;
public height: any;
public minimumThreshold: any;
public startPosition: any;
 

 //Variable pour la connexion classique des customers
 public email: ""
 public password: ""
 public loginForm: FormGroup;
 public acceptTerms: boolean = false;
 public showPassword: boolean = false;
 public passwordToggleIcon: string = 'eye-off';

 //Variable pour la connexion Facebook des customers
 public token:any;
 public accessToken: any;
 public userID: any;
 public fbLogin: FacebookLoginPlugin;

 //Variable pour le connexion avec Google 
 public userGoogle = null;


  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private toastMessage: ToastMessageService, 
    private presentSpinner: LoadpageService) { }

  ngOnInit() {
    this.initForm();
    this.setupFbLogin();
  }

  ionViewDidEnter() {
  }

//
/*-------------CONNEXION DES CUSTOMERS AVEC LE COMPTE GOOGLE----------*/

async googleSignupAction() {
  this.presentSpinner.Spinner();
  let googleUser = await Plugins.GoogleAuth.signIn();
  console.log(googleUser)

}



/*-------------TRAITEMENT DES DONNEES POUR LA CONNEXION CLASSIQUE----------*/
initForm(){
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    acceptTerms: [false, [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
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

//console.log(this.loginForm.value.acceptTerms),

  loginAction(): void{
  if (this.loginForm.value.acceptTerms == false) {
    console.log(this.loginForm.value.acceptTerms)
    this.toastMessage.presentToast("You must accept the terms", "danger")
  } else {
    this.authservice.login(this.loginForm.value)
    .subscribe(async (data:any) => {
      this.storageServive.store(AuthConstants.AUTH, data.user)
      this.storageServive.store(AuthConstants.TOKEN, data.user.token)
      this.storageServive.store(AuthConstants.SUBSCRIPTION, data.user.subscription)  
      this.router.navigateByUrl('tabs/profil')
      console.log(await this.storageServive.get(AuthConstants.AUTH))

      this.toastMessage.presentToast("You are logged in", "success")
  },
  (error) =>{
    this.toastMessage.presentToast(error.error.message, "danger")
  }
  )
  }
}


/*-------------TRAITEMENT DES DONNEES POUR LA CONNEXION FACEBOOK----------*/
async setupFbLogin() {
  if (isPlatform('desktop')) {
    this.fbLogin = FacebookLogin;
  } else {
    // Use the native implementation inside a real app!
    const { FacebookLogin } = Plugins;
    this.fbLogin = FacebookLogin;
  } 
}

async facebookLoginAction(){
  this.presentSpinner.Spinner();
  const FACEBOOK_PERMISSIONS = ['email', 'user_birthday'];
  await this.fbLogin.login({ permissions: FACEBOOK_PERMISSIONS });
  //Récupère le token et le userId
  const response: any = await this.fbLogin.getCurrentAccessToken();
  this.accessToken = response.accessToken.token;
  this.userID = response.accessToken.userId;
  console.log( this.accessToken)
  console.log(this.userID)
  if(!this.accessToken || !this.userID){
    this.toastMessage.presentToast("Facebook connection problem", "danger")
  }else{
    (this.authservice.facebookLogin(this.accessToken, this.userID))
    .subscribe(async (data:any) => {
      this.storageServive.store(AuthConstants.AUTH, data.user)
      this.storageServive.store(AuthConstants.TOKEN, data.user.token)
      this.storageServive.store(AuthConstants.SUBSCRIPTION, data.user.subscription)
      this.router.navigateByUrl('tabs/profil')
      console.log( await this.storageServive.get(AuthConstants.AUTH))
  
      this.toastMessage.presentToast("You are logged in with the Facebook account", "success")
    },
    (error) =>{
      this.toastMessage.presentToast(error.error.message, "danger")
    }
    )
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
