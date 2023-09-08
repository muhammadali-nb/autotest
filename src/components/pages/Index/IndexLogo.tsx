import React from 'react';
import bg from './../../../img/index/logo-bg.webp'
import bgNoCar from './../../../img/index/logo-bg-no-car.webp'
import {Col, Container, Row} from "react-bootstrap";
import IndexCalculator from "./IndexCalculator";
import car from './../../../img/index/car.webp'
import Animator from "../../../Animator";
import {useEffect} from "react";

//bgNoCar:true заставляет бг отображаться без авто, а само авто становится отдельным анимированным элементом.
const IndexLogo:React.FC<{bgNoCar?:boolean}> = (props = {bgNoCar:false}) => {

    useEffect(function(){
        Animator.animateOnShow('index__logo', [
            {id:'logo__text', delay:100},
            {id:'index__logo-car-image', delay:200},
            {id:'index__logo-comment', delay:800},
        ], false);
    }, [])
    return (
        <div className={'index__logo'} style={{backgroundImage:`url(${props.bgNoCar ? bgNoCar : bg})`}} id={'index__logo'}>
            <div className={'index__logo-overlay'}></div>
            <div className={'index__logo-content'}>
                <Container className={'h-100'}>
                    <div className={'d-flex flex-column justify-content-between h-100'}>
                        <Row className={'g-3 flex-grow-1'}>
                            <Col md={6} lg={5} id={'logo-text'}>
                                <div className={'mb-px-75 index__logo-header anim-enter-top-3 line-height-120'} id={'logo__text'}>
                                    <div className={'mb-px-5'}>Как кредит</div>
                                    <div className={'muted'}>только проще</div>
                                </div>
                                <IndexCalculator wideSpace={true} />
                                <div className={'anim-enter-bottom-3 index__logo-comment mt-px-160'} id={'index__logo-comment'}>
                                    Стоимость предмета лизинга и приведенные расчеты<br/>
                                    через калькулятор являются предварительными.<br/>
                                    Для точного определения процентной ставки по договору, <br/>
                                    пожалуйста, обратитесь к менеджеру.
                                </div>
                            </Col>
                            <Col lg={1} className={"d-none d-lg-block align-items-center"}>
                                &nbsp;
                            </Col>
                            <Col md={6} className={"d-flex align-items-center"}>
                                {props.bgNoCar && <img src={car} className={`index__logo-car anim-enter-end-2-top-2`}
                                                       alt={''} id={'index__logo-car-image'}/>}
                            </Col>
                        </Row>
                    </div>

                </Container>
            </div>

        </div>
    );
};

export default IndexLogo;