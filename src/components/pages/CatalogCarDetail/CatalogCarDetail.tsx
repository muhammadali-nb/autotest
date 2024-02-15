import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CatalogCarDetailInfo from "./CatalogCarDetailInfo/CatalogCarDetailInfo";
import CatalogCarDetailBase from "./CatalogCarDetailBase/CatalogCarDetailBase";
import PrevPage from "../../common/PrevPage";
import { CatalogCarDetailLayout } from "../../layout/CatalogCarDetailLayout";
import { SmallFooter } from "../../layout/Footer";
import CarDetailCarousel from "../../common/CarDeailCarousel/CarDetailCarousel";
import carImage from "../../../images/index/avto.png";

const cartalogCarData = {
	id: 1,
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
	info: {
		brand: "Lexus",
		model: "570",
		min_pay: 2390000,
		price: 4900,
		liked: true,
		list: [
			{
				name: "Объём",
				value: "2,0 литра",
				id: 1,
			},
			{
				name: "Объём",
				value: "2,0 литра",
				id: 2,
			},
			{
				name: "Объём",
				value: "2,0 литра",
				id: 3,
			},
		],
	},
	calculator: {
		min_pay: 3000,
		date_from: 24,
		date_to: 60,
		kasgo: 1,
		koef: 1.5,
	},
	technical_equpments: [
		{
			id: 2,
			header: "ДВИГАТЕЛЬ",
			list: [
				{ name: "Рабочий объем, куб. см", value: "1995", id: 1 },
				{ name: "Рабочий объем, куб. см", value: "1995", id: 2 },
			],
		},
		{
			id: 1,
			header: "ДВИГАТЕЛЬ",
			list: [
				{ name: "Рабочий объем, куб. см", value: "1995", id: 1 },
				{ name: "Рабочий объем, куб. см", value: "1995", id: 2 },
				{ name: "Рабочий объем, куб. см", value: "1995", id: 3 },
			],
		},
	],
	standart_equpments: [
		{
			id: 2,
			header: "ДВИГАТЕЛЬ",
			list: [
				{ name: "Рабочий объем, куб. см", id: 1 },
				{ name: "Рабочий объем, куб. см", id: 2 },
			],
		},
		{
			id: 1,
			header: "ДВИГАТЕЛЬ",
			list: [
				{ name: "Рабочий объем, куб. см", id: 1 },
				{ name: "Рабочий объем, куб. см", id: 2 },
				{ name: "Рабочий объем, куб. см", id: 3 },
			],
		},
		{
			id: 3,
			header: "ДВИГАТЕЛЬ",
			list: [
				{ name: "Рабочий объем, куб. см", id: 1 },
				{ name: "Рабочий объем, куб. см", id: 2 },
				{ name: "Рабочий объем, куб. см", id: 3 },
			],
		},
	],
};

const CatalogCarDetail = () => {
	const [size, setSize] = useState<"desk" | "mobile">("desk");

	useEffect(() => {
		const checkSize = () => {
			if (window.innerWidth > 1040) {
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
			<CatalogCarDetailLayout headerSelectedLink={"/catalog"}>
				{size === "desk" ? (
					<Container fluid={"xxl"}>
						<Row className="car_detail pt-px-20">
							<Col xs={6} xl={6}>
								<PrevPage
									link={"/catalog"}
									className="mb-px-35 d-none d-lg-flex"
								/>
								<CarDetailCarousel images={cartalogCarData.images} />
								<CatalogCarDetailBase
									technical_equipments={cartalogCarData.technical_equpments}
									standart_equipments={cartalogCarData.standart_equpments}
								/>
								<SmallFooter className="car_detail_footer" />
							</Col>
							<Col xs={6} xl={6} className="ps-px-60">
								<CatalogCarDetailInfo
									calculator={cartalogCarData.calculator}
									info={cartalogCarData.info}
								/>
							</Col>
						</Row>
					</Container>
				) : (
					<div className="car_detail">
						<CarDetailCarousel images={cartalogCarData.images} />
						<CatalogCarDetailInfo
							info={cartalogCarData.info}
							calculator={cartalogCarData.calculator}
						/>
						<CatalogCarDetailBase
							technical_equipments={cartalogCarData.technical_equpments}
							standart_equipments={cartalogCarData.standart_equpments}
						/>
						<SmallFooter className="car_detail_footer" />
					</div>
				)}
			</CatalogCarDetailLayout>
		</>
	);
};

export default CatalogCarDetail;
