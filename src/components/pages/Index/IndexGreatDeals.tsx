import React, { useEffect } from "react";
import CarCard from "../../common/CarCard";
import carImage from "../../../images/index/car.webp";
import { Col, Container, Row } from "react-bootstrap";
import arrowImageBlack from "../../../images/index/gray-arrow.svg";
import arrowImageGray from "../../../images/index/arrow-gray.svg";
import Animator from "../../../Animator";
import { Link, useNavigate } from "react-router-dom";

const IndexGreatDeals = () => {
	const navigate = useNavigate();
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
					<div className="great-deal_more" onClick={() => navigate("/catalog")}>
						<p>Другие автомобили</p>

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
									tags: [
										{ id: 17, name: "Лизинг до 7 лет" },
										{ id: 18, name: "Аванс 0%" },
										{ id: 19, name: "Гарантия 150 тыс. км" },
									],
									id: 1,
									brand: "Porsche",
									model: "911 GT3",
									price: 120.0,
									min_pay: 112.0,
									image: carImage,
									model_id: "Sonata",
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								responsive={false}
								id={"great-deal_car2"}
								car={{
									id: 1,
									tags: [
										{ id: 17, name: "Лизинг до 7 лет" },
										{ id: 18, name: "Аванс 0%" },
										{ id: 19, name: "Гарантия 150 тыс. км" },
									],
									model_id: "Sonata",

									brand: "Porsche",
									model: "911 GT3",
									price: 120.0,
									min_pay: 112.0,
									image: carImage,
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								responsive={false}
								id={"great-deal_car3"}
								car={{
									id: 1,
									tags: [
										{ id: 17, name: "Лизинг до 7 лет" },
										{ id: 18, name: "Аванс 0%" },
										{ id: 19, name: "Гарантия 150 тыс. км" },
									],
									model_id: "Sonata",

									brand: "Porsche",
									model: "911 GT3",
									price: 120.0,
									min_pay: 112.0,
									image: carImage,
								}}
							/>
						</Col>
						<Col xs={3}>
							<CarCard
								responsive={false}
								id={"great-deal_car4"}
								car={{
									tags: [
										{ id: 17, name: "Лизинг до 7 лет" },
										{ id: 18, name: "Аванс 0%" },
										{ id: 19, name: "Гарантия 150 тыс. км" },
									],
									id: 1,
									model_id: "Sonata",
									brand: "Porsche",
									model: "911 GT3",
									price: 120.0,
									min_pay: 112.0,
									image: carImage,
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
