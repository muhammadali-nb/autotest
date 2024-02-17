import React from "react";
import { CarData, CarPreorderButton, CarSameLink } from "../../common/CarCard";
import { useAppSelector } from "../../../store/hooks";
import CarStatBlock, { CarStatBlockItem } from "./CarStatBlock";
import IndexCalculator from "../Index/IndexCalculator";
import { Container } from "react-bootstrap";
import { ICarData } from "../../../types/CatalogTypes";

const CarBase: React.FC<{ car: CarData | any; car_data: ICarData }> = ({
	car,
	car_data,
}) => {
	return (
		<div className={"car-base"}>
			<div className="car-base_body">
				<div className={"car-base-title"}>
					{car_data?.brand}&nbsp;
					<span className={"text-red-color"}>{car_data?.model}</span>
				</div>
				{car_data.price ? (
					<div className={"car-base-price"}>
						<div className={"mb-px-5"}>Цена</div>
						<div className={"car-base-price-value"}>
							{car_data?.price?.toLocaleString()}&nbsp;₽
						</div>
					</div>
				) : (
					<></>
				)}
				{car_data?.min_pay ? (
					<div className={"car-base-payment"}>
						Минимальный платеж от{" "}
						<span className={"car-base-payment-value"}>
							{car_data?.min_pay?.toLocaleString()}&nbsp;₽
						</span>
					</div>
				) : (
					<></>
				)}
				<div className={"mb-px-30"}>
					<CarSameLink
						car={car.main}
						className={"d-inline car-base-same_link "}
						text={"Показать похожие модели"}
					/>
				</div>
			</div>
			<div
				className={"d-none d-lg-block mb-px-40 car-base-payment-preorder-btn "}>
				<CarPreorderButton car={car.main} w100={false} />
			</div>
			<div className={"d-none d-lg-block my-3"}>
				<CarStatBlock
					type={"descktop"}
					column1Width={"auto"}
					data={[car_data?.info]}
				/>
			</div>
			<div className="d-block d-lg-none">
				<CarStatBlock
					type={"descktop"}
					column1Width={"auto"}
					data={[car_data?.info]}
				/>
			</div>

			{car_data.price ? (
				<div className={" car-base-calculator "}>
					<h1 className="car-stat-block-header d-block d-lg-none">
						Калькулятор
					</h1>
					<div className="d-none d-lg-block">
						<IndexCalculator
							fontBold={true}
							hidePrice={true}
							price={car_data?.price}
							minTime={car_data?.srok_from}
							koef={car_data?.koef}
							maxTime={car_data?.srok_to}
							maxPrepaid={car_data?.price}
							minPrepaid={car_data?.min_pay}
							prepaid={car_data?.min_pay}
							noAnim={true}
							className=" car-base-calculator_slider"
						/>
					</div>
					<Container fluid={"xxl"} className="d-block d-lg-none">
						<IndexCalculator
							fontBold={true}
							hidePrice={true}
							price={car_data?.price}
							noAnim={true}
							className="car-base-calculator_slider"
						/>
					</Container>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default CarBase;
