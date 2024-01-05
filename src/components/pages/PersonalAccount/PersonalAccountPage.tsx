import React, { useEffect } from "react";
import PersonalAccountLayout from "../../layout/PersonalAccountLayout/PersonalAccountLayout";
import { Col, Container, Row } from "react-bootstrap";
import { SmallFooter } from "../../layout/Footer";
import PersonalAccountMenu from "./PersonalAccountMenu";
import PersonalAccountData from "./PersonalAccountData";
import PersonalAccountForm from "./PersonalAccountForm/PersonalAccountForm";
import PersonalAccountSocials from "./PersonalAccountSocials/PersonalAccountSocials";
import { useOutside } from "../../../hooks/useOutside";
import PersonalAccountMenuMobile from "./PersonalAccountMenuMobile";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";
import PersonalAccountBalance from "./PersonalAccountBalance/PersonalAccountBalance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { is } from "date-fns/locale";

export interface userManagerProps {
	first_name: string;
	middle_name: string;
	last_name: string;
	phone: string;
	email: string;
	social: { type: string; url: string }[];
}

export interface userDataProps {
	name: string;
	last_name: string;
	middle_name: string;
	phone: string;
	email: string;
	birth_date: string;
	manager: userManagerProps;
	tg_connected: boolean;
}

export const userData: userDataProps = {
	name: "Анастасия",
	last_name: "Фокина",
	middle_name: "Алексеевна",
	phone: "+7 (999) 999 99 99",
	email: "",
	birth_date: "2014-01-01",
	manager: {
		first_name: "Мария",
		middle_name: "Ивановна",
		last_name: "Иванова",
		phone: "8 (900) 999 90 90",
		email: "maria.ii@mail.ru",
		social: [
			{
				type: "vk",
				url: "#",
			},
			{
				type: "wp",
				url: "#",
			},
			{
				type: "tg",
				url: "#",
			},
		],
	},
	tg_connected: false,
};

const PersonalAccountPage: React.FC = () => {
	// for menu personal account
	const { ref, isShow, setIsShow } = useOutside(false);
	const navigate = useNavigate();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/');
		}
	}, []);

	return (
		<PersonalAccountLayout>
			<Container fluid={"xxl"}>
				<Row>
					<Col className={"d-none d-lg-block"} lg={2}>
						<PersonalAccountMenu selected="/personal-account" />
					</Col>
					<Col lg={10}>
						<div className="personal-account_page">
							<div className="personal-account_head d-flex align-items-end justify-content-between">
								<PersonalAccountData data={userData} />
								<PersonalAccountBalance />
								{/* <PersonalAccountCards /> */}
							</div>
							<div className="personal-account_page_body">
								<PersonalAccountForm data={userData} />
								<PersonalAccountSocials
									data={userData.manager}
									tg_connected={userData.tg_connected}
								/>
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
