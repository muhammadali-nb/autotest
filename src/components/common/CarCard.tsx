import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Link } from "react-router-dom";
import { type BaseState } from "../../store/reducers/baseDataSlice";
import caretRight from "./../../img/common/caret-right.png";
import CarBookingForm from "./CarBookingForm";
import CarRentForm from "./CarRentForm";

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
	id: number | string;
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
					? "car__card-same  "
					: "car__card-mobile-same  " + (className ?? "")
			}>
			<span>{text}</span>
			<img src={caretRight} alt={""} style={{ marginLeft: "5px" }} />
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
	car: CarRentDataInfo;
	style?: React.CSSProperties;
	className?: string;
	w100?: boolean;
}> = ({ car, style, className, w100 = true }) => {
	return (
		<div>
			{/*<button className={(className ? className : 'site-btn') + (w100?' w-100':'')}*/}
			{/*        style={style}*/}
			{/*>Забронировать</button>*/}
			<CarRentForm car={car} wide={w100} />
		</div>
	);
};
export const CarTag: React.FC<{
	car: CarRentDataInfo | CarDataInfo;
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
								? "car__card-mobile-payment"
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

	const tags =
		baseData.top?.rent.values?.filter((i) => car.special.includes(i.id)) ?? [];
	const brand =
		baseData.left?.brands.values?.find((i) => car.brand === i.id)?.name ??
		"неизвестно";
	const model =
		baseData.left?.models.values?.find((i) => car.model === i.id)?.name ??
		"неизвестно";

	return (
		<div className={"car__card"}>
			<div>
				<div className={"car__card-taglist"}>
					<CarTag type={car.available ? "free" : "not-free"} car={car}>
						{car.available ? "Свободна" : "Занята"}
					</CarTag>
					{tags.map((i, index) => (
						<CarTag small={true} key={index} car={car}>
							{i.name}
						</CarTag>
					))}
				</div>

				<CarRentForm
					car={car}
					btn={
						<div className={"car__card-image"}>
							<img src={car.thumb} alt={brand + " " + model} />
						</div>
					}
				/>

				<div className={"car__card-title mb-px-10"}>
					{brand} <span className={"model"}>{model}</span>
				</div>
				<div className={"font-size-18 font-weight-semibold mb-px-20"}>
					{car.regnum}
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

			<CarRentForm car={car} wide={true} step={"start"} />
		</div>
	);
};

export default CarCard;
