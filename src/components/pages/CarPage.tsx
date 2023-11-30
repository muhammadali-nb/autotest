import React, { useEffect, useState } from "react";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import { Col, Container, Row } from "react-bootstrap";
import { useLoaderData, useParams } from "react-router-dom";
import Api from "../../Api";

import CarBase from "./Car/CarBase";
import CarImages from "./Car/CarImages";
import CarInfo from "./Car/CarInfo";
import LoadError from "../common/LoadError";

import { CarDetailLayout } from "../layout/CarDetailLayout";
import { useQuery } from "@tanstack/react-query";
import catalogService from "../../api-functions/catalog-page/catalog-service";
import Loader from "../common/Loader";

const CarPage = () => {
	const car = useLoaderData() as any;
	const { id } = useParams();
	const { data, isLoading, error } = useQuery({
		queryKey: [`catalog-car-${id}`, id],
		queryFn: () => catalogService.getOneCar(id),
	});
	const title =
		data?.item?.brand +
		" " +
		data?.item?.model +
		" - " +
		process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: car.brand + " " + car.model + " в лизинг или аренду",
		keywords: `аренда, лизинг,${car.brand},${car.model},${car.brand} ${car.model}`,
	};
	if (isLoading) return <Loader />;
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
							<CarImages car={data.item} />
							<CarInfo car_data={data.item} type={"descktop"} car={car} />
						</Col>
						<Col lg={6}>
							<div className={"sticky-no-scrollbar top100 "}>
								<div className={"d-block d-lg-none"}>
									<CarImages car={data.item} />
								</div>
								<CarBase car_data={data.item} car={car} />
							</div>
						</Col>
					</Row>
				)}
			</Container>
			<div className={" d-block d-lg-none "}>
				<Container fluid={"xxl"}>
					<CarImages car={data.item} />
				</Container>
				<CarBase car_data={data.item} car={car} />
				<CarInfo car_data={data.item} type={"mobile"} car={car} />
			</div>
		</CarDetailLayout>
	);
};

const carDataLoader = async ({ request, params }) => {
	return Api.car(params.id); // d.json();
};
export { carDataLoader };
export default CarPage;
