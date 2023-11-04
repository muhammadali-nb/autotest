import { TypeImages } from "../components/pages/Rent/RentCarImagesCarousel";

export interface CarDataType {
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

export interface RentCreateAccountForm {
	name: string;
	lastName: string;
	middleName: string;
	image: string;
	errors: any;
}
