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
import PersonalAccountSocials from "./PersonalAccountSocials/PersonalAccountSocials";

const PersonalAccountPage = () => {
	return (
		<PersonalAccountLayout>
			<Container fluid={"xxl"}>
				<Row>
					<Col className={"d-none d-lg-block"} lg={2}>
						<PersonalAccountMenu />
					</Col>
					<Col lg={10}>
						<div className="personal-account_page">
							<div className="d-flex align-items-end justify-content-between">
								<PersonalAccountData />
								<PersonalAccountCards />
							</div>
							<div className="personal-account_page_body">
								<PersonalAccountForm />
								<PersonalAccountSocials />
							</div>
							<SmallFooter className="d-none d-lg-block" />
							<div className="d-block d-lg-none personal-account_footer">
								ООО ВОСХОДⓒ 2023 год
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</PersonalAccountLayout>
	);
};

export default PersonalAccountPage;
