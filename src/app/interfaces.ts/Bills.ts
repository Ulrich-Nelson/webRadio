export interface BillCustomer {

     id: number;
     customerId: string;
     idStripe: string;
     datePayment: Date | string;
     montantHT: number;
     montantTTC: number;
     source: string;
     createdAt: Date;
     updateAt: Date;
  
  }