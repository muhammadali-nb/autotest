// {
//   tags: ["Лизинг до 7 лет", "Аванс 0%"],
//   brand: "Lexus",
//   model: "570",
//   regnum: "К638ЕТ 53",
//   price_per_day: 5100,
//   price: 2150000,
//   id: 1,
// },

export interface ICatalogCar {
  tags: string[],
  brand: string,
  model: string,
  regnum: string,
  min_pay: number,
  price: number,
  id: number,
  image: string

}