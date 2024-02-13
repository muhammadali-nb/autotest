import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PrevPage from "../../common/PrevPage";
import { CatalogCarDetailLayout } from "../../layout/CatalogCarDetailLayout";
import { SmallFooter } from "../../layout/Footer";
import CarDetailCarousel from "../../common/CarDeailCarousel/CarDetailCarousel";
import RentCarDetailInfo from "./RentCarDetailInfo/RentCarDetailInfo";

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
								<RentCarDetailInfo />
							</Col>
						</Row>
					</Container>
				) : (
					<div className="rent-car_detail">
						<CarDetailCarousel />
						<Container fluid={"xxl"}>
							<RentCarDetailInfo />
						</Container>
					</div>
				)}
			</CatalogCarDetailLayout>
		</>
	);
};

export default RentCarDetail;
