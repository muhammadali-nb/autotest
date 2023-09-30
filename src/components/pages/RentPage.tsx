import React, { useEffect, useState } from "react";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import { Col, Collapse, Container, Row } from "react-bootstrap";
import FiltersBlock from "./Catalog/FiltersBlock";
import FilterButtons from "./Catalog/FilterButtons";
import RentGrid from "./Catalog/RentGrid";
import FoldableQuestion from "../common/FoldableQuestion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AlertMessage} from "./CatalogPage";

const RentPageHeader = () => {
	const [open, setOpen] = useState(true);
	const [mobileColapse, setMobileColapse] = useState(false);

	return (
		<>
			<div className={"mb-px-10 d-none d-md-block"}>
				<Container fluid={"xxl my-px-50"}>
					<div className={"d-flex justify-content-end align-items-center"}>
						<button
							className={
								"bg-white border-0 font-weight-medium line-height-140 font-size-14 "
							}
							style={{ outline: "none" }}
							onClick={() => setOpen(!open)}>
							<span
								className={
									"default-transition font-weight-semibold line-height-140 " +
									(open ? "opacity-0" : "")
								}>
								УСЛОВИЯ АРЕНДЫ
							</span>
							&nbsp;&nbsp;
							<span
								className={
									"default-transition text-hover-default " +
									(open ? "text-gray-color" : "")
								}>
								<FontAwesomeIcon
									className={"long-transition  " + (open ? "" : "rotate-180")}
									icon={faAngleUp}
									size={"xs"}
									style={{
										width: "18px",
										height: "18px",
									}}
								/>
							</span>
						</button>
					</div>

            <Collapse in={open}>
                <div>
                    <div className={'font-weight-medium font-size-20 mb-px-5 text-uppercase'}>
                        Быстрая аренда автомобилей
                    </div>
                    <div className={'d-flex w-100 justify-content-between pb-px-10'} style={{columnGap:'60px'}}>
                        <div className={'flex-grow pe-px-20 pt-px-5'}>
                            <div className={'font-weight-regular font-size-14 line-height-140 mb-px-10'}>
                                Вы можете забронировать автомобиль в аренду на сайте самостоятельно или позвонить нам по телефону:
                            </div>
                            <div className={'font-weight-medium text-red-color font-size-14 mb-px-10'}>
                                +7 (812) 317-68-15
                            </div>
                        </div>
                        <div>

                            <FoldableQuestion small header={'Как арендовать автомобиль?'}>
                                <div>
                                    <ul className={'foldable-ul'}>
                                        <li data-marker={'1'}>
                                            забронировать автомобиль онлайн самостоятельно или
                                            позвонить и уточнить наличие свободных автомобилей или
                                            приехать и выбрать лично
                                        </li>
                                        <li data-marker={'2'}>подписать договор аренды автомобиля</li>
                                        <li data-marker={'3'}>внести оплату (залог + стоимость аренды)</li>
                                    </ul>
                                </div>

                            </FoldableQuestion>
                            <FoldableQuestion small header={'Требования к водителю'}>
                                <div>
                                    <ul className={'foldable-ul'}>
                                        <li>водительское удостоверение</li>
                                        <li>паспорт</li>
                                        <li>стаж вождения от 3-х лет</li>
                                        <li>постоянная или временная регистрация сроком
                                            не менее 6 месяцев на территории РФ</li>
                                    </ul>
                                </div>

                            </FoldableQuestion>
                        </div>
                        <div>
                            <FoldableQuestion small header={'Условия аренды'}>
                                <div>
                                    <ul className={'foldable-ul'}>
                                        <li>минимальное время проката от 2-х суток
                                            (максимальное не ограничено)</li>
                                        <li>автомобили технически исправны и не старше 3-х лет</li>
                                        <li>все автомобили застрахованы (ОСАГО, КАСКО)</li>
                                        <li>автомобили чистые и заправлены</li>
                                    </ul>
                                </div>

                            </FoldableQuestion>
                            <FoldableQuestion small header={'Условия возврата'}>
                                <div>
                                    <ul className={'foldable-ul'}>
                                        <li>возврат автомобиля осуществляется в период
                                            с 10 до 11 утра</li>
                                        <li>автомобиль технически исправен</li>
                                        <li>сообщить о сдаче
                                            автомобиля необходимо не позднее чем за 2-е суток
                                            и не старше 3-х лет</li>
                                        <li>автомобиль должен быть чистым и заправлен</li>
                                    </ul>
                                </div>

                            </FoldableQuestion>
                        </div>
                    </div>
                </div>


            </Collapse>
        </div>

					<div
						className="rent-header-info_opener"
						onClick={() => setMobileColapse(!mobileColapse)}>
						{mobileColapse ? (
							<svg
								width="17"
								height="17"
								viewBox="0 0 17 17"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M4.25 10.625L8.5 6.375L12.75 10.625"
									stroke="#BABCBF"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						) : (
							<svg
								width="17"
								height="17"
								viewBox="0 0 17 17"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M4.25 6.375L8.5 10.625L12.75 6.375"
									stroke="#BABCBF"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						)}
						<p>{mobileColapse ? "СВЕРНУТЬ" : "Развернуть"}</p>
					</div>
				</Container>
			</div>
		</>
	);
};

const RentPage = () => {
	const [isOpen, setOpen] = useState<boolean>(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

    const title = "Аренда автомобилей - " + process.env.REACT_APP_WEBSITE_NAME;
    const meta:MetaTags = {
        description:'Аренда автомобилей',
        keywords:'аренда, авто, каталог,rent'
    }
    return (

        <BaseLayout meta={meta} title={title} headerSelectedLink={'/rent'} footerSmall>
            <Container fluid={'xxl'} className={'mb-px-40 mt-px-30'}>
                <RentPageHeader />
                <div className={'mb-px-50'} style={{borderTop:'2px solid #F2F3F6'}}/>

                {process.env.REACT_APP_NO_CATALOG !== 'true'
                    ? <div className={'d-flex'} style={{gap:'40px'}}>
                        <div className={'filter-block-container'} style={{maxWidth:'315px'}}>
                            <FiltersBlock />
                        </div>
                        <div className={'flex-grow w-100'}>
                            <AlertMessage page={'rent'} type={'danger'} className={'mb-px-60'} />
                            {/* <FilterButtons mode={'rent'} /> */} 
                            {/* dont forget to open */}
                            <RentGrid />
                        </div>
                    </div>
                    : <AlertMessage page={'rent'} type={'danger'} className={'mb-px-60'} />
                }


            </Container>
        </BaseLayout>
    );
};

export default RentPage;
