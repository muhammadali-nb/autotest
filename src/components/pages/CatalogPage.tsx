import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { MetaTags } from "../layout/BaseLayout";
import { Col, Container, Row } from "react-bootstrap";
import CarGrid from "./Catalog/CarGrid";
import dangerBtn from "./../../images/common/danger.svg";
import FilterButtons from "./Catalog/FilterButtons";
import bg from "./../../images/index/about_bg.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Api from "../../Api";
import CatalogMobileMenu from "./Catalog/CatalogMobileMenu";
import CatalogLayout from "../layout/CatalogLayout";
import { SmallFooter } from "../layout/Footer";
import { useQuery } from "@tanstack/react-query";
import catalogService from "../../api-functions/catalog-page/catalog-service";
import CatalogFiltersBlock from "./Catalog/CatalogFilterBlock";
import chevron from "../../images/common/footer/chevron-for-bottom.svg";
import { Link } from "react-router-dom";
import MetaDecorator from "../layout/MetaDecorator";

export const AlertMessage: React.FC<{
	page: string;
	type: string;
	className?: string;
	local_message?: ReactElement;
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

			{!props.local_message ? (
				<div
					className={"_alert__content"}
					dangerouslySetInnerHTML={{
						__html: process(message),
					}}></div>
			) : (
				props.local_message
			)}
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
	className?: string;
}> = (props) => {
	return (
		<div
			className={`bottom-message ${props.className}`}
			style={{
				backgroundImage: `url('${bg}')`,
				backgroundPosition: "center",
				borderRadius: "2px",
			}}>
			<div>
				<div className={"bottom-message_description"}>{props.text1}</div>
				<div className={"bottom-message_header "}>{props.text2}</div>
			</div>
			<div className={"bottom-message_btn"}>{props.button}</div>
		</div>
	);
};

export const BottomMessageMobile: React.FC<{
	text1: string | ReactNode;
	text2: string | ReactNode;
	className?: string;
	onClick?: () => void;
}> = (props) => {
	return (
		<div
			onClick={props.onClick}
			className={`bottom-message bottom-message-mobile ${props.className}`}
			style={{
				backgroundImage: `url('${bg}')`,
				backgroundPosition: "center",
				borderRadius: "2px",
			}}>
			<div>
				<div className={"bottom-message_description"}>{props.text1}</div>
				<div className={"bottom-message_header "}>{props.text2}</div>
			</div>
			<div className={"bottom-message_btn"}>
				<img src={chevron} alt="Предложить машину" />
			</div>
		</div>
	);
};

const CatalogPage = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const title = "Рассрочка - " + process.env.REACT_APP_WEBSITE_NAME;

	const meta: MetaTags = {
		description: "Выкуп,Каталог автомобилей",
		keywords: "выкуп,каталог,лизинг,авто,список,leasing",
	};

	const { data, isLoading, error } = useQuery({
		queryKey: ["catalog-filter"],
		queryFn: () => catalogService.getFilter(),
	});

	return (
		<>
			<MetaDecorator title={title} url="/catalog" />
			<CatalogLayout
				meta={meta}
				title={title}
				headerSelectedLink={"/catalog"}
				footerSmall>
				<div className="catalog">
					<Container fluid={"xxl"}>
						<CatalogMobileMenu
							data={data}
							isActive={isOpen}
							setIsActive={setOpen}
						/>
						<div>
							<Row>
								<Col lg={3}>
									{/* <div className={"sticky-no-scrollbar"}> */}
									<CatalogFiltersBlock filterData={!isLoading && data} />
									{/* </div> */}
								</Col>
								<Col lg={9} className="d-flex flex-column">
									<AlertMessage
										page={"catalog"}
										type={"danger"}
										className={"catalog-alert"}
										local_message={
											<p className="catalog-alert_message">
												Здесь представлены автомобили, которые проходят по
												программам лизинга.
												<br></br>
												Если Вам необходим автомобиль в аренду перейдите в
												раздел <Link to={"/rent/page/1"}>Аренда.</Link>
											</p>
										}
									/>
									{!error && (
										<FilterButtons
											mode="book"
											isShowMobileFiler={setOpen}
											catalogData={!isLoading && data.top}
										/>
									)}
									<CarGrid />
									<SmallFooter className="mt-auto" />
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</CatalogLayout>
		</>
	);
};

export default CatalogPage;
