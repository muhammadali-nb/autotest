import React, { useEffect } from "react";
import CarCard from "../../common/CarCard";
import carImage from "../../../img/index/car.webp";
import { Col, Container, Row } from "react-bootstrap";
import arrowImageBlack from "../../../img/index/gray-arrow.svg";
import arrowImageGray from "../../../img/index/arrow-gray.svg";
import Animator from "../../../Animator";
import { Link } from "react-router-dom";

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
						<Link to="/catalog">
							<img
								src={arrowImageBlack}
								className="great-deal_more-black"
								alt="push"
							/>
							<img
								src={arrowImageGray}
								className="great-deal_more-gray"
								alt="push"
							/>
						</Link>

						{/* <div style={{ width: "200px" }}>
							<svg
								width="100%"
								height="12"
								viewBox="0 0 134 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									id="Vector"
									d="M134 4.5L126.5 0.169873V8.83013L134 4.5ZM127.25 3.75H0V5.25H127.25V3.75Z"
									fill="#606569"
								/>
							</svg>
						</div> */}
					</div>
				</div>
				<div className="great-deal_cars-container">
					<Row className="great-deal_cars gx-2">
						<Col xs={3}>
							<CarCard
								responsive={false}
								id={"great-deal_car1"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: [1, 2, 3],
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								responsive={false}
								id={"great-deal_car2"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: [1, 2, 3],
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								responsive={false}
								id={"great-deal_car3"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: [1, 2, 3],
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								responsive={false}
								id={"great-deal_car4"}
								car={{
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									year: 2023,
									price: 120.0,
									pay: 112.0,
									thumb: carImage,
									special: [1, 2, 3],
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
