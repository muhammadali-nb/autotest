import React, {ReactNode} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BaseLayout, {MetaTags} from "../layout/BaseLayout";
import FoldableQuestion from "../common/FoldableQuestion";
import {FaqNotFound} from "./FaqPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {Link, useLoaderData} from "react-router-dom";
import CallRequestForm from "../common/CallRequestForm";
import {CarStatBlockEntry, CarStatBlockItem, CarStatBlockProps} from "./Car/CarStatBlock";
import Api, {FaqResponse} from "../../Api";

const Header:React.FC<{text:string|ReactNode}> = (props) =>
    <div className={'font-weight-semibold text-uppercase font-size-50 mb-px-40 line-height-120'}>
    {props.text}
</div>

const FirstBlock = () => <div>

    <Container fluid={'xxl mb-px-80 mt-px-80'}>
        <div className={'cited'}>
            <div className={'font-size-50 mb-px-30 font-weight-semibold text-uppercase line-height-120'}>
                Лизинг
            </div>
            <div className={'font-size-16 mb-px-20 font-weight-medium line-height-140 ls-001'} style={{maxWidth:'1000px'}}>
                <span className={'font-weight-semibold'}>Автолизинг</span> – это финансовая услуга, с помощью которой Вы пользуетесь<br />
                автомобилем уже сегодня и при закрытии договора получаете его в собственность.
            </div>
            <div className={'font-size-16 mb-px-40 font-weight-medium line-height-140 ls-001'} style={{maxWidth:'1000px'}}>
                В конце срока лизинга гибкие решения позволяют вам определить, что делать с автомобилем:
            </div>
            <div className={'cited-block mb-px-30'}>
                Продлить договор
            </div>
            <div className={'cited-block mb-px-30'}>
                Вернуть автомобиль (и взять новый)
            </div>
            <div className={'cited-block mb-px-30'}>
                Выкупить автомобиль (в том числе на третье лицо).
            </div>
        </div>
    </Container>
</div>
const SecondBlock = () => <div>
    <Container fluid={'xxl'} className={'mt-px-80 mb-px-40'}>
        <div className={'text-gray-color font-weight-semibold font-size-24 text-uppercase opacity-50 mb-px-40'}>
            Преимущества лизинга для физических лиц:
        </div>
        <Row>
            <Col md={6}>
                <div className={'leasing__imaged-block li-bank mb-px-40'}>
                    <div className={'font-weight-semibold font-size-24 mb-px-10 text-uppercase'}>Просто</div>
                    <div className={'font-weight-medium font-size-16 line-height-140 ls-001'}>
                        Не требуется одобрение на автокредит<br/>
                        или потребительский кредит в банке
                    </div>
                </div>
            </Col>
            <Col md={6}>
                <div className={'leasing__imaged-block li-jewel mb-px-40'}>
                    <div className={'font-weight-semibold font-size-24 mb-px-10 text-uppercase'}>Доступно</div>
                    <div className={'font-weight-medium font-size-16 line-height-140 ls-001'}>
                        Лизинг позволяет приобрести автомобиль<br/>
                        более высокого класса
                    </div>
                </div>
            </Col>
            <Col md={6}>
                <div className={'leasing__imaged-block li-card mb-px-40'}>
                    <div className={'font-weight-semibold font-size-24 mb-px-10 text-uppercase'}>Выгодно</div>
                    <div className={'font-weight-medium font-size-16 line-height-140 ls-001'}>
                        Приобретая автомобиль в лизинг, вы не увеличиваете<br/>
                        свою кредитную нагрузку и можете использовать<br/>
                        кредитные продукты банков
                    </div>
                </div>
            </Col>
            <Col md={6}>
                <div className={'leasing__imaged-block li-document mb-px-40'}>
                    <div className={'font-weight-semibold font-size-24 mb-px-10 text-uppercase'}>Быстро</div>
                    <div className={'font-weight-medium font-size-16 line-height-140 ls-001'}>
                        Скорость и удобство проведения сделки<br/>
                        в максимально короткие сроки
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
</div>
const HowBlock = () => <div className={'shadowed-bg pt-px-100 pb-px-80'}>
    <Container fluid={'xxl'}>
        <Header text={'Как оформить лизинг?'} />
        <div className={'mb-px-60 font-size-16 line-height-140 font-weight-medium'}>
            <div className={'font-size-24 font-weight-semibold text-uppercase mb-px-20 ls-001'}>Общие требования:</div>
            <div className={'mb-px-15'}>
                <FontAwesomeIcon icon={faCircleCheck} />&nbsp;&nbsp;Гражданство РФ
            </div>
            <div className={'mb-px-15'}>
                <FontAwesomeIcon icon={faCircleCheck} />&nbsp;&nbsp;Возраст не менее 21 лет
            </div>
            <div className={'mb-px-15'}>
                <FontAwesomeIcon icon={faCircleCheck} />&nbsp;&nbsp;Водительский стаж от 3-х лет
            </div>
            <div className={'mb-px-15'}>
                <FontAwesomeIcon icon={faCircleCheck} />&nbsp;&nbsp;Постоянная или временная регистрация сроком не менее 6 месяцев на территории РФ
            </div>
        </div>
        <div className={'font-size-16 line-height-140 font-weight-medium ls-001'}>
            <div className={'font-size-24 font-weight-semibold text-uppercase mb-px-20'}>Список документов, необходимых для заключения договора:</div>
            <div className={'mb-px-15'}>
                <FontAwesomeIcon icon={faCircleCheck} />&nbsp;&nbsp;Паспорт РФ
            </div>
            <div className={'mb-px-15'}>
                <FontAwesomeIcon icon={faCircleCheck} />&nbsp;&nbsp;Водительское удостоверение (или другой документ, удостоверяющий личность)
            </div>
        </div>
    </Container>
