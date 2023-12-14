export type PaymentBankCardType = {
  id: number,
  number: string,
  name: string,
  favorite: boolean,
  main: boolean,
}


export type PaymentScoreCardType = {
  id: number,
  name: string,
  favorite: boolean,
  main: boolean,
  bank_name: string; //Название банка
  nds: boolean; //НДС
  checking_account: string //Расчетный счет
  correspondent_account: string; //Корректирвачный счет
  taxpayer_identification_number: string //ИНН
  tax_registration_reason_code: string //КПП
}
