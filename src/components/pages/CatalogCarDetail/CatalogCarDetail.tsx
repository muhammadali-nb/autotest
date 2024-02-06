import React from "react";

import BaseLayout, { MetaTags } from "../../layout/BaseLayout";
import { Col, Container, Row } from "react-bootstrap";
import CatalogCarDetailInfo from "./CatalogCarDetailInfo/CatalogCarDetailInfo";
import CatalogCarDetailCarousel from "./CatalogCarDetailCarousel/CatalogCarDetailCarousel";
import CatalogCarDetailBase from "./CatalogCarDetailBase/CatalogCarDetailBase";
import { CarDetailLayout } from "../../layout/CarDetailLayout";
import PrevPage from "../../common/PrevPage";

const CatalogCarDetail = () => {
	return (
		<>
			<CarDetailLayout headerSelectedLink={"/catalog"}>
				<Container fluid={"xxl"}>
					<Row className="car_detail pt-px-20 pb-px-40">
						<Col xl={6}>
							<PrevPage link={"/catalog"} className="mb-px-35" />
							<CatalogCarDetailCarousel />
							<CatalogCarDetailBase />
						</Col>
						<Col xl={6} className="ps-px-60">
							<CatalogCarDetailInfo />
						</Col>
					</Row>
				</Container>
			</CarDetailLayout>
		</>
	);
};

export default CatalogCarDetail;
