import { Col, Container, Row } from "react-bootstrap";
import PersonalAccountLayout from "./PersonalAccountLayout";
import PersonalAccountMenu from "../../pages/PersonalAccount/PersonalAccountMenu";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";
import PersonalAccountMenuMobile from "../../pages/PersonalAccount/PersonalAccountMenuMobile";
import Footer from "../Footer";
import { useOutside } from "../../../hooks/useOutside";
import MobileMenu from "../MobileMenu";
import Header from "../Header";

const PersonalAccountTransactionsLayout: React.FC<{
	children: React.ReactNode;
}> = (props) => {
	const { children } = props;

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
							<PersonalAccountMenu selected="/personal-account/transactions" />
						</Col>
						<Col lg={10}>
							<div className="personal-account_page">
								{children}

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

export default PersonalAccountTransactionsLayout;
