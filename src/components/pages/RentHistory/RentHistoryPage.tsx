import React from "react";
import PersonalAccountLayout from "../../layout/PersonalAccountLayout";
import PersonalAccountMenuMobile from "../PersonalAccount/PersonalAccountMenuMobile";
import { useOutside } from "../../../hooks/useOutside";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";

import { Col, Container, Row } from "react-bootstrap";
import PersonalAccountMenu from "../PersonalAccount/PersonalAccountMenu";
import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountCarCard from "../../common/PersonalAccount/PersonalAccountCarCard/PersonalAccountCarCard";

const RentHistoryPage = () => {
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
							<PersonalAccountHeader />
							<div className="mt-px-65">
								<PersonalAccountCarCard />
							</div>
							{/* <div className="d-flex align-items-end justify-content-between">
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
							</div> */}

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

export default RentHistoryPage;
