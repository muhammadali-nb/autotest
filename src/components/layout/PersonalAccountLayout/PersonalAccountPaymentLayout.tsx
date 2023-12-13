import React, { FC, ReactNode, useState } from "react";
import PersonalAccountLayout from "./PersonalAccountLayout";
import PersonalAccountMenuMobile from "../../pages/PersonalAccount/PersonalAccountMenuMobile";
import { useOutside } from "../../../hooks/useOutside";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";
import Footer from "../Footer";
import { Col, Container, Row } from "react-bootstrap";
import PersonalAccountMenu from "../../pages/PersonalAccount/PersonalAccountMenu";
import PaymentAddCardsButtonsMobile from "../../pages/Payments/PaymentAddCardsButtonsMobile";
import PaymentLayout from "./PaymentLayout";
import { MobileModal } from "../../common/MobileModal/MobileModal";

const PersonalAccountPaymentLayout: FC<{ children: ReactNode }> = ({
	children,
}) => {
	// for menu personal account
	const { ref, isShow, setIsShow } = useOutside(false);
	const [addBankCard, setAddBankCard] = useState(false);
	const [addScoreCard, setAddScoreCard] = useState(false);

	return (
		<>
			<PaymentLayout>
				<Container fluid={"xxl"}>
					<Row className="min-100">
						<Col className={"d-none d-lg-block"} lg={2}>
							<PersonalAccountMenu selected="/personal-account/payment" />
						</Col>
						<Col lg={10}>
							<div className="personal-account_page payment">
								{children}
								<PersonalAccountMenuBurger onClick={() => setIsShow(!isShow)} />
								<Footer
									small={true}
									className="justify-content-center mt-px-20 pb-6 pb-md-0"
								/>
								<PaymentAddCardsButtonsMobile
									setAddScoreCard={setAddScoreCard}
									setAddBankCard={setAddBankCard}
									className="d-grid d-md-none"
								/>
							</div>
						</Col>
					</Row>
				</Container>
			</PaymentLayout>
			<PersonalAccountMenuMobile
				menuIsOpen={isShow}
				setMenuIsOpen={setIsShow}
				menuRef={ref}
			/>
			<MobileModal
				type="paymentAddBankCard"
				setActive={setAddBankCard}
				active={addBankCard}
			/>
			<MobileModal
				type="paymentAddScoreCard"
				setActive={setAddScoreCard}
				active={addScoreCard}
			/>
		</>
	);
};

export default PersonalAccountPaymentLayout;
