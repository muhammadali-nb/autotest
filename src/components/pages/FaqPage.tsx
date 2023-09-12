import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BaseLayout, {MetaTags} from "../layout/BaseLayout";
import FoldableQuestion from "../common/FoldableQuestion";
import Api, {FaqResponse} from "../../Api";
import {useLoaderData} from "react-router-dom";

export const FaqNotFound = () => {
    return (
        <div className={'faq-contacts'}>
            <div className={'faq-contacts-header'}>
                Не нашли ответ на свой вопрос?
            </div>
            <div className={'faq-contacts-text'}>
                Позвоните нам по телефону: 8 800 123 45 67
            </div>
            <div className={'faq-contacts-text'}>
                Время работы: с 9.00 до 21.00 (выходной – пн.)
            </div>
            <div className={'faq-contacts-text text-red-color'}>
                Звонок бесплатный
            </div>
        </div>
    )
}

const FaqLeasing = () => {
    const faq = useLoaderData() as { leasing: FaqResponse, rent: FaqResponse };
    const questions1 = faq.leasing.faq.slice(0, Math.ceil(faq.leasing.faq.length / 2));
    const questions2 = faq.leasing.faq.slice(questions1.length);
    return (
        <Row className={'gx-1'}>
            <Col md={6}>
                <div >
                    {questions1.map((i, ind) => <FoldableQuestion key={ind} header={i.title}>
                        {i.text}
                    </FoldableQuestion>)}
                </div>
            </Col>
            <Col md={6} className={'d-flex justify-content-end'}>
                <div className={'w-100'} >
                    {questions2.map((i, ind) => <FoldableQuestion key={ind} header={i.title}>
                        {i.text}
                    </FoldableQuestion>)}
                </div>
            </Col>

        </Row>
    )
}
const FaqRent = () => {
    const faq = useLoaderData() as { leasing: FaqResponse, rent: FaqResponse };
    const questions1 = faq.rent.faq.slice(0, Math.ceil(faq.rent.faq.length / 2));
    const questions2 = faq.rent.faq.slice(questions1.length);
    return (

        <Row className={'gx-lg-5 gx-sm-0'}>
            <Col md={6}>

                <div >
                    {questions1.map((i, ind) => <FoldableQuestion key={ind} header={i.title}>
                        {i.text}
                    </FoldableQuestion>)}
                </div>

            </Col>
            <Col md={6} >
                <div>
                    {questions2.map((i, ind) => <FoldableQuestion key={ind} header={i.title}>
                        {i.text}
                    </FoldableQuestion>)}
                </div>
            </Col>

        </Row>
    )
}

const FaqPage = () => {
    const [page, setPage] = useState('leasing')

    const title = "Часто задаваемые вопросы - " + process.env.REACT_APP_WEBSITE_NAME;
    const meta: MetaTags = {
        description: 'Часто задаваемые вопросы',
        keywords: 'faq,вопросы,авто,лизинг,аренда'
    }
    return (
        <BaseLayout meta={meta} title={title} headerImage={'dark'} headerSelectedLink={'/faq'}>
            <div className={'faq'}>
                <Container fluid={'xxl'}>
                    <div className={'faq_header'}>
                        вопросы
                    </div>
                    <div className={'faq_description'}>
                        Список ответов на часто задаваемые вопросы от наших клиентов постоянно пополняется.<br/>
                        Напишите нам, чтобы мы могли дополнить список.
                    </div>

                    <div className={'car-info-btns justify-content-start'}>
                        <button className={'car-info-btn big ' + (page === 'leasing' ? 'active' : '')}
                                onClick={() => {
                                    setPage('leasing')
                                }}>
                            Лизинг
                        </button>
                        <button className={'car-info-btn big ' + (page === 'rent' ? 'active' : '')}
                                onClick={() => {
                                    setPage('rent')
                                }}>
                            Аренда
                        </button>
                    </div>
                    <div className={'faq_questions'}>
                        {page === 'leasing' && <FaqLeasing/>}
                        {page === 'rent' && <FaqRent/>}
                    </div>

                    <FaqNotFound/>

                </Container>
            </div>
        </BaseLayout>
    );
};

const faqLoader = async ({request, params}) => {
    let leasing = await Api.faq('leasing');
    let rent = await Api.faq('rent');
    return {leasing, rent}// d.json();
}
export {faqLoader};
export default FaqPage;