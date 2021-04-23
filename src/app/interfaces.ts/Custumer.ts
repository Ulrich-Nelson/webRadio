export interface Customer {

   id: number;
   firstname:string;
   lastname:string;
   email:string;
   dateOfBirth: string;
   password:string;
   subscription: Boolean;
   isActive: boolean;
   avatar: string;
   token: string;
   idStripeCustomer: string;
   idSubscriptionStripe: string;

}