</div>

const Step:React.FC<{children:any, bgText:string, type:string}> = (props) => {
    return (
        <div className={'leasing__step ' + props.type}>
            <div className={'leasing__step-bgtext'}>{props.bgText}</div>
            <div className={'leasing__step-text'}>{props.children}</div>
        </div>
    )
}
const StepBlock = () => {
    const settings:CarStatBlockProps = {data:[],dotted:true, column1Width:'1fr', column2Width:'1.5fr'}

    return(
        <div className={'pt-px-100 pb-px-80'}>
            <Container fluid={'xxl'}>
                <Header text={'Я подхожу, что дальше?'} />

                <Row className={'gx-0 mb-px-100'}>
                    <Col md={4}>
                        <Step bgText={'01'} type={'first'}>
                            Выбираете<br />
                            программу<br />
                            лизинга
                            <div className={'leasing__step-side-image'}></div>
                        </Step>
                    </Col>
                    <Col md={4}>
                        <Step bgText={'02'} type={'second'}>
                            <div className={'mb-px-20'}>
                                Выбираете<br /> автомобиль
                            </div>
                            <Link to={'/catalog'} className={'site-btn small '} >
                                <span className={'font-size-16 line-height-140 font-weight-medium'}>Перейти в каталог&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowRight} /></span>
                            </Link>
                        </Step>
                    </Col>
                    <Col md={4}>
                        <Step bgText={'03'} type={'third'}>
                            <div className={'mb-px-20'}>
                                Заключаете <br/> договор
                            </div>
                            <CallRequestForm small text={<span className={'font-size-16 line-height-140 font-weight-medium'}>Заказать звонок&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowRight} /></span>} />
                        </Step>
                    </Col>
                </Row>

                <div className={''} style={{display:'grid',gridTemplateColumns:'1fr 100px 1fr'}}>
                    <div>
                        <div className={'font-size-72 line-height-140 font-weight-semibold mb-px-20 text-uppercase'}>Новые</div>
                        <div className={'font-size-20 line-height-140 font-weight-medium mb-px-30'}>
                            После заключения договора вы получаете выбранный автомобиль в долгосрочное пользование с правом выкупа.
                        </div>
                        <div className={'font-size-20 line-height-140 font-weight-medium mb-px-5 text-gray-color'}>
                            Предмет лизинга:
                        </div>
                        <div className={'font-size-20 line-height-140 font-weight-medium mb-px-20'}>
                            Новые автомобили
                        </div>
                        <div className={'font-size-20 line-height-140 font-weight-medium mb-px-10 text-gray-color'}>
                            Условия:
                        </div>
                        <div className={'font-size-18'}>
                            <CarStatBlockEntry settings={settings}>
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Первоначальный взнос",value:'от 10 до 30% от стоимости а/м'}} />
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Срок",value:'от 1 до 5 лет'}} />
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Условия выкупа",value:'1000 ₽'}} />
                            </CarStatBlockEntry>
                        </div>

                    </div>
                    <div></div>
                    <div>
                        <div className={'font-size-72 line-height-140 font-weight-semibold mb-px-20 text-uppercase'}>с пробегом</div>
                        <div className={'font-size-20 line-height-140 font-weight-medium mb-px-30'}>
                            После завершения срока договора право собственности<br/>
                            на автомобиль переходит к вам
                        </div>
                        <div className={'font-size-20 line-height-140 font-weight-medium mb-px-5 text-gray-color'}>
                            Предмет лизинга:
                        </div>
                        <div className={'font-size-20 line-height-140 font-weight-medium mb-px-20'}>
                            Автомобили с пробегом
                        </div>
                        <div className={'font-size-16 font-weight-medium mb-px-20'}>
                            <CarStatBlockEntry settings={settings}>
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Возраст",value:'не более 5 лет (с даты выпуска ПТС)'}} />
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Пробег",value:'не более 140 тыс. км.'}} />
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Тех. состояние",
                                                      value:'а/м технически исправен, комплектен, повреждений нет наличие 2х ключей'}} />
                            </CarStatBlockEntry>


                        </div>
                        <div className={'font-size-20 line-height-140 font-weight-semibold mb-px-10 text-gray-color'}>
                            Условия:
                        </div>
                        <div className={'font-size-18'}>
                            <CarStatBlockEntry settings={settings}>
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Первоначальный взнос",value:'от 10 до 30% от стоимости а/м'}} />
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Срок",value:'от 1 до 5 лет'}} />
                                <CarStatBlockItem settings={settings}
                                                  data={{name:"Условия выкупа",value:'1000 ₽'}} />
                            </CarStatBlockEntry>
                        </div>

                    </div>
                </div>
            </Container>
        </div>
    )
}


