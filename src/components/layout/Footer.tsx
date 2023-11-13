import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import bg from "./../../img/common/footer/footer_bg.webp";
import geoImage from "./../../img/common/footer/geolocation.svg";
import clockImage from "./../../img/common/footer/clock.svg";
import phoneImage from "./../../img/common/footer/phone.svg";

import vkB from "./../../img/common/footer/vk-b.png";
import vkW from "./../../img/common/footer/vk-w.png";
import wappB from "./../../img/common/footer/wapp-b.png";
import wappW from "./../../img/common/footer/wapp-w.png";
import teleB from "./../../img/common/footer/tele-b.png";
import teleW from "./../../img/common/footer/tele-w.png";
import ContactsForm from "../common/ContactsForm";
import { Link } from "react-router-dom";
import Utils from "../../utils/Utils";

import vkMb from "../../img/common/footer/social-icons-mb/vk.svg";
import whMb from "../../img/common/footer/social-icons-mb/whatsapp.svg";
import telegramMb from "../../img/common/footer/social-icons-mb/telegram.svg";

const FooterMap: React.FC<{ full: boolean; noContacts: boolean }> = ({
	full,
	noContacts,
}) => {
	return (
		<div className={"footer__map-block " + (full ? "full" : "")}>
			{!noContacts && (
				<div className={"footer__map-form"}>
					<ContactsForm />
				</div>
			)}
			<div className={"footer__map"}>
				<iframe
					className={"map_container"}
					title={"Map"}
					src={process.env.REACT_APP_YMAP_LINK}
					frameBorder="0"></iframe>
			</div>
		</div>
	);
};
export const FooterContactsBlock: React.FC<{
	image: any;
	text: string;
	children: any;
	theme?: "dark" | "light";
}> = (props) => {
	return (
		<div
			className={
				props.theme === "dark"
					? "footer-contacts-block "
					: "footer-contacts-page_block"
			}>
			<img
				src={props.image}
				alt={props.text}
				className={
					props.theme === "dark"
						? "footer-contacts-block-image"
						: "footer-contacts-page_block-image"
				}
			/>
			<div>
				<div
					className={
						props.theme === "dark"
							? "footer-contacts-block-header "
							: "footer-contacts-page_block_header"
					}>
					{props.text}
				</div>
				<div
					className={
						props.theme === "dark"
							? "footer-contacts-block-text "
							: "footer-contacts-page_block_text"
					}>
					{props.children}
				</div>
			</div>
		</div>
	);
};
export const FooterLink: React.FC<{
	img: any;
	hover?: any;
	link: string;
	className?: string;
}> = (props) => {
	return (
		<Link
			to={props.link}
			className={`footer-contacts-link ${!props.hover && "mobile"} ${
				props.className
			} `}>
			<img src={props.img} className={"default-image"} alt="" />
			{props.hover !== undefined && (
				<img src={props.hover} className={"hover-image"} alt="" />
			)}
		</Link>
	);
};

export const FooterBottom = () => {
	return (
		<div className={"footer-contacts-bottom"}>
			<span className={"footer-contacts-bottom-element"}>
				ООО ВОСХОД ⓒ 2023 год
			</span>
			<div className={"line-height-100 footer-contacts-bottom-policy "}>
				<Link
					to={"/offer"}
					className={"footer-contacts-bottom-element me-px-20"}>
					Оферта
				</Link>
				<Link to={"/policy"} className={"footer-contacts-bottom-element"}>
					Политика конфиденциальности
				</Link>
			</div>
		</div>
	);
};
export const FooterContacts = () => {
	const lines = process.env.REACT_APP_ADDRESS?.split("\n") ?? [];
	const lines2 = process.env.REACT_APP_WORKTIME?.split("\n") ?? [];
	return (
		<div className="footer__contacts-container">
			<Container fluid={"xxl"}>
				<Row className={"g-0"}>
					<Col xl={5} md={5} className={"footer__contacts "}>
						<div className="footer-contacts-top">
							<div>Контакты</div>
						</div>
						<div className="footer-contacts-blocks">
							<FooterContactsBlock theme="dark" image={geoImage} text={"Адрес"}>
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
								theme="dark"
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
								theme="dark"
								image={phoneImage}
								text={"Телефон"}>
								<a
									href={
										"tel:" + Utils.cleanPhone(process.env.REACT_APP_PHONE ?? "")
									}>
									{process.env.REACT_APP_PHONE}
								</a>
								{/* +7 (812) 317-68-15 */}
							</FooterContactsBlock>
						</div>
						<div className={"footer-contacts-links d-none d-lg-flex"}>
							<FooterLink
								img={vkW}
								hover={vkB}
								link={process.env.REACT_APP_VK_LINK ?? "/"}
							/>
							<FooterLink
								img={wappW}
								hover={wappB}
								link={process.env.REACT_APP_WAPP_LINK ?? "/"}
							/>
							<FooterLink
								img={teleW}
								hover={teleB}
								link={process.env.REACT_APP_TELEGRAM_LINK ?? "/"}
							/>
						</div>
						<div className={"footer-contacts-links d-flex d-lg-none"}>
							<FooterLink
								img={vkMb}
								// hover={vkB}
								link={process.env.REACT_APP_VK_LINK ?? "/"}
							/>
							<FooterLink
								img={whMb}
								// hover={wappB}
								link={process.env.REACT_APP_WAPP_LINK ?? "/"}
							/>
							<FooterLink
								img={telegramMb}
								// hover={teleB}
								link={process.env.REACT_APP_TELEGRAM_LINK ?? "/"}
							/>
						</div>

						<FooterBottom />
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export const SmallFooter = (props: { className?: string }) => {
	return (
		<div className={`py-px-20 ${props.className}`}>
			{/* <Container fluid={"xxl"}> */}
			<div className={"d-flex justify-content-between"}>
				<div className={"footer-contacts-bottom-logo"}>
					<span>ООО Восход</span>
					<span>© 2023 год</span>
				</div>
				<div className={"  footer-contacts-bottom-policy "}>
					<Link
						to={"/offer"}
						className={
							"footer-contacts-bottom-element text-gray-color me-px-10"
						}>
						Оферта
					</Link>
					<Link
						to={"/policy"}
						className={"footer-contacts-bottom-element text-gray-color"}>
						Политика конфиденциальности
					</Link>
				</div>
			</div>
			{/* </Container> */}
		</div>
	);
};

const Footer: React.FC<{
	noContacts?: boolean;
	noForm?: boolean;
	small?: boolean;
}> = (props) => {
	if (props.small) return <SmallFooter />;
	return (
		<footer className={"footer"}>
			<FooterMap
				full={props.noContacts ?? false}
				noContacts={props.noForm ?? false}
			/>
			{!props.noContacts && <FooterContacts />}
		</footer>
	);
};

export default Footer;
