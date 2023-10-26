import { TypeImages } from "../components/pages/Rent/RentCarImagesCarousel";

export interface CatDataType {
	available: boolean;
	available_at: boolean;
	brand: string;
	model: string;
	deposit: number;
	id: number;
	rentpay: number;
	regnum: string;
	run: number;
	tarif: string;
	image: string;
	images: Array<TypeImages>;
	year: string;
	kpp: string;
}
