import React, { ReactNode, useEffect, useState } from "react";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import { Col, Container, Row } from "react-bootstrap";
import FiltersBlock from "./Catalog/FiltersBlock";
import CarGrid from "./Catalog/CarGrid";
import dangerBtn from "./../../img/common/danger.png";
import FilterButtons from "./Catalog/FilterButtons";
import bg from "./../../img/index/about_bg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Api from "../../Api";
import CatalogMobileMenu from "./Catalog/CatalogMobileMenu";

export const AlertMessage: React.FC<{
	page: string;
	type: string;
	className?: string;
}> = (props) => {
	const [show, setShow] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const process = (text: string) => {
		let txt = text
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
		txt = txt.replace(/>/g, "&gt;");
		txt = txt.replace(/\[([^|]+)\|(.+)\]/g, '<a href="$1">$2</a>');
		txt = txt.replace(/\n\r?/, "<br/>");
		// console.log(txt);
		return txt;
	};
	useEffect(() => {
		Api.motd(props.page).then((data) => {
			if (Api.isError(data) || data.text.trim().length === 0) {
				setShow(false);
				setMessage("");
				return;
			}
			setMessage(data.text);
			setShow(true);
		});
	}, []);

	return (
		<div
			className={
				"_alert " +
				props.type +
				(show ? " " : " hidden ") +
				(props.className ?? "")
			}>
			<img src={dangerBtn} alt={""} className={"_alert__image"} />
			<div
				className={"_alert__content"}
				dangerouslySetInnerHTML={{
					__html: process(message),
				}}></div>
			<button className={"_alert__close"} onClick={() => setShow(false)}>
				<FontAwesomeIcon icon={faCircleXmark} size={"lg"} />
			</button>
		</div>
	);
};

export const BottomMessage: React.FC<{
	text1: string | ReactNode;
	text2: string | ReactNode;
	button: ReactNode;
}> = (props) => {
	return (
		<div
			className={
				"bottom-message"
			}
			style={{
				backgroundImage: `url('${bg}')`,
				backgroundPosition: "center",
				borderRadius: "2px",
			}}>
			<div>
				<div
					className={
						"bottom-message_description"
					}>
					{props.text1}
				</div>
				<div
					className={
						"bottom-message_header "
					}>
					{props.text2}
				</div>
			</div>
			<div
				className={"bottom-message_btn"}>
				{props.button}
			</div>
		</div>
	);
};

const CatalogPage = () => {
	const [isOpen, setOpen] = useState(false);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const title = "Каталог - " + process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: "Каталог автомобилей",
		keywords: "каталог,лизинг,авто,список,leasing",
	};
	return (
		<BaseLayout
			meta={meta}
			title={title}
			headerSelectedLink={"/catalog"}
			footerSmall>
			<Container fluid={"xxl"} className={"my-px-40"}>
				<CatalogMobileMenu isActive={isOpen} setIsActive={setOpen} />
				<div>
					<Row>
						<Col lg={4} xxl={3}>
							<div
								className={"sticky-no-scrollbar"}
								style={{ maxWidth: "315px" }}>
								<FiltersBlock />
							</div>
						</Col>
						<Col lg={8} xxl={9}>
							{/*<AlertMessage page={'catalog'} type={'danger'} className={'mb-px-60'} />*/}
							<FilterButtons isShowMobileFiler={setOpen} />
							<CarGrid />
						</Col>
					</Row>
				</div>
				<div></div>
				{/*<div className={'d-flex'} style={{gap:'40px'}}>*/}
				{/*    <div className={'sticky-no-scrollbar'} style={{maxWidth:'315px'}}>*/}
				{/*        <FiltersBlock />*/}
				{/*    </div>*/}
				{/*    <div className={'flex-grow w-100'}>*/}
				{/*        <AlertMessage page={'catalog'} type={'danger'} className={'mb-px-60'} />*/}
				{/*        <FilterButtons />*/}
				{/*        <CarGrid />*/}
				{/*    </div>*/}
				{/*</div>*/}
				{/*{process.env.REACT_APP_NO_CATALOG !== 'true'*/}
				{/*    ? <div className={'d-flex'} style={{gap:'40px'}}>*/}
				{/*        <div className={'sticky-no-scrollbar'} style={{maxWidth:'315px'}}>*/}
				{/*            <FiltersBlock />*/}
				{/*        </div>*/}
				{/*        <div className={'flex-grow w-100'}>*/}
				{/*            <AlertMessage page={'catalog'} type={'danger'} className={'mb-px-60'} />*/}
				{/*            <FilterButtons />*/}
				{/*            <CarGrid />*/}
				{/*        </div>*/}
				{/*    </div>*/}
				{/*    : <AlertMessage page={'catalog'} type={'danger'} className={'mb-px-60'} />*/}
				{/*}*/}
			</Container>
		</BaseLayout>
	);
};

export default CatalogPage;
