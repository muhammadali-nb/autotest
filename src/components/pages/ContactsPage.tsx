import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import ContactsForm from "../common/ContactsForm";
// import {faClock, faLocationDot, faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import vkW from "./../../images/common/footer/social-icons-dark/vk.svg";
import wappW from "./../../images/common/footer/social-icons-dark/whatsapp.svg";
import teleW from "./../../images/common/footer/social-icons-dark/telegram.svg";

import {
	FooterBottom,
	FooterContacts,
	FooterContactsBlock,
	FooterLink,
} from "../layout/Footer";
import geoImage from "../../images/common/footer/contct-page-icons/Geolocation.svg";
import clockImage from "../../images/common/footer/contct-page-icons/Clock 2.svg";
import phoneImage from "../../images/common/footer/contct-page-icons/Phone 2.svg";
import Utils from "../../utils/Utils";

const ContactBlock: React.FC<{
	icon: ReactNode;
	header: string | ReactNode;
	children: any;
}> = (props) => (
	<div className={"position-relative ps-px-45 mb-px-50"}>
		<div className={"position-absolute start-0"} style={{ top: "5px" }}>
			{props.icon}
		</div>
		<div
			className={"font-size-24 text-uppercase font-weight-semibold mb-px-15"}>
			{props.header}
		</div>
		<div className={"font-size-16 font-weight-regular"}>{props.children}</div>
	</div>
);

const ContactSocial: React.FC<{ icon: string; hover: string; link: string }> = (
	props
) => (
	<Link to={props.link} className={"contacts-social"}>
		<img src={props.icon} className={"default-image"} alt="" />
		<img src={props.hover} className={"hover-image"} alt="" />
	</Link>
);

const ContactsPage = () => {
	const title = "Контакты - " + process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: "Наши контакты",
		keywords:
			"контакты,телефон,email,vk,vkontakte,telegram,phone,мейл,имейл,почта",
	};
	const lines = process.env.REACT_APP_ADDRESS?.split("\n") ?? [];
	const lines2 = process.env.REACT_APP_WORKTIME?.split("\n") ?? [];

	return (
		<BaseLayout
			meta={meta}
			title={title}
			footerNoContacts={true}
			footerNoForm={true}
			headerSelectedLink={"/contacts"}>
			{/*<FooterContacts/>*/}
			<div className="footer-contacts-page ">
				<Container fluid={"xxl"}>
					<Row className={"gx-3"}>
						<Col sm={12} md={6}>
							<div className=" footer-contacts-page_top">
								<div>Контакты</div>
							</div>
							<div className="footer-contacts-page_blocks">
								<FooterContactsBlock
									image={geoImage}
									text={"Адрес"}
									theme="light">
									{lines.map((i, index) => (
										<div key={index} className={"mb-px-10 line-height-120"}>
											{i}
										</div>
									))}
									{/* Санкт-Петербург <br />
									Торфяная дорога 7Ф <br />
									БЦ «Гулливер» 2 оф. 104 <br /> */}
								</FooterContactsBlock>
								<FooterContactsBlock
									theme="light"
									image={clockImage}
									text={"Время работы"}>
									{lines2.map((i, index) => (
										<div key={index} className={"mb-px-10 line-height-120"}>
											{i}
										</div>
									))}
									{/* пн-вс: с 10.00 - 19.00 */}
								</FooterContactsBlock>
								<FooterContactsBlock
									theme="light"
									image={phoneImage}
									text={"Телефон"}>
									{/* <a
										href={
											"tel:" +
											Utils.cleanPhone(process.env.REACT_APP_PHONE ?? "")
										}>
										{process.env.REACT_APP_PHONE}
									</a> */}
									+7 (812) 317-68-15
								</FooterContactsBlock>
							</div>
							<div className="footer-contacts-page_lines d-block d-sm-none">
								<div className="footer-contacts-page_lines_line" />
								<div className="footer-contacts-page_lines_dot" />
								<div className="footer-contacts-page_lines_dot" />
								<div className="footer-contacts-page_lines_dot" />
								<div className="footer-contacts-page_lines_dot" />
								<div className="footer-contacts-page_lines_dot" />
							</div>
							<div className={"footer-contacts-page_links"}>
								<FooterLink
									img={vkW}
									link={process.env.REACT_APP_VK_LINK ?? "/"}
								/>
								<FooterLink
									img={wappW}
									link={process.env.REACT_APP_WAPP_LINK ?? "/"}
								/>
								<FooterLink
									img={teleW}
									link={process.env.REACT_APP_TELEGRAM_LINK ?? "/"}
								/>
							</div>

							<FooterBottom />
						</Col>
						<Col sm={12} md={6} className=" footer-contacts-page_contact-form">
							<ContactsForm />
						</Col>
					</Row>
				</Container>
			</div>
		</BaseLayout>
	);
};

export default ContactsPage;