const FaqBlock = () => {
    const faq = useLoaderData() as FaqResponse;
    const questions1 = faq.faq.slice(0, Math.ceil(faq.faq.length / 2));
    const questions2 = faq.faq.slice(questions1.length);
    return(
        <div className={'shadowed-bg pt-px-100 pb-px-80'}>
            <Container fluid={'xxl'}>
                <div className={'font-weight-semibold text-uppercase font-size-50 mb-px-60'}>
                    Вопросы
                </div>
                <Row className={'gx-1 mb-px-100'}>
                    <Col md={6}>
                        <div style={{maxWidth:'620px'}}>
                            {questions1.map((i, ind) => <FoldableQuestion key={ind} header={i.title}>
                                {i.text}
                            </FoldableQuestion>)}
                        </div>
                    </Col>
                    <Col md={6} className={'d-flex justify-content-end'}>
                        <div className={'w-100'} style={{maxWidth:'620px'}}>
                            {questions2.map((i, ind) => <FoldableQuestion key={ind} header={i.title}>
                                {i.text}
                            </FoldableQuestion>)}
                        </div>
                    </Col>

                </Row>
                <div>
                    <FaqNotFound />
                </div>
            </Container>
        </div>
    )
}


const ProgramsPage = () => {

    const title = "Лизинг - " + process.env.REACT_APP_WEBSITE_NAME;
    const meta:MetaTags = {
        description:"Лизинг",
        keywords:'leasing,rent,аренда,авто,новое авто, новый автомобиль,подержанное авто,подержанный автомобиль,автомобиль,лизинг,бронирование'
    }
    return (
        <BaseLayout title={title} meta={meta} headerImage={'dark'} headerSelectedLink={'/programs'}>
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

const faqProgramsLoader = async({request, params}) =>{
    return Api.faq('leasing-landing')// d.json();
}
export {faqProgramsLoader};
export default ProgramsPage;