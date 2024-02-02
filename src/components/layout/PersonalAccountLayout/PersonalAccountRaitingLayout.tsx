import React from 'react'
import PersonalAccountLayout from './PersonalAccountLayout'
import Header from '../Header'
import { Col, Container, Row } from 'react-bootstrap'
import PersonalAccountMenu from '../../pages/PersonalAccount/PersonalAccountMenu'
import Footer from '../Footer'
import { useOutside } from '../../../hooks/useOutside'
import MobileMenu from '../MobileMenu'

interface PersonalAccountRaitingLayoutProps {
    children: React.ReactNode
}

const PersonalAccountRaitingLayout: React.FC<PersonalAccountRaitingLayoutProps> = ({ children }) => {

    const { ref, isShow, setIsShow } = useOutside(false);

    return (
        <>
            <PersonalAccountLayout mainMobileMenu={setIsShow}>
                <Header
                    burgerMenuIsShow={isShow}
                    setBurgerMenuIsShow={setIsShow}
                    type={"white"}
                    selectedLink={"/"}
                    mobileModalType="orderCall"
                />
                <Container fluid={"xxl"}>
                    <Row>
                        <Col className={"d-none d-lg-block"} lg={2}>
                            <PersonalAccountMenu selected="/personal-account/raiting" />
                        </Col>
                        <Col lg={10}>
                            <div className="personal-account_page">
                                {children}
                                
                                <Footer
                                    small={true}
                                    className="justify-content-center mt-px-20"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </PersonalAccountLayout>
            <MobileMenu menuRef={ref} setMenuIsOpen={setIsShow} menuIsOpen={isShow} />
        </>
  )
}

export default PersonalAccountRaitingLayout