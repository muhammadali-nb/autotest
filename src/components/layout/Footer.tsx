import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import bg from "./../../img/common/footer/footer_bg.webp"
import geoImage from "./../../img/common/footer/geolocation.svg"
import clockImage from "./../../img/common/footer/clock.svg"
import phoneImage from "./../../img/common/footer/phone.svg"

import vkB from "./../../img/common/footer/vk-b.png"
import vkW from "./../../img/common/footer/vk-w.png"
import wappB from "./../../img/common/footer/wapp-b.png"
import wappW from "./../../img/common/footer/wapp-w.png"
import teleB from "./../../img/common/footer/tele-b.png"
import teleW from "./../../img/common/footer/tele-w.png"
import ContactsForm from "../common/ContactsForm";
import {Link} from "react-router-dom";
import Utils from "../../Utils";

const FooterMap:React.FC<{full:boolean, noContacts:boolean}> = ({full, noContacts}) => {
    return (
        <div className={'footer__map-block ' + (full ? 'full' : '')}>
            {!noContacts && <div className={'footer__map-form'}>
                <ContactsForm />
            </div>}
            <div className={'footer__map'}>
                <iframe className={'map_container'} title={'Map'}
                        src={process.env.REACT_APP_YMAP_LINK}
                        frameBorder="0"></iframe>
            </div>
        </div>
    );
}
const FooterContactsBlock: React.FC<{image:any,text:string,children:any}> = (props) => {
    return(
        <div className={'footer-contacts-block'}>
            <img src={props.image} alt={props.text} className={'footer-contacts-block-image'}/>
            <div>
                <div className={'footer-contacts-block-header'}>
                    {props.text}
                </div>
                <div className={'footer-contacts-block-text'}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
const FooterLink:React.FC<{img:any,hover:any,link:string}> = (props) => {
    return (
        <Link to={props.link} className={'footer-contacts-link'}>
            <img src={props.img} className={'default-image'} alt=""/>
            <img src={props.hover} className={'hover-image'} alt=""/>
        </Link>
    );
}
const FooterBottom = () => {
    return (
        <div className={'footer-contacts-bottom'}>
            <span className={'footer-contacts-bottom-element'}>ООО ВОСХОД ⓒ 2023 год</span>
            <div className={'me-px-50 line-height-100'}>
                <Link to={'/offer'} className={'footer-contacts-bottom-element me-px-20'}>Оферта</Link>
                <Link to={'/policy'} className={'footer-contacts-bottom-element'}>Политика конфиденциальности</Link>
            </div>

        </div>

    );
}
const FooterContacts = () => {
    const lines = process.env.REACT_APP_ADDRESS?.split('\n')??[];
    const lines2 = process.env.REACT_APP_WORKTIME?.split('\n')??[];
    return (
        <Container fluid={'xxl'}>
            <Row className={'g-0'}>
                <Col xl={5} md={5} className={'footer__contacts '}>
                    <div className="footer-contacts-top">
                        <div>Контакты</div>
                    </div>
                    <div className="footer-contacts-blocks">
                        <FooterContactsBlock image={geoImage} text={'Адрес'}>
                            {lines.map((i,index) => <div key={index} className={'mb-px-10 line-height-120'}>{i}</div>)}
                        </FooterContactsBlock>
                        <FooterContactsBlock image={clockImage} text={'Время работы'}>
                            {lines2.map((i,index) => <div key={index} className={'mb-px-10 line-height-120'}>{i}</div>)}
                        </FooterContactsBlock>
                        {process.env.REACT_APP_PHONE && <FooterContactsBlock image={phoneImage} text={'Телефон'}>
                            <a href={'tel:' + Utils.cleanPhone(process.env.REACT_APP_PHONE ?? "")} >{process.env.REACT_APP_PHONE}</a>
                        </FooterContactsBlock>}
                    </div>
                    <div className={'footer-contacts-links'}>
                        <FooterLink img={vkW} hover={vkB} link={process.env.REACT_APP_VK_LINK ?? '/'} />
                        <FooterLink img={wappW} hover={wappB} link={process.env.REACT_APP_WAPP_LINK ??'/'} />
                        <FooterLink img={teleW} hover={teleB} link={process.env.REACT_APP_TELEGRAM_LINK ?? '/'} />
                    </div>

                    <FooterBottom />
                </Col>
            </Row>
        </Container>
    );
}
const SmallFooter = () => {
    return(
        <div className={'py-px-20'}>
            <Container fluid={'xxl'}>
                <div className={'d-flex justify-content-between'}>
                    <div className={'d-flex'}>
                        <span className={'font-size-14 font-weight-light me-px-10'}>ООО Восход</span>
                        <span className={'font-size-14 font-weight-light'}>© 2023 год</span>
                    </div>
                    <div className={'d-flex'}>
                        <Link to={'/offer'} className={'footer-contacts-bottom-element text-gray-color me-px-10'}>Оферта</Link>
                        <Link to={'/policy'} className={'footer-contacts-bottom-element text-gray-color'}>Политика конфиденциальности</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

const Footer:React.FC<{ noContacts?: boolean,noForm?:boolean, small?:boolean }> = (props) => {
    if(props.small)
        return <SmallFooter />
    return (
        <footer className={'footer'} style={{backgroundImage:`url("${bg}")`}}>
            <FooterMap full={props.noContacts ?? false} noContacts={props.noForm ?? false} />
            {!props.noContacts && <FooterContacts />}
        </footer>
    );
};

export default Footer;