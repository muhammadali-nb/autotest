

export type CarCatalogDataInfo = {
  brand: string;
  model: string;
  min_pay: number;
  id: number;
  price: number;
  image: string
  tags: CarTag[]
};

type CarTag = {
  id: number;
  name: string
}