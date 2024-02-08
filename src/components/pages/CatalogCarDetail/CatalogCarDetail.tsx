import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CatalogCarDetailInfo from "./CatalogCarDetailInfo/CatalogCarDetailInfo";
import CatalogCarDetailCarousel from "./CatalogCarDetailCarousel/CatalogCarDetailCarousel";
import CatalogCarDetailBase from "./CatalogCarDetailBase/CatalogCarDetailBase";
import PrevPage from "../../common/PrevPage";
import { CatalogCarDetailLayout } from "../../layout/CatalogCarDetailLayout";
import { SmallFooter } from "../../layout/Footer";

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
								<CatalogCarDetailCarousel />
								<CatalogCarDetailBase />
								<SmallFooter className="car_detail_footer" />
							</Col>
							<Col xs={6} xl={6} className="ps-px-60">
								<CatalogCarDetailInfo />
							</Col>
						</Row>
					</Container>
				) : (
					<div className="car_detail">
						<CatalogCarDetailCarousel />
						<CatalogCarDetailInfo />
						<CatalogCarDetailBase />
						<SmallFooter className="car_detail_footer" />
					</div>
				)}
			</CatalogCarDetailLayout>
		</>
	);
};

export default CatalogCarDetail;
