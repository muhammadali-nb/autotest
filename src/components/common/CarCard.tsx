import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Link, useNavigate } from "react-router-dom";
import { type BaseState } from "../../store/reducers/baseDataSlice";
import CarBookingForm from "./CarBookingForm";
import CarRentForm from "./CarRentForm";
import { CatDataType } from "../../types/rent-types";

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
	regnum: string;
	run: number;
	available: boolean;
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
	car: CarDataInfo;
	style?: React.CSSProperties;
	className?: string;
	text?: string;
	responsive?: boolean;
}> = ({
	car,
	style,
	className,
	text = "Посмотреть похожие модели",
	responsive,
}) => {
	return (
		<Link
			to={`/catalog?same=${car.id}`}
			style={style}
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
	car: CarDataInfo;
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
	car: CatDataType;
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
	car: CatDataType | any;
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
	car: CarDataInfo;
	id?: string;
	responsive: boolean;
}> = ({ car, responsive, id }) => {
	const baseData: BaseState = useAppSelector((state) => state.baseData);

	const tags =
		baseData.top?.special.values?.filter((i) => car.special.includes(i.id)) ??
		[];

	const brand =
		baseData.left?.brands.values?.find((i) => car.brand === i.id)?.name ??
		"неизвестно";
	const model =
		baseData.left?.models.values?.find((i) => car.model === i.id)?.name ??
		"неизвестно";

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
					{tags.map((i, index) => (
						<CarTag small={responsive} key={index} car={car}>
							{i.name}
						</CarTag>
					))}

					{/* {car.special.map((i, index) => (
						<CarTag key={index} small={false} car={car}>
							{i}
						</CarTag>
					))} */}
				</div>

				<Link
					to={`/catalog/${car.id}`}
					className={`${
						responsive ? "car__card-mobile-image" : "car__card-image"
					}`}>
					<img src={car.thumb} alt={brand + " " + model} />
				</Link>
				<div
					className={` ${
						responsive ? "car__card-mobile-title" : "car__card-title"
					} `}>
					{brand} <span className={"model"}>{model}</span>
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
						{car.pay.toLocaleString()} ₽
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
}> = ({ car }) => {
	const baseData: BaseState = useAppSelector((state) => state.baseData);
	const navigate = useNavigate();
	// console.log(car);

	// const tags =
	// 	baseData.top?.rent.values?.filter((i) => car.special.includes(i.id)) ?? [];
	// const brand =
	// 	baseData.left?.brands.values?.find((i) => car.brand === i.id)?.name ??
	// 	"неизвестно";
	// const model =
	// 	baseData.left?.models.values?.find((i) => car.model === i.id)?.name ??
	// 	"неизвестно";

	return (
		<>
			<div className={"d-none d-md-block car__card"}>
				<div>
					<div className={"car__card-taglist"}>
						<CarTag
							small={true}
							type={car.available ? "free" : "not-free"}
							car={car}>
							{car.available ? "Свободна" : "Занята"}
						</CarTag>
						{/* {tags.map((i, index) => (
							<CarTag small={true} key={index} car={car}>
								{i.name}
							</CarTag>
						))} */}
					</div>

					<CarRentForm
						car={car}
						car_id={car.id}
						btn={
							<div className={"car__card-image"}>
								<img src={car.image} alt={car.brand + " " + car.model} />
							</div>
						}
					/>

					<div className={"car__card-title mb-px-10"}>
						{car.brand} <br /> <span className={"model"}>{car.model}</span>
					</div>
					<div className={"font-size-18 font-weight-semibold mb-px-20"}>
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
						Депозит от от&nbsp;
						<span className={"car__card-price-value"}>
							{car.deposit.toLocaleString()} ₽
						</span>
					</div>
				</div>

				<CarRentForm car={car} car_id={car.id} wide={true} step={"start"} />
			</div>

			<div
				onClick={() => navigate(`/rent/${car.id}`)}
				className="d-block d-md-none car-rent-card">
				<div className="car-rent-card_image">
					<img src={car.image} alt={car.brand + " " + car.model} />
				</div>
				<div className=" car-rent-card_body">
					<div className="car__card-taglist car-rent-card_taglist">
						<CarTag type={car.available ? "free" : "not-free"} car={car}>
							{car.available ? "Свободна" : "Занята"}
						</CarTag>
						{/* {tags.map((i, index) => (
							<CarTag small={true} key={index} car={car}>
								{i.name}
							</CarTag>
						))} */}
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
						Депозит от от&nbsp;
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
