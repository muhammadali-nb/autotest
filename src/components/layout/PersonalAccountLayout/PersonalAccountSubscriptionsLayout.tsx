import { Container, Row, Col } from "react-bootstrap";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";
import PersonalAccountMenu from "../../pages/PersonalAccount/PersonalAccountMenu";
import PersonalAccountMenuMobile from "../../pages/PersonalAccount/PersonalAccountMenuMobile";
import Footer from "../Footer";
import PersonalAccountLayout from "./PersonalAccountLayout";
import { useOutside } from "../../../hooks/useOutside";

const PersonalAccountSubscriptionsLayout: React.FC<{
    children: React.ReactNode
}> = (props) => {
    const { children } = props;

    const { ref, isShow, setIsShow } = useOutside(false);

    return (
        <>
            <PersonalAccountLayout>
                <Container fluid={"xxl"}>
                    <Row>
                        <Col className={"d-none d-lg-block"} lg={2}>
                            <PersonalAccountMenu selected="/personal-account/subscriptions" />
                        </Col>
                        <Col lg={10}>
                            <div className="personal-account_page">
                                {children}
                                <PersonalAccountMenuBurger onClick={() => setIsShow(!isShow)} />
                                <Footer
                                    small={true}
                                    className="justify-content-center mt-px-20"
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </PersonalAccountLayout>
            <PersonalAccountMenuMobile
                menuIsOpen={isShow}
                setMenuIsOpen={setIsShow}
                menuRef={ref}
            />
        </>
    )
}

export default PersonalAccountSubscriptionsLayout;