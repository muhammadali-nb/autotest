import React, { ReactNode } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import FoldableQuestion from "../common/FoldableQuestion";
import { FaqNotFound } from "./FaqPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData } from "react-router-dom";
import CallRequestForm from "../common/CallRequestForm";
import {
	CarStatBlockEntry,
	CarStatBlockItem,
	CarStatBlockProps,
} from "./Car/CarStatBlock";
import Api, { FaqResponse } from "../../Api";
import coverLetter from "../../images/common/cover-letter.png";
import coverNumber from "../../images/common/cover-number.png";
import coverLetter02 from "../../images/common/cover-letter-02.png";

import first from "../../images/common/number-faq/01.svg";
import second from "../../images/common/number-faq/02.svg";
import third from "../../images/common/number-faq/03.svg";

const Header: React.FC<{ text: string | ReactNode }> = (props) => (
	<div className={"arrange-leasing_header"}>{props.text}</div>
);

const FirstBlock = () => (
	<div>
		<Container fluid={"xxl "}>
			<div className={"cited"}>
				<div className={"cited-header"}>Лизинг</div>
				<div className={"cited-mobile_divider"} />
				<div className={"cited-description"} style={{ maxWidth: "1000px" }}>
					<span className={"font-weight-semibold"}>Автолизинг</span> – это
					финансовая услуга, с помощью которой Вы пользуетесь
					<br />
					автомобилем уже сегодня и при закрытии договора получаете его в
					собственность.
				</div>
				<div
					className={"cited-description second"}
					style={{ maxWidth: "1000px" }}>
					В конце срока лизинга гибкие решения позволяют вам определить, что
					делать с автомобилем:
				</div>
				<div className={"cited-block_container"}>
					<div className={"cited-block "}>Продлить договор</div>
					<div className={"cited-block "}>
						Вернуть автомобиль (и взять новый)
					</div>
					<div className={"cited-block "}>
						Выкупить автомобиль <br /> (в том числе на третье лицо).
					</div>
				</div>
			</div>
		</Container>
	</div>
);

const SecondBlock = () => (
	<div className={"second-block"}>
		<Container fluid={"xxl"}>
			<div className={"second-block_header "}>
				Преимущества лизинга <br /> для физических лиц:
			</div>
			<Row>
				<Col md={6}>
					<div className={"leasing__imaged-block li-bank "}>
						<div className={"leasing__imaged-block_header"}>Просто</div>
						<div className={"leasing__imaged-block_divider"} />
						<div className={"leasing__imaged-block_description "}>
							Не требуется одобрение на автокредит или потребительский кредит в
							банке
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className={"leasing__imaged-block li-card "}>
						<div className={"leasing__imaged-block_header"}>Выгодно</div>
						<div className={"leasing__imaged-block_divider"} />
						<div className={" leasing__imaged-block_description options "}>
							Приобретая автомобиль в лизинг, вы не увеличиваете свою кредитную
							нагрузку и можете использовать кредитные продукты банков
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className={"leasing__imaged-block li-jewel "}>
						<div className={"leasing__imaged-block_header"}>Доступно</div>
						<div className={"leasing__imaged-block_divider"} />
						<div className={"leasing__imaged-block_description "}>
							Лизинг позволяет приобрести автомобиль более высокого класса
						</div>
					</div>
				</Col>

				<Col md={6}>
					<div className={"leasing__imaged-block li-document "}>
						<div className={"leasing__imaged-block_header"}>Быстро</div>
						<div className={"leasing__imaged-block_divider"} />
						<div className={"leasing__imaged-block_description "}>
							Скорость и удобство проведения сделки в максимально короткие сроки
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	</div>
);
const HowBlock = () => (
	<div className={"arrange-leasing"}>
		<Container fluid={"xxl"}>
			<Header text={"Как оформить лизинг?"} />
			<div
				className={
					"arrange-leasing_side font-size-16 line-height-140 font-weight-medium"
				}>
				<h3 className={"arrange-leasing_options"}>Общие требования:</h3>
				<div className={"arrange-leasing_options-item"}>
					<FontAwesomeIcon icon={faCircleCheck} />
					&nbsp;&nbsp;<p>Гражданство РФ</p>
				</div>
				<div className={"arrange-leasing_options-item"}>
					<FontAwesomeIcon icon={faCircleCheck} />
					&nbsp;&nbsp;<p>Возраст не менее 21 лет</p>
				</div>
				<div className={"arrange-leasing_options-item"}>
					<FontAwesomeIcon icon={faCircleCheck} />
					&nbsp;&nbsp;<p>Водительский стаж от 3-х лет</p>
				</div>
				<div className={"arrange-leasing_options-item"}>
					<FontAwesomeIcon icon={faCircleCheck} />
					&nbsp;&nbsp;
					<p>
						Постоянная или временная регистрация сроком <br /> не менее 6
						месяцев на территории РФ
					</p>
				</div>
			</div>
			<div className={"font-size-16 line-height-140 font-weight-medium ls-001"}>
				<div className={"arrange-leasing_options"}>
					<p>Список документов, необходимых для заключения договора:</p>
				</div>
				<div className={"arrange-leasing_options-item"}>
					<FontAwesomeIcon icon={faCircleCheck} />
					&nbsp;&nbsp;<p>Паспорт РФ</p>
				</div>
				<div className={"arrange-leasing_options-item"}>
					<FontAwesomeIcon icon={faCircleCheck} />
					&nbsp;&nbsp;
					<p>
						Водительское удостоверение <br /> (или другой документ,
						удостоверяющий личность)
					</p>
				</div>
			</div>
		</Container>
	</div>
);

const Step: React.FC<{ children: any; bgText: string; type: string }> = (
	props
) => {
	return (
		<div className={"leasing__step " + props.type}>
			<div className={"leasing__step-bgtext"}>{props.bgText}</div>
			<div className={"leasing__step-text"}>{props.children}</div>
		</div>
	);
};
const StepBlock = () => {
	const settings: CarStatBlockProps = {
		data: [],
		dotted: true,
		column1Width: "1fr",
		column2Width: "1.5fr",
	};

	return (
		<div className={"step-block"}>
			<Container fluid={"xxl"}>
				{/* <Header text={"Я подхожу, что дальше?"} /> */}
				<h1 className={"step-block_header"}>Я подхожу, что дальше?</h1>
				<div className={"step-block_descktop"}>
					<Row className="mb-px-100">
						<Col md={4}>
							<Step bgText={"01"} type={"first"}>
								Выбираете
								<br />
								программу
								<br />
								лизинга
								<div className={"leasing__step-side-image"}></div>
							</Step>
						</Col>
						<Col md={4}>
							<Step bgText={"02"} type={"second"}>
								<div className={"mb-px-20"}>
									Выбираете
									<br /> автомобиль
								</div>
								<Link to={"/catalog"} className={"site-btn small "}>
									<span
										className={
											"font-size-16 line-height-140 font-weight-medium"
										}>
										Перейти в каталог&nbsp;&nbsp;
										<FontAwesomeIcon icon={faArrowRight} />
									</span>
								</Link>
							</Step>
						</Col>
						<Col md={4}>
							<Step bgText={"03"} type={"third"}>
								<div className={"mb-px-20"}>
									Заключаете <br /> договор
								</div>
								<CallRequestForm
									small={true}
									text={
										<span
											className={
												"font-size-16 line-height-140 font-weight-medium"
											}>
											Заказать звонок&nbsp;&nbsp;
											<FontAwesomeIcon icon={faArrowRight} />
										</span>
									}
								/>
							</Step>
						</Col>
					</Row>

					<div className={"step-block_descktop_characteristic"}>
						<div>
							<div className={"step-block_descktop_characteristic_header"}>
								Новые
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-medium mb-px-30"
								}>
								После заключения договора вы получаете выбранный автомобиль в
								долгосрочное пользование с правом выкупа.
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-medium mb-px-5 text-gray-color"
								}>
								Предмет лизинга:
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-medium mb-px-20"
								}>
								Новые автомобили
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-medium mb-px-10 text-gray-color"
								}>
								Условия:
							</div>
							<div className={"font-size-18"}>
								<CarStatBlockEntry settings={settings}>
									<CarStatBlockItem
										settings={settings}
										data={{
											name: "Первоначальный взнос",
											value: "от 10 до 30% от стоимости а/м",
										}}
									/>
									<CarStatBlockItem
										settings={settings}
										data={{ name: "Срок", value: "от 1 до 5 лет" }}
									/>
									<CarStatBlockItem
										settings={settings}
										data={{ name: "Условия выкупа", value: "1000 ₽" }}
									/>
								</CarStatBlockEntry>
							</div>
						</div>
						<div></div>
						<div>
							<div className={"step-block_descktop_characteristic_header"}>
								с пробегом
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-medium mb-px-30"
								}>
								После завершения срока договора право собственности
								<br />
								на автомобиль переходит к вам
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-medium mb-px-5 text-gray-color"
								}>
								Предмет лизинга:
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-medium mb-px-20"
								}>
								Автомобили с пробегом
							</div>
							<div className={"font-size-16 font-weight-medium mb-px-20"}>
								<CarStatBlockEntry settings={settings}>
									<CarStatBlockItem
										settings={settings}
										data={{
											name: "Возраст",
											value: "не более 5 лет (с даты выпуска ПТС)",
										}}
									/>
									<CarStatBlockItem
										settings={settings}
										data={{ name: "Пробег", value: "не более 140 тыс. км." }}
									/>
									<CarStatBlockItem
										settings={settings}
										data={{
											name: "Тех. состояние",
											value:
												"а/м технически исправен, комплектен, повреждений нет наличие 2х ключей",
										}}
									/>
								</CarStatBlockEntry>
							</div>
							<div
								className={
									"font-size-20 line-height-140 font-weight-semibold mb-px-10 text-gray-color"
								}>
								Условия:
							</div>
							<div className={"font-size-18"}>
								<CarStatBlockEntry settings={settings}>
									<CarStatBlockItem
										settings={settings}
										data={{
											name: "Первоначальный взнос",
											value: "от 10 до 30% от стоимости а/м",
										}}
									/>
									<CarStatBlockItem
										settings={settings}
										data={{ name: "Срок", value: "от 1 до 5 лет" }}
									/>
									<CarStatBlockItem
										settings={settings}
										data={{ name: "Условия выкупа", value: "1000 ₽" }}
									/>
								</CarStatBlockEntry>
							</div>
						</div>
					</div>
				</div>
			</Container>

			<div className={"step-block_mobile"}>
				<Container fluid={"xxl"}>
					<div className={"step-block_mobile_characteristic_card"}>
						<div>
							<h2>Выбрать автомобиль</h2>
							<p>
								Выберите автомобиль из нашего <br />
								каталога или предложите свой вариант
							</p>
						</div>
						{/* <h1 className={"first-number"}>01</h1> */}

						<div>
							<img src={first} alt="" />
						</div>
						<img src={coverNumber} alt="" />
					</div>
					<div className={"step-block_mobile_characteristic_card"}>
						<div>
							<h2>Обратиться к нам</h2>
							<p>
								Обратитесь к нам <br />в любое удобное для вас время
							</p>
						</div>
						{/* <h1>02</h1> */}

						<div>
							<img src={second} alt="" />
						</div>
					</div>
					<div className={"step-block_mobile_characteristic_card"}>
						<div>
							<h2>Заключить договор</h2>
							<p>
								Договор заключается <br />в течении одного дня
							</p>
						</div>
						{/* <h1>03</h1> */}

						<div>
							<img src={third} alt="" />
						</div>
					</div>
				</Container>
				<div className="mt-5">
					<Container fluid="xxl">
						<div className="step-block_mobile_characteristic_table-top">
							<h1 className={"step-block_mobile_characteristic_table-header"}>
								Новые
							</h1>
							<p className={"step-block_mobile_characteristic_table-desc"}>
								После заключения договора вы получаете выбранный автомобиль в
								долгосрочное пользование с правом выкупа.
							</p>
							<img src={coverLetter} alt="" />
						</div>
					</Container>
					<table className="table table-striped step-block_mobile_characteristic_table first">
						<thead>
							<tr>
								<th
									scope="col"
									className={"step-block_mobile_characteristic_table-left"}>
									Предмет лизинга
								</th>
								<th
									scope="col"
									className={"step-block_mobile_characteristic_table-right"}>
									Новые автомобили
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Первоначальный взнос
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									не более 5 лет от 10 до 30% от стоимости а/м
								</td>
							</tr>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Срок
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									от 1 до 5 лет
								</td>
							</tr>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Условия выкупа
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									1000 ₽
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className={"mt-4"}>
					<Container fluid="xxl">
						<div className="step-block_mobile_characteristic_table-top">
							<h1 className={"step-block_mobile_characteristic_table-header"}>
								с пробегом
							</h1>
							<p className={"step-block_mobile_characteristic_table-desc"}>
								После заключения договора вы получаете выбранный автомобиль в
								долгосрочное пользование с правом выкупа.
							</p>
							<img src={coverLetter02} alt="" />
						</div>
					</Container>
					<table className="table table-striped step-block_mobile_characteristic_table">
						<thead>
							<tr>
								<th
									scope="col"
									className={"step-block_mobile_characteristic_table-left"}>
									Предмет лизинга
								</th>
								<th
									scope="col"
									className={"step-block_mobile_characteristic_table-right"}>
									Автомобили с пробегом
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Возраст
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									не более 5 лет (с даты выпуска ПТС)
								</td>
							</tr>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Пробег
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									не более 140 тыс. км.
								</td>
							</tr>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Тех. состояние
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									а/м технически исправен, комплектен, повреждений нет наличие
									2х ключей
								</td>
							</tr>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Первоначальный взнос
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									от 10 до 30% от стоимости а/м
								</td>
							</tr>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Срок
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									от 1 до 5 лет
								</td>
							</tr>
							<tr>
								<td className={"step-block_mobile_characteristic_table-left"}>
									Условия выкупа
								</td>
								<td className={"step-block_mobile_characteristic_table-right"}>
									1000 ₽
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

const FaqBlock = () => {
	const faq = useLoaderData() as FaqResponse;
	const questions1 = faq.faq.slice(0, Math.ceil(faq.faq.length / 2));
	const questions2 = faq.faq.slice(questions1.length);
	return (
		<div className={"faq-block"}>
			<Container fluid={"xxl"}>
				<h1 className={"faq-block_header"}>
					чАСТО ЗАДАВАЕМЫЕ <br /> ВОПРОСЫ
				</h1>
				<p className={"faq-block_description"}>
					В разделе Вопросы, вы также можете получить ответы по вопросам аренды
					автомобиля
				</p>
				<Row className={"faq-block_body gx-lg-5 gx-sm-0"}>
					<Col sm={12} lg={6} className="px-0 px-md-3 faq-block_body-leftside">
						<div
						// className={"w-100"}
						>
							{questions1.map((i, ind) => (
								<FoldableQuestion key={ind} header={i.title}>
									{i.text}
								</FoldableQuestion>
							))}
						</div>
					</Col>
					<Col sm={12} lg={6} className="px-0 px-md-3 faq-block_body-rightside">
						<div
						// className={"w-100"}
						>
							{questions2.map((i, ind) => (
								<FoldableQuestion key={ind} header={i.title}>
									{i.text}
								</FoldableQuestion>
							))}
						</div>
					</Col>
				</Row>
				<div>
					<FaqNotFound />
				</div>
			</Container>
		</div>
	);
};

const ProgramsPage = () => {
	const title = "Лизинг - " + process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: "Лизинг",
		keywords:
			"leasing,rent,аренда,авто,новое авто, новый автомобиль,подержанное авто,подержанный автомобиль,автомобиль,лизинг,бронирование",
	};
	return (
		<BaseLayout
			title={title}
			meta={meta}
			headerImage={"dark"}
			headerSelectedLink={"/programs"}>
			<div>
				<FirstBlock />
				<SecondBlock />
				<HowBlock />
				<StepBlock />
				<FaqBlock />
			</div>
		</BaseLayout>
	);
};

const faqProgramsLoader = async ({ request, params }) => {
	return Api.faq("leasing-landing"); // d.json();
};
export { faqProgramsLoader };
export default ProgramsPage;
