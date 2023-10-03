import React from "react";
import PersonalAccountLayout from "../../layout/PersonalAccountLayout";
import { Col, Container, Row } from "react-bootstrap";
import Footer, { SmallFooter } from "../../layout/Footer";
import PersonalAccountMenu from "./PersonalAccountMenu";

const PersonalAccountPage = () => {
	return (
		<PersonalAccountLayout>
			<Container fluid={"xxl"}>
				<Row>
					<Col lg={2}>
						<PersonalAccountMenu />
					</Col>
					<Col lg={10}>
						<SmallFooter />
					</Col>
				</Row>
			</Container>
		</PersonalAccountLayout>
	);
};

export default PersonalAccountPage;
