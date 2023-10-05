import React from "react";
import PersonalAccountLayout from "../../layout/PersonalAccountLayout";
import { Col, Container, Row } from "react-bootstrap";
import { SmallFooter } from "../../layout/Footer";
import PersonalAccountMenu from "./PersonalAccountMenu";
import PersonalAccountData from "./PersonalAccountData";
import BankCard from "../../common/personal-account/BankCard/BankCard";
import { PersonalAccountCards } from "./PersonalAccountCards/PersonalAccountCards";
import ScoreCard from "../../common/ScoreCard/ScoreCard";
import PersonalAccountForm from "./PersonalAccountForm/PersonalAccountForm";

const PersonalAccountPage = () => {
	return (
		<PersonalAccountLayout>
			<Container fluid={"xxl"}>
				<Row>
					<Col lg={2}>
						<PersonalAccountMenu />
					</Col>
					<Col lg={10}>
						<div className="personal-account_page">
							<div className="d-flex align-items-end justify-content-between">
								<PersonalAccountData />
								<PersonalAccountCards />
							</div>
							<div>
								<PersonalAccountForm />
							</div>
							<SmallFooter />
						</div>
					</Col>
				</Row>
			</Container>
		</PersonalAccountLayout>
	);
};

export default PersonalAccountPage;
