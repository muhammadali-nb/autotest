import React, {useEffect} from 'react';
import arrow from './../../../img/index/arrow.svg';
import arrowLong from './../../../img/index/arrow-long.svg';
import {Col, Container, Row} from "react-bootstrap";
import Animator from "../../../Animator";

export const IndexStep:React.FC<{bgText:string, last?:boolean, header:any,children?:any, id:string, noAnim?:boolean, noArrow?:boolean}> = (props) => {
    const a = props.last ? arrowLong : arrow;
    return (
        <div className={'index__step ' + (props.last ? ' last' : '') + (props.noAnim ? '' : ' anim-enter-start-3 anim-duration-1600')} id={props.id}>

            <div className={'index__step-header'}>{props.header}<div className={'index__step-bg'}>{props.bgText}</div></div>
            {!props.noArrow && <div className={'index__step-arrow'} style={{backgroundImage:`url(${a})`}}></div>}
            <div className={'index__step-text'}>{props.children}</div>
        </div>
    )
}

function IndexSteps(props) {

    useEffect(function(){
        Animator.animateOnShow('index__steps', [
            {id:'index-step1', delay:100},
            {id:'index-step2', delay:800},
            {id:'index-step3', delay:1500},
        ], false);
    }, [])
    return (
        <Container fluid={'xxl'}>
            <div className={'index__steps'} id={'index__steps'}>
                <Row className={'g-0'}>
                    <Col md={4}>
                        <IndexStep bgText={'01'} id={'index-step1'} header={<span>Выбрать<br/>автомобиль</span>}>
                            Выберите автомобиль из нашего каталога<br/>
                            или предложите свой вариант
                        </IndexStep>
                    </Col>
                    <Col md={4}>
                        <IndexStep bgText={'02'} id={'index-step2'} header={<span>Обратиться<br/>к нам</span>}>
                            Обратитесь к нам в любое удобное<br/>
                            для вас время
                        </IndexStep>
                    </Col>
                    <Col md={4}>
                        <IndexStep bgText={'03'} last={true} id={'index-step3'} header={<span>Заключить<br/>договор</span>}>
                            Договор заключается<br/>
                            в течении одного дня
                        </IndexStep>
                    </Col>
                </Row>
            </div>

        </Container>
    );
}

export default IndexSteps;