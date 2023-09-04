import React from 'react';
import {Container} from "react-bootstrap";
import BaseLayout, {BaseLayoutProps} from "./BaseLayout";
import {useLocation, useNavigate} from "react-router-dom";
import DocPage from "../common/DocPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

type DocumentLayoutProps = {
    documentTitle:string,
    children:any,
}
const DocumentLayout:React.FunctionComponent<BaseLayoutProps&DocumentLayoutProps>
    = (props:BaseLayoutProps&DocumentLayoutProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const back = () => {
        if(location.key !== "default")
            navigate(-1)
        else
            navigate('/')
    }
    return (
        <BaseLayout {...props} headerType={'logo'} footerSmall noTopPadding>
            <button className="back_btn" onClick={back}>
                <FontAwesomeIcon icon={faAngleLeft} />&nbsp;&nbsp;Вернуться
            </button>
            <Container fluid={'lg'} style={{maxWidth:'880px'}}>
                <DocPage header={props.documentTitle}>
                    {props.children}
                </DocPage>
            </Container>
        </BaseLayout>

    );
};

export default DocumentLayout;