
import { TypeImages } from "../components/pages/Rent/RentCarImagesCarousel";


export type CarCatalogDataInfo = {
  brand: string;
  model: string;
  min_pay: number;
  id: number;
  price: number;
  image: string;
  model_id: string
  tags: CarTagType[]
};

type CarTagType = {
  id: number;
  name: string
}

export type TypeCarDataInfoValue = {
  name: string;
  value: string;
  id: number
}

type TypeCarDataParametr = {
  name: string
  list: TypeCarDataInfoValue[]
}

export interface ICarData {
  brand: string,
  brand_id: string,
  id: number;
  images: TypeImages[],
  min_pay: number;
  model: string;
  model_id: string;
  price: number;
  guarantee: number;
  osago: number;
  kasko: number;
  koef: number;
  srok_from: number;
  srok_to: number
  tags: CarTagType[]
  info: {
    name: string
    list: TypeCarDataInfoValue[]
  }
  technical_parameters: TypeCarDataParametr[]
  equipment: TypeCarDataParametr[]
}