import React from "react";
import bg from "./../../../images/index/logo-bg.png";
import bgNoCar from "./../../../images/index/logo-bg-no-car.webp";
import { Col, Container, Row } from "react-bootstrap";
import IndexCalculator from "./IndexCalculator";
import car from "./../../../images/index/car.webp";
import Animator from "../../../Animator";
import { useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";

//bgNoCar:true заставляет бг отображаться без авто, а само авто становится отдельным анимированным элементом.
const IndexLogo: React.FC<{
	bgNoCar?: boolean;
	sectionId: string;
	setDarkMenu: (arg: boolean) => void;
}> = (props) => {
	const { bgNoCar = false, sectionId, setDarkMenu } = props;
	useEffect(function () {
		Animator.animateOnShow(
			"index__logo",
			[
				{ id: "logo__text", delay: 100 },
				{ id: "index__logo-car-image", delay: 200 },
				{ id: "index__logo-comment", delay: 800 },
			],
			false
		);
	}, []);

	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const section = document.getElementById(sectionId) as HTMLElement;
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.5 }
		);
		observer.observe(section);
		return () => observer.unobserve(section);
	}, [sectionId]);

	useEffect(() => {
		if (!isVisible) {
			// выполнение нужных действий при уходе секции из обзора экрана
			// console.log(Секция ${sectionId} ушла из обзора экрана);
			setDarkMenu(true);
		} else {
			setDarkMenu(false);
		}
	}, [isVisible]);

	return (
		<div
			className={"index__logo"}
			style={{ backgroundImage: `url(${props.bgNoCar ? bgNoCar : bg})` }}
			id={sectionId}>
			<div className={"index__logo-overlay"}></div>
			<div className={"index__logo-content"}>
				<Container className={"h-100"}>
					<div className={"d-flex flex-column justify-content-between h-100"}>
						<Row className={"g-3 flex-grow-1"}>
							<Col sm={12} md={8} lg={5} className="m-md-0" id={"logo-text"}>
								<div
									className={
										" index__logo-header anim-enter-top-3 line-height-120"
									}
									id={"logo__text"}>
									<div>Как кредит</div>
									<div className={"muted"}>только проще</div>
								</div>

								<BrowserView>
									<IndexCalculator wideSpace={true} />
								</BrowserView>
								<MobileView>
									<IndexCalculator wideSpace={false} />
								</MobileView>

								<div
									className={"anim-enter-bottom-3 index__logo-comment "}
									id={"index__logo-comment"}>
									Стоимость предмета лизинга и приведенные расчеты через
									калькулятор являются предварительными. <br /> Для точного
									определения процентной ставки <br /> по договору, пожалуйста,
									обратитесь к менеджеру.
								</div>
							</Col>
							<Col lg={1} className={"d-none d-lg-block align-items-center"}>
								&nbsp;
							</Col>
							<Col sm={0} md={4} className={"d-flex align-items-center"}>
								{props.bgNoCar && (
									<img
										src={car}
										className={`index__logo-car anim-enter-end-2-top-2`}
										alt={""}
										id={"index__logo-car-image"}
									/>
								)}
							</Col>
						</Row>
					</div>
				</Container>
			</div>
		</div>
	);
};

export default IndexLogo;
