export class BillCustomer {

  public id: number;
  public customerId: string;
  public idStripe: string;
  public datePayment: Date | string;
  public montantHT: number;
  public montantTTC: number;
  public source: string;
  public createdAt: Date;
  public updateAt: Date;

  constructor() { }
}
