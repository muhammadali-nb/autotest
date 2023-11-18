
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

export interface ICarData {
  brand: string,
  brand_id: string,
  id: number;
  images: TypeImages[],
  min_pay: number;
  model: string;
  model_id: string;
  price: number;
  tags: CarTagType
}