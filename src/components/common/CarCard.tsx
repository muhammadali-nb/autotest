import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import CarBookingForm from "./CarBookingForm";
import CarRentForm from "./CarRentForm";
import { CarDataType } from "../../types/RentTypes";
import { CarCatalogDataInfo } from "../../types/CatalogTypes";
import { setCatalogFilter } from "../../store/reducers/catalogFilterSlice";

export type ImageInfo = {
	thumb: string;
	full: string;
};
export type StatBlockItem = {
	name: string;
	value: string | number;
};
export type StatBlock = {
	name?: string;
	list: Array<StatBlockItem>;
};

export interface CarDataInfo {
	id: number;
	brand: number | string; //
	model: number | string; // check
	year: number | string;
	special: Array<string | number>;
	thumb: string;
	price: number;
	pay: number;
}

export type CarRentDataInfo = CarDataInfo & {
	deposit: number;
	rentpay: number;
	tarif_name: string
	regnum: string;
	run: number;
	available: boolean;
	available_at: string | boolean
	small?: boolean;
	image?: string;
};

export type CarData = {
	main: CarDataInfo;
	images: Array<ImageInfo>;
	info: Array<StatBlock>;
	tech: Array<StatBlock>;
	standard: Array<StatBlock>;
};

export const CarSameLink: React.FC<{
	car: CarDataInfo | CarCatalogDataInfo;
	style?: React.CSSProperties;
	className?: string;
	text?: string;
	responsive?: boolean;
	onClick?: () => void;
}> = ({
	car,
	style,
	className,
	text = "Посмотреть похожие модели",
	responsive,
	onClick,
}) => {
	return (
		<Link
			to={`/catalog`}
			style={style}
			onClick={onClick}
			className={
				!responsive
					? "car__card-same  " + (className ?? "")
					: "car__card-mobile-same  " + (className ?? "")
			}>
			<span>{text}</span>
			{/* <img src={caretRight} alt={""} style={{ marginLeft: "5px" }} /> */}

			<svg
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<g id="Chevron Right">
					<path
						id="Shape"
						d="M6.25 11.25L10 7.5L6.25 3.75"
						stroke="#222222"
						strokeWidth="1.57642"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</svg>
		</Link>
	);
};

export const CarPreorderButton: React.FC<{
	car: CarCatalogDataInfo;
	style?: React.CSSProperties;
	className?: string;
	w100?: boolean;
}> = ({ car, style, className, w100 = true }) => {
	return (
		<div>
			<CarBookingForm car={car} wide={w100} />
		</div>
	);
};

export const CarRentButton: React.FC<{
	car: CarDataType;
	style?: React.CSSProperties;
	className?: string;
	w100?: boolean;
}> = ({ car, style, className, w100 = true }) => {
	return (
		<div>
			{/*<button className={(className ? className : 'site-btn') + (w100?' w-100':'')}*/}
			{/*        style={style}*/}
			{/*>Забронировать</button>*/}
			<CarRentForm car={car} car_id={car.id} wide={w100} />
		</div>
	);
};
export const CarTag: React.FC<{
	car: CarDataType | any;
	type?: "default" | "free" | "not-free";
	style?: React.CSSProperties;
	className?: string;
	children: any;
	small?: boolean;
}> = ({ car, type, small = "default", style, className, children = true }) => {
	return (
		<div
			className={
				` ${small ? "car__card-mobile-tag" : "car__card-tag"} ` +
				type +
				"" +
				(className ?? "")
			}
			style={style}>
			{children}
		</div>
	);
};

