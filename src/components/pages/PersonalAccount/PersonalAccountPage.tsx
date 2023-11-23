import React from "react";
import PersonalAccountLayout from "../../layout/PersonalAccountLayout";
import { Col, Container, Row } from "react-bootstrap";
import { SmallFooter } from "../../layout/Footer";
import PersonalAccountMenu from "./PersonalAccountMenu";
import PersonalAccountData from "./PersonalAccountData";
import BankCard from "../../common/PersonalAccount/BankCard/BankCard";
import { PersonalAccountCards } from "./PersonalAccountBankCards/PersonalAccountBankCards";
import ScoreCard from "../../common/ScoreCard/ScoreCard";
import PersonalAccountForm from "./PersonalAccountForm/PersonalAccountForm";
import PersonalAccountSocials from "./PersonalAccountSocials/PersonalAccountSocials";
import { useOutside } from "../../../hooks/useOutside";
import PersonalAccountMenuMobile from "./PersonalAccountMenuMobile";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";

export interface userDataProps {
	name: string,
	last_name: string,
	middle_name: string,
	phone: string,
	email: string,
	birth_date: string
}

const userData: userDataProps = {
	name: 'Анастасия',
	last_name: 'Фокина',
	middle_name: 'Алексеевна',
	phone: '+7 (999) 999 99 99',
	email: '',
	birth_date: '2014-01-01'
}

const PersonalAccountPage: React.FC = () => {
	// for menu personal account
	const { ref, isShow, setIsShow } = useOutside(false);

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
								<PersonalAccountData data={userData} />
								<PersonalAccountCards />
							</div>
							<div className="personal-account_page_body">
								<PersonalAccountForm data={userData} />
								<PersonalAccountSocials />
							</div>
							<SmallFooter className="d-none d-lg-block" />
							<div className="d-block d-lg-none personal-account_footer">
								ООО ВОСХОДⓒ 2023 год
							</div>
							<PersonalAccountMenuBurger onClick={() => setIsShow(!isShow)} />
							<PersonalAccountMenuMobile
								menuIsOpen={isShow}
								setMenuIsOpen={setIsShow}
								menuRef={ref}
							/>
						</div>
					</Col>
				</Row>
			</Container>
		</PersonalAccountLayout>
	);
};

export default PersonalAccountPage;
