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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  
 //Variable pour la connion des customers
email: string  = "";
forgotForm: FormGroup;
 
  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
    private storageServive: StorageCutomerService,
    private formBuilder: FormBuilder,
    private toastMessage: ToastMessageService) { }



  ngOnInit() {
    this.initForm();
  }



/*-------------TRAITEMENT DES DONNEES POUR LA RENITIALISATION DU MOT DE PASSE----------*/
initForm(){
  this.forgotForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  })
}

forgotAction(){
  this.authservice.forgotPassword(this.forgotForm.value)
  .pipe()
  .subscribe((data: Customer) => {
    this.storageServive.store(AuthConstants.AUTH, data)
    console.log(data)
    this.router.navigateByUrl('login')
    this.toastMessage.presentToast("Vérifier votre boite email")
  },
  (error) => {
    this.toastMessage.presentToast(error.error.message)
  })
  
}


}