const CarCard: React.FC<{
	car: CarCatalogDataInfo;
	id?: string;
	responsive: boolean;
}> = ({ car, responsive, id }) => {
	const dispatch = useAppDispatch();
	const filter = useAppSelector((state) => state.catalogFilter);
	const navigate = useNavigate();
	const updateSameCarFilter = (value: string) => {
		dispatch(setCatalogFilter({ ...filter, models: [value] }));
	};

	return (
		<div
			className={` ${
				responsive ? "car__card-mobile" : "car__card"
			} anim-start-top-4 anim-duration-1800`}
			id={id}>
			<div>
				<div
					className={` ${
						responsive ? "car__card-mobile-taglist" : "car__card-taglist"
					}  `}>
					{car.tags.map((i, index) => (
						<CarTag small={responsive} key={index} car={car}>
							{i.name}
						</CarTag>
						))}
				</div>

				<Link
					to={`/catalog/${car.id}`}
					className={`${
						responsive ? "car__card-mobile-image" : "car__card-image"
					}`}>
					<img src={car.image} alt={car.brand + " " + car.model} />
				</Link>
				<div
					onClick={() => navigate(`/catalog/${car.id}`)}
					className={` ${
						responsive ? "car__card-mobile-title" : "car__card-title"
					} `}>
					{car.brand} <br /> <span className={"model"}>{car.model}</span>
				</div>
				<div
					className={` ${
						responsive ? "car__card-mobile-payment" : "car__card-payment"
					} `}>
					Минимальный платеж
					<div
						className={` ${
							responsive
								? "car__card-mobile-payment-value"
								: "car__card-payment-value"
						} `}>
						{car.min_pay.toLocaleString()} ₽
					</div>
				</div>
				<div
					className={`${
						responsive ? "car__card-mobile-price" : "car__card-price "
					} `}>
					Цена от&nbsp;
					<span
						className={`${
							responsive
								? "car__card-mobile-price-value"
								: "car__card-price-value "
						}  `}>
						{car.price.toLocaleString()} ₽
					</span>
				</div>
				<CarSameLink
					responsive={responsive}
					car={car}
					className={"mb-px-30 font-weight-semibold"}
					onClick={() => updateSameCarFilter(car.model_id)}
				/>
			</div>
			<div
				className={`${
					responsive ? "car__card-mobile-preorder" : "car__card-preorder "
				} `}>
				<CarPreorderButton car={car} />
			</div>
		</div>
	);
};

export const CarRentCard: React.FC<{
	car: CarRentDataInfo;
	onClick?: () => void;
}> = ({ car }) => {
	return (
		<>
			<div className="d-none d-md-block car__card">
				<div>
					<div className={"car__card-taglist"}>
						<CarTag
							small={true}
							type={car.available ? "free" : "not-free"}
							car={car}>
							{car.available ? "Свободна" : "Занята"}
						</CarTag>
						<CarTag
							small={true}
							type={"default"}
							car={car}>
							{car.tarif_name}
						</CarTag>
						{car.available_at && <CarTag
							small={true}
							type={"free"}
							car={car}>
							{car.available_at}
					</CarTag> }
					</div>

					<div className={"car__card-image"}>
						<img src={car.image} alt={car.brand + " " + car.model} />
					</div>

					{/* <CarRentForm car={car} car_id={car.id} btn={} /> */}

					<div className={"car__card-title mb-px-10"}>
						{car.brand} <br /> <span className={"model"}>{car.model}</span>
					</div>
					<div className={"car__card-regnum font-size-18 font-weight-semibold mb-px-20"}>
						{car.regnum} &nbsp;
					</div>
					<div className={"car__card-payment mb-px-15"}>
						<div className={"mb-px-5"}>Аренда</div>
						<div>
							<span className={"car__card-payment-value"}>
								{car.rentpay.toLocaleString()} ₽
							</span>{" "}
							/ день
						</div>
					</div>
					<div className={"car__card-price mb-px-30"}>
						Депозит от&nbsp;
						<span className={"car__card-price-value"}>
							{car.deposit.toLocaleString()} ₽
						</span>
					</div>
				</div>

				{/* <CarRentForm car={car} car_id={car.id} wide={true} step={"start"} /> */}
				<button className={"site-btn big"}>Забронировать</button>
			</div>

			<div className="d-block d-md-none car-rent-card">
				<div className="car-rent-card_image">
					<img src={car.image} alt={car.brand + " " + car.model} />
				</div>
				<div className=" car-rent-card_body">
					<div className="car__card-taglist car-rent-card_taglist">
						{car.available_at && <CarTag
							small={true}
							type={"free"}
							car={car}>Свободна с {car.available_at}
					</CarTag> }
						<CarTag
							small={true}
							type={car.available ? "free" : "not-free"}
							car={car}>
							{car.available ? "Свободна" : "Занята"}
						</CarTag>
						<CarTag
							small={true}
							type={"default"}
							car={car}>
							{car.tarif_name}
						</CarTag>
					</div>
					<div className="car__card-mobile-title car-rent-card_title">
						{car.brand} <span className={"model"}>{car.model}</span>
					</div>
					<div className={"car__card-payment car-rent-card_payment "}>
						<div>Аренда</div>
						<div>
							<span
								className={
									"car__card-payment-value car-rent-card_payment-value "
								}>
								{car.rentpay.toLocaleString()} ₽
							</span>{" "}
							/ день
						</div>
					</div>
					<div className={" car-rent-card_deposit"}>
						Депозит от&nbsp;
						<span className={"car-rent-card_deposit-value"}>
							{car.deposit.toLocaleString()} ₽
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default CarCard;
