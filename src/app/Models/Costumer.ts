export class Customer {

  public id: number;
  public firstname:string;
  public lastname:string;
  public email:string;
  public dateOfBirth: string;
  public password:string;
  public subscription: Boolean;
  public isActive: boolean;
  public avatar: string;
  public token: string;
  public idStripeCustomer: string;
  public idSubscriptionStripe: string;

  constructor() { }
}
