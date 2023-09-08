import React, {ReactNode} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import BaseLayout, {MetaTags} from "../layout/BaseLayout";
import ContactsForm from "../common/ContactsForm";
// import {faClock, faLocationDot, faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

import vkB from "./../../img/common/footer/vk-b.png"
import vkW from "./../../img/common/footer/vk-w.png"
import wappB from "./../../img/common/footer/wapp-b.png"
import wappW from "./../../img/common/footer/wapp-w.png"
// import instaB from "./../../img/common/footer/insta-b.png"
// import instaW from "./../../img/common/footer/insta-w.png"
import teleB from "./../../img/common/footer/tele-b.png"
import teleW from "./../../img/common/footer/tele-w.png"
import geo from "./../../img/common/geo.svg";
import clock from "./../../img/common/clock.svg";
import phone from "./../../img/common/phone.svg";

const ContactBlock:React.FC<{icon:ReactNode, header:string|ReactNode,children:any}> = (props) =>
    <div className={'position-relative ps-px-45 mb-px-50'}>
        <div className={'position-absolute start-0'} style={{top:'5px'}}>{props.icon}</div>
        <div className={'font-size-24 text-uppercase font-weight-semibold mb-px-15'}>{props.header}</div>
        <div className={'font-size-16 font-weight-regular'}>
            {props.children}
        </div>
    </div>
const ContactSocial:React.FC<{icon:string,hover:string, link:string}> = (props) =>
    <Link to={props.link} className={'contacts-social'}>
        <img src={props.icon} className={'default-image'} alt=""/>
        <img src={props.hover} className={'hover-image'} alt=""/>
    </Link>


const ContactsPage = () => {

    const title = "Контакты - " + process.env.REACT_APP_WEBSITE_NAME;
    const meta:MetaTags = {
        description:'Наши контакты',
        keywords:'контакты,телефон,email,vk,vkontakte,telegram,phone,мейл,имейл,почта'
    }
    const lines = process.env.REACT_APP_ADDRESS?.split('\n')??[];
    const lines2 = process.env.REACT_APP_WORKTIME?.split('\n')??[];

    return (
        <BaseLayout meta={meta} title={title} footerNoContacts={true} footerNoForm={true} headerSelectedLink={'/contacts'}>
            <Container fluid={'xxl pt-px-50 pb-px-40'}>
                <Row>
                    <Col lg={6}>
                        <div className={'font-size-60 mb-px-15 text-uppercase font-weight-medium line-height-120'}>
                            Контакты
                        </div>
                        <div style={{width:'85%', height:'6px', maxWidth:'500px'}} className={'bg-red-color mb-px-45'}></div>
                        <div>
                            <ContactBlock icon={<img src={geo} alt={''} />} header={'Адрес'} >
                                {lines.map((i, index) => <div key={index} className={'mb-px-10 line-height-120'}>{i}</div>)}
                            </ContactBlock>
                            <ContactBlock icon={<img src={clock} alt={''} />} header={'Время работы'} >
                                {lines2.map((i, index) => <div key={index} className={'mb-px-10 line-height-120'}>{i}</div>)}
                            </ContactBlock>
                            <ContactBlock icon={<img src={phone} alt={''} />} header={'Телефон'} >
                                <div className={'mb-px-10 line-height-120'}>{process.env.REACT_APP_PHONE}</div>
                            </ContactBlock>
                        </div>
                        <div className={'d-flex gap-x-px-20'}>
                            <ContactSocial link={process.env.REACT_APP_VK_LINK ?? '/'} icon={vkB} hover={vkW} />
                            <ContactSocial link={process.env.REACT_APP_TELEGRAM_LINK ?? '/'}
                                           icon={wappB} hover={wappW} />
                            <ContactSocial link={process.env.REACT_APP_TELEGRAM_LINK ?? '/'}
                                           icon={teleB} hover={teleW} />
                        </div>

                    </Col>
                    <Col lg={6}>
                        <ContactsForm big={false} />
                    </Col>
                </Row>

            </Container>
        </BaseLayout>
    );
};

export default ContactsPage;