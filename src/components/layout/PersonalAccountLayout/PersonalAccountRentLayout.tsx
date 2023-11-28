import React, { FC, ReactNode } from "react";
import PersonalAccountLayout from "./PersonalAccountLayout";
import PersonalAccountMenuMobile from "../../pages/PersonalAccount/PersonalAccountMenuMobile";
import { useOutside } from "../../../hooks/useOutside";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";
import Footer from "../Footer";
import { Col, Container, Row } from "react-bootstrap";
import PersonalAccountMenu from "../../pages/PersonalAccount/PersonalAccountMenu";

const PersonalAccountRentLayout: FC<{ children: ReactNode }> = (props) => {
	// for menu personal account
	const { ref, isShow, setIsShow } = useOutside(false);
	return (
		<>
			<PersonalAccountLayout>
				<Container fluid={"xxl"}>
					<Row>
						<Col className={"d-none d-lg-block"} lg={2}>
							<PersonalAccountMenu selected="/personal-account/rent-history" />
						</Col>
						<Col lg={10}>
							<div className="personal-account_page">
								{props.children}
								<PersonalAccountMenuBurger onClick={() => setIsShow(!isShow)} />
								<Footer
									small={true}
									className="justify-content-center mt-px-20"
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</PersonalAccountLayout>
			<PersonalAccountMenuMobile
				menuIsOpen={isShow}
				setMenuIsOpen={setIsShow}
				menuRef={ref}
			/>
		</>
	);
};

export default PersonalAccountRentLayout;
