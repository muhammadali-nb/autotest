export interface IRentCar {
  image: string,
  tags: string[],
  brand: string,
  model: string,
  available: boolean,
  deposit: number,
  regnum: string,

  price_per_day: number,
  id: number,
}

type TypeRentCarDetailInfoTarif = { dedline: string, price: number, id: number }
type TypeRentCarDetailInformation = {
  name: string,
  value: string,
  id: number,
}
export interface IRentCarDetailInfo {
  brand: string,
  model: string,
  regnum: string,
  deposit: number,
  tarif: TypeRentCarDetailInfoTarif[],
  info: TypeRentCarDetailInformation[],
  tags: string[],
  available: boolean
  price_per_day: number,
}
