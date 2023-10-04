import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { CarData, CarRentDataInfo, CarSameLink } from "../../common/CarCard";
import Api, { ErrorResponse } from "../../../Api";
import CatalogLayout from "../../layout/CatalogLayout";
import { CarDetailLayout } from "../../layout/CarDetailLayout";
import CarImages from "../Car/CarImages";
import { CarRequestFormImage } from "../../common/CarRentForm";
import RentCarImagesCarousel from "./RentCarImagesCarousel";
import { Container } from "react-bootstrap";

const RentCarDetail = () => {
	const car = useLoaderData() as CarRentDataInfo;

	// const { carID } = useParams();
	// const [open, setOpen] = useState<boolean>(false);
	// const [car, setCar] = useState<CarData | ErrorResponse | undefined>();
	// const [index, setIndex] = useState(0);

	console.log(car);

	// useEffect(() => {
	// 	const fetchCarData = async () => {
	// 		setCar(undefined);
	// 		let carData = await Api.car(carID);
	// 		setCar(carData);
	// 	};
	// 	fetchCarData();
	// }, []);

	return (
		<CarDetailLayout>
			<RentCarImagesCarousel car={car} />
			<Container fluid={"xxl"}>
				<h1 className="car-detail_header">
					Toyota <span>Camry</span>
				</h1>
				<h4 className="car-detail_id">К638ЕТ 53</h4>
				<div className="car-detail_price">
					<p>Цена</p>
					<div className="car-detail_price-value">
						618 950 ₽ <span>/ день</span>
					</div>
				</div>
				<div className="car-detail_deposit">
					Депозит от <span>6 950 ₽</span>
				</div>
				<CarSameLink car={car} />
				<div className="car-detail_info">
					<h4>Информация</h4>
					<ul>
						<li>
							<div>Год </div>
							<span>2023</span>
						</li>
						<li>
							<div>КПП </div>
							<span>АКПП</span>
						</li>
						<li>
							<div>Пробег</div> <span>74600 км</span>
						</li>
					</ul>
				</div>
			</Container>
			<div className="car-detail_tobook">
				<button className="site-btn big">Забронировать</button>
			</div>
		</CarDetailLayout>
	);
};

export const carRentDataLoader = async ({ request, params }) => {
	return Api.rentCar(params.id); // d.json();
};

export default RentCarDetail;
