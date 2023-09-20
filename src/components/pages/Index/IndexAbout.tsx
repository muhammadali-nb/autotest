import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import badge1 from "./../../../img/index/bank.png";
import badge2 from "./../../../img/index/cards.png";
import badge3 from "./../../../img/index/jewel.png";
import badge4 from "./../../../img/index/document.png";
import Animator from "../../../Animator";

const IndexAboutBadge: React.FC<{
	index: number;
	image: any;
	header: string;
	children: any;
	id: string;
}> = (props) => {
	return (
		<div
			className={
				"anim-enter-end-1 anim-duration-1600 index__about-badge index-" +
				props.index
			}
			id={props.id}>
			<div className={"index__about-badge-image"}>
				<img src={props.image} alt={props.header} />
			</div>
			<div>
				<div className={"index__about-badge-header"}>{props.header}</div>
				<div className={"bg-red-color index__about-badge-divider "}></div>
				<div className={"index__about-badge-text"}>{props.children}</div>
			</div>
		</div>
	);
};
const IndexBadges = () => {
	useEffect(function () {
		Animator.animateOnShow(
			"index__about-badges",
			[
				{ id: "index__badge1", delay: 100 },
				{ id: "index__badge2", delay: 500 },
				{ id: "index__badge3", delay: 1000 },
				{ id: "index__badge4", delay: 1500 },
			],
			false
		);
	}, []);
	return (
		<div className={"index__about-badges"} id={"index__about-badges"}>
			<IndexAboutBadge
				index={1}
				image={badge1}
				header={"просто"}
				id={"index__badge1"}>
				Не требуется одобрение на автокредит или потребительский кредит в банке
			</IndexAboutBadge>
			<IndexAboutBadge
				index={2}
				image={badge2}
				header={"выгодно"}
				id={"index__badge2"}>
				Приобретая автомобиль в лизинг, вы не увеличиваете свою кредитную
				нагрузку и можете использовать кредитные продукты банков
			</IndexAboutBadge>
			<IndexAboutBadge
				index={3}
				image={badge3}
				header={"Доступно"}
				id={"index__badge3"}>
				Лизинг позволяет приобрести автомобиль более высокого класса
			</IndexAboutBadge>
			<IndexAboutBadge
				index={4}
				image={badge4}
				header={"быстро"}
				id={"index__badge4"}>
				Скорость и удобство проведения сделки в максимально короткие сроки
			</IndexAboutBadge>
		</div>
	);
};
const IndexLabel: React.FC<{ big: string; small: string }> = (props) => {
	return (
		<div className={"index__about-label"}>
			<div className={"index__about-label-big"}>{props.big}</div>
			<div className={"index__about-label-small"}>{props.small}</div>
		</div>
	);
};
const IndexAboutContent = () => {
	return (
		<Container fluid={"xxl"} style={{ position: "relative", zIndex: 40 }}>
			<Row>
				<Col sm={12} lg={6}>
					<div className={"index__about-header"}>О&nbsp;компании</div>
					<div className={"index__about-text"}>
						Наша компания создана в 2012 году.
					</div>
					<div className={"index__about-text"} style={{ maxWidth: "620px" }}>
						Основным видом деятельности является предоставление услуг по аренде
						и лизингу автомобилей для компаний и физический лиц.
					</div>
					<div className={"index__about-text"} style={{ maxWidth: "560px" }}>
						Мы ценим комфорт и время наших клиентов, поэтому стремимся оформить
						автомобиль для вас в максимально короткие сроки. Индивидуальный
						подход позволяет выбрать условия необходимые именно вам.
					</div>
				</Col>
				<Col lg={6}></Col>
				<Col sm={12} lg={4}>
					<div className={"index__about-labels"}>
						<IndexLabel big={">10"} small={"Лет работы"} />
						<IndexLabel big={">500"} small={"Автомобилей"} />
						<IndexLabel big={">500"} small={"Довольных клиентов"} />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

function IndexAbout(props) {
	return (
		<div className={"index__about"}>
			<div className={"index__about-bg"}></div>
			<IndexAboutContent />
			<IndexBadges />
		</div>
	);
}

export default IndexAbout;
