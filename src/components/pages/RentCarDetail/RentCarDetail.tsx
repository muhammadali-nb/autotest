import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PrevPage from "../../common/PrevPage";
import { CatalogCarDetailLayout } from "../../layout/CatalogCarDetailLayout";
import { SmallFooter } from "../../layout/Footer";
import CarDetailCarousel from "../../common/CarDeailCarousel/CarDetailCarousel";
import RentCarDetailInfo from "./RentCarDetailInfo/RentCarDetailInfo";

import carImage from "../../../images/index/avto.png";

const carData = {
	images: [
		{
			image: carImage,
			id: 1,
		},
		{
			image: carImage,
			id: 2,
		},
		{
			image: carImage,
			id: 3,
		},
	],
	car_info: {
		brand: "Porsche",
		model: "911",
		available: true,
		tags: ["Комфорт", "Комфорт +"],
		regnum: "К638ЕТ 53",
		deposit: 5900,
		price_per_day: 3200,
		tarif: [
			{ dedline: "до 3 дней", price: 200, id: 1 },
			{ dedline: "до 5 дней", price: 200, id: 2 },
			{ dedline: "до 7 дней", price: 200, id: 3 },
		],
		info: [
			{
				name: "Год",
				value: "2023",
				id: 1,
			},
			{
				name: "КПП",
				value: "АКПП",
				id: 2,
			},
			{
				name: "Пробег",
				value: "74600 км",
				id: 3,
			},
		],
	},
};

const RentCarDetail = () => {
	const [size, setSize] = useState<"desk" | "mobile">("desk");

	useEffect(() => {
		const checkSize = () => {
			if (window.innerWidth > 990) {
				setSize("desk");
			} else {
				setSize("mobile");
			}
		};
		window.addEventListener("resize", checkSize);

		checkSize();

		return () => {
			window.removeEventListener("resize", checkSize);
		};
	}, []);

	return (
		<>
			<CatalogCarDetailLayout headerSelectedLink={"/rent/1"}>
				{size === "desk" ? (
					<Container fluid={"xxl"}>
						<Row className="rent-car_detail ">
							<Col
								xs={12}
								sm={6}
								className="rent-car_detail-left d-flex flex-column ">
								<PrevPage
									link={"/catalog"}
									className="mb-px-35 d-none d-xl-flex"
								/>
								<CarDetailCarousel />
								{/* <CatalogCarDetailBase /> */}
								<SmallFooter className="mt-auto rent-car_detail_footer" />
							</Col>
							<Col xs={12} sm={6} className="rent-car_detail-right ps-px-60">
								<RentCarDetailInfo car_info={carData.car_info} />
							</Col>
						</Row>
					</Container>
				) : (
					<div className="rent-car_detail">
						<CarDetailCarousel />
						<Container fluid={"xxl"}>
							<RentCarDetailInfo car_info={carData.car_info} />
						</Container>
					</div>
				)}
			</CatalogCarDetailLayout>
		</>
	);
};

export default RentCarDetail;
