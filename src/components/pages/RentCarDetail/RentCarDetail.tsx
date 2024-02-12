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
						<Row className="rent-car_detail ">
							<Col xs={12} xl={6} className="rent-car_detail-left ">
								<PrevPage
									link={"/catalog"}
									className="mb-px-35 d-none d-lg-flex"
								/>
								<CarDetailCarousel />
								{/* <CatalogCarDetailBase /> */}
								<SmallFooter className="mt-auto rent-car_detail_footer" />
							</Col>
							<Col lg={12} xl={6} className="rent-car_detail-right">
								<RentCarDetailInfo />
							</Col>
						</Row>
					</Container>
				) : (
					<></>
				)}
			</CatalogCarDetailLayout>
		</>
	);
};

export default RentCarDetail;
