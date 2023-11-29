export type RentHistoryDataCarType = {
  id: number;
  image: string;
  brand: string;
  model: string;
  seria: string;
  payment: number;
  deposit: number;
  booking_date: string;
};

export type RentHistoryDataPaymentResult = {
  status: string;
  price?: number
  next: string;
};
export type RentHistoryDataPaymentPerDay = {
  price: number;
  time: string;
  status: string
};

export interface IRentHistoryData {
  id: number;
  car: RentHistoryDataCarType;
  payment_per_day: RentHistoryDataPaymentPerDay;
  payment_result: RentHistoryDataPaymentResult;
}
