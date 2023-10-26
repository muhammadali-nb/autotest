import React from "react";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import { Col, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import Api from "../../Api";
import { CarData } from "../common/CarCard";
import CarBase from "./Car/CarBase";
import CarImages from "./Car/CarImages";
import CarInfo from "./Car/CarInfo";
import LoadError from "../common/LoadError";
import { useAppSelector } from "../../store/hooks";
import { CarDetailLayout } from "../layout/CarDetailLayout";
import { CatDataType } from "../../types/rent-types";

const CarPage = () => {
	const car = useLoaderData() as any;
	// // console.log(car);
	// const data = useAppSelector((state) => state.baseData);
	// const brand =
	// 	data.left.brands.values?.find((i) => i.id === car.main.brand)?.name ?? "";
	// const model =
	// 	data.left.models.values?.find((i) => i.id === car.main.model)?.name ?? "";

	const title =
		car.brand + " " + car.model + " - " + process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: car.brand + " " + car.model + " в лизинг или аренду",
		keywords: `аренда, лизинг,${car.brand},${car.model},${car.brand} ${car.model}`,
	};
	return (
		<CarDetailLayout
			meta={meta}
			title={title}
			headerSelectedLink={"/catalog"}
			footerSmall>
			<Container
				fluid={"xxl"}
				className={"d-none d-lg-block car-page pt-px-20"}>
				<LoadError response={car} />
				{!Api.isError(car) && (
					<Row className={"gx-5"}>
						<Col lg={6} className={"d-none d-lg-block"}>
							<CarImages car={car} />
							<CarInfo type={"descktop"} car={car} />
						</Col>
						<Col lg={6}>
							<div className={"sticky-no-scrollbar top100 "}>
								<div className={"d-block d-lg-none"}>
									<CarImages car={car} />
								</div>
								<CarBase car={car} />
							</div>
						</Col>
					</Row>
				)}
			</Container>
			<div className={" d-block d-lg-none "}>
				<Container fluid={"xxl"}>
					<CarImages car={car} />
				</Container>
				<CarBase car={car} />
				<CarInfo type={"mobile"} car={car} />
			</div>
		</CarDetailLayout>
	);
};

const carDataLoader = async ({ request, params }) => {
	return Api.car(params.id); // d.json();
};
export { carDataLoader };
export default CarPage;
