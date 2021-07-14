import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Customer } from 'src/app/interfaces.ts/Custumer';
import { AuthCustomerService } from 'src/app/services/auth-customer.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  
 //Variable pour la connion des customers
public email: string  = "";
public forgotForm: FormGroup;
 
  constructor( public alertController : AlertController, 
    private router: Router, private authservice: AuthCustomerService,
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
    console.log(data)
    this.router.navigateByUrl('login')
    this.toastMessage.presentToast("The instructions have been sent to your mailbox.", "success")
  },
  (error) => {
    this.toastMessage.presentToast(error.error.message, "warning")
  })
  
}


}
