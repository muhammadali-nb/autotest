import React, { useEffect } from "react";
import CarCard from "../../common/CarCard";
import carImage from "../../../img/index/car.webp";
import { Col, Container, Row } from "react-bootstrap";
import arrowImage from "../../../img/index/gray-arrow.svg";
import Animator from "../../../Animator";

const IndexGreatDeals = () => {
	useEffect(() => {
		Animator.animateOnShow(
			"great-deal_cars",
			[
				{ id: "great-deal_car1", delay: 100 },
				{ id: "great-deal_car2", delay: 600 },
				{ id: "great-deal_car3", delay: 1200 },
				{ id: "great-deal_car4", delay: 1800 },
			],
			false
		);
	}, []);

	return (
		<div className="great-deal">
			<Container fluid={"xxl"}>
				<div className={"great-deal_header"}>
					<h1>выгодные предложения</h1>
					<div className="great-deal_more">
						<p>Другие автомобили</p>
						<img src={arrowImage} alt="push" />
					</div>
				</div>
				<div className="great-deal_cars-container">
					<Row className="great-deal_cars">
						<Col xs={3}>
							<CarCard
								id={"great-deal_car1"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: ["Лизинг до 7 лет"],
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								id={"great-deal_car2"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: ["Лизинг до 7 лет"],
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								id={"great-deal_car3"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: ["Лизинг до 7 лет"],
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								id={"great-deal_car4"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: ["Лизинг до 7 лет"],
								}}
							/>
						</Col>
					</Row>
				</div>
			</Container>
		</div>
	);
};

export default IndexGreatDeals;
