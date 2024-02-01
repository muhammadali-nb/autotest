import React, { FC, ReactNode } from "react";
import PersonalAccountLayout from "./PersonalAccountLayout";
import PersonalAccountMenuMobile from "../../pages/PersonalAccount/PersonalAccountMenuMobile";
import { useOutside } from "../../../hooks/useOutside";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";
import Footer from "../Footer";
import { Col, Container, Row } from "react-bootstrap";
import PersonalAccountMenu from "../../pages/PersonalAccount/PersonalAccountMenu";
import Header from "../Header";
import { CatalogLayoutProps } from "../RentLayout";
import MobileMenu from "../MobileMenu";

const PersonalAccountRentLayout: FC<{ children: ReactNode }> = (props) => {
	const { ref, isShow, setIsShow } = useOutside(false);
	return (
		<>
			<PersonalAccountLayout mainMobileMenu={setIsShow}>
				<Header
					burgerMenuIsShow={isShow}
					setBurgerMenuIsShow={setIsShow}
					type={"white"}
					selectedLink={"/"}
					mobileModalType="orderCall"
				/>
				<Container fluid={"xxl"}>
					<Row>
						<Col className={"d-none d-lg-block"} lg={2}>
							<PersonalAccountMenu selected="/personal-account/rent-history" />
						</Col>
						<Col lg={10}>
							<div className="personal-account_page">
								{props.children}
								<Footer
									small={true}
									className="justify-content-center mt-px-20"
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</PersonalAccountLayout>
			<MobileMenu menuRef={ref} setMenuIsOpen={setIsShow} menuIsOpen={isShow} />
		</>
	);
};

export default PersonalAccountRentLayout;
