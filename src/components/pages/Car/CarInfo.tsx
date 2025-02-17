import React, { useState } from "react";
import { CarData } from "../../common/CarCard";
import CarStatBlock, { CarStatBlockItemMob } from "./CarStatBlock";
import { ICarData } from "../../../types/CatalogTypes";

const CarInfo: React.FC<{
	car_data: ICarData;
	car: CarData;
	type: "mobile" | "descktop";
}> = (props) => {
	const [page, setPage] = useState("tech");
	return (
		<div className={"car-info "}>
			<div className={"car-info-btns car-info_detail"}>
				<button
					className={"car-info-btn " + (page === "tech" ? "active" : "")}
					onClick={() => {
						setPage("tech");
					}}>
					Тех. характеристики
				</button>
				<button
					className={"car-info-btn " + (page === "standard" ? "active" : "")}
					onClick={() => {
						setPage("standard");
					}}>
					Комплектация
				</button>
			</div>
			<div className={"my-3"}>
				{page === "tech" && (
					<CarStatBlock
						type={props.type}
						column1Width={"2.5fr"}
						dotted={true}
						data={props.car_data?.technical_parameters}
					/>
					// <CarStatBlockItemMob  data={props.car.tech} />
				)}
				{page === "standard" && (
					
					<CarStatBlock
						type={props.type}
						column1Width={"4fr"}
						data={props.car_data?.equipment}
					/>
				)}
			</div>
		</div>
	);
};

export default CarInfo;
