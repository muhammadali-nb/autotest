// {
//   image: carImage,
//   tags: ["Комфорт"],
//   brand: "Porsche",
//   model: "911 targa",
//   available: true,
//   deposit: 5950,
//   price_per_day: 3900,
//   id: 1,
// },

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