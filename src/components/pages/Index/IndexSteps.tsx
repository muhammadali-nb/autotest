import React, { FC, ReactNode, useEffect } from "react";
import arrow from "./../../../img/index/arrow.svg";
import arrowLong from "./../../../img/index/arrow-long.svg";
import { Col, Container, Row } from "react-bootstrap";
import Animator from "../../../Animator";
import arrowMobile from "../../../img/index/arrow-mobile.svg";

export const IndexStep: React.FC<{
	bgText: string;
	last?: boolean;
	header: any;
	children?: any;
	id: string;
	noAnim?: boolean;
	noArrow?: boolean;
}> = (props) => {
	const a = props.last ? arrowLong : arrow;
	return (
		<div
			className={
				"index__step " +
				(props.last ? " last" : "") +
				(props.noAnim ? "" : " anim-enter-start-3 anim-duration-1600")
			}
			id={props.id}>
			<div className={"index__step-header"}>
				{props.header}
				<div className={"index__step-bg"}>{props.bgText}</div>
			</div>
			{!props.noArrow && (
				<div
					className={"index__step-arrow"}
					style={{ backgroundImage: `url(${a})` }}></div>
			)}
			<div className={"index__step-text"}>{props.children}</div>
		</div>
	);
};

export const IndexStepMobile: FC<{
	header: string;
	description: string | ReactNode;
	arrow: boolean;
	step: string;
	id?: string;
}> = (props) => {
	const { header, description, arrow, step, id } = props;
	return (
		<div
			id={id}
			className="index__step-mobile anim-enter-top-3 anim-duration-1600">
			<div className="index__step-mobile-desc">
				<h2>{header}</h2>
				{description}
			</div>
			<div className="index__step-mobile_bgtext">{step}</div>
			{arrow && (
				<div className="index__step-mobile_arrow">
					<img src={arrowMobile} alt="next" />
				</div>
			)}
		</div>
	);
};

function IndexSteps(props) {
	useEffect(function () {
		Animator.animateOnShow(
			"index__steps-desktop",
			[
				{ id: "index-step1-desk", delay: 100 },
				{ id: "index-step2-desk", delay: 800 },
				{ id: "index-step3-desk", delay: 1500 },
			],
			false
		);
	});

	useEffect(() => {
		Animator.animateOnShow(
			"index__steps-mobile",
			[
				{ id: "index-step1-mb", delay: 100 },
				{ id: "index-step2-mb", delay: 800 },
				{ id: "index-step3-mb", delay: 1500 },
			],
			false
		);
	}, []);
	return (
		<Container fluid={"xxl"}>
			<div className={"index__steps-desktop"} id={"index__steps-desktop"}>
				<Row className={"g-0"}>
					<Col lg={4}>
						<IndexStep
							bgText={"01"}
							id={"index-step1-desk"}
							header={
								<span>
									Выбрать
									<br />
									автомобиль
								</span>
							}>
							Выберите автомобиль из нашего каталога
							<br />
							или предложите свой вариант
						</IndexStep>
					</Col>
					<Col lg={4}>
						<IndexStep
							bgText={"02"}
							id={"index-step2-desk"}
							header={
								<span>
									Обратиться
									<br />к нам
								</span>
							}>
							Обратитесь к нам в любое удобное
							<br />
							для вас время
						</IndexStep>
					</Col>
					<Col lg={4}>
						<IndexStep
							bgText={"03"}
							last={true}
							id={"index-step3-desk"}
							header={
								<span>
									Заключить
									<br />
									договор
								</span>
							}>
							Договор заключается
							<br />в течении одного дня
						</IndexStep>
					</Col>
				</Row>
			</div>
			<div className="index__steps-mobile" id={"index__steps-mobile"}>
				<Row>
					<Col xs={12}>
						<IndexStepMobile
							id={"index-step1-mb"}
							step="01"
							header={"Выбрать автомобиль"}
							description={
								<p>
									Выберите автомобиль из нашего каталога <br /> или предложите
									свой вариант
								</p>
							}
							arrow={true}
						/>
					</Col>
					<Col xs={12}>
						<IndexStepMobile
							id={"index-step2-mb"}
							step="02"
							header={"Обратиться\n" + "к нам"}
							description={
								<p>
									Обратитесь к нам в любое удобное <br />
									для вас время
								</p>
							}
							arrow={true}
						/>
					</Col>
					<Col xs={12}>
						<IndexStepMobile
							id={"index-step3-mb"}
							step={"03"}
							header={"заключить\n" + "договор"}
							description={
								<p>
									Договор заключается <br />в течении одного дня
								</p>
							}
							arrow={false}
						/>
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default IndexSteps;
