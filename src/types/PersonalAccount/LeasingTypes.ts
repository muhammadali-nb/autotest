
export interface IPersonalAccountLeasingCarDataInfo {
  image: string;
  brand: string;
  model: string;
  regnum: string;
  payment: number;
}

export interface IPersonalAccountLeasingCarDataBankAccounts {
  osago: {
    to: string;
    number: string
  };
  kasko: {
    to: string;
    number: string
  };
  deal_number: string;
  deal_date: string
}

export interface IPersonalAccountLeasingCarCardPaymentStatus {
  status: "success" | "rejected" | "waiting" | "banned",
  status_message: string
  date: string
}

export interface IPersonalAccountLeasingCarData {
  id: number
  car: IPersonalAccountLeasingCarDataInfo
  bank_accounts: IPersonalAccountLeasingCarDataBankAccounts;
  payment: {
    price: number
    date: string
  }
  payment_status: IPersonalAccountLeasingCarCardPaymentStatus
}