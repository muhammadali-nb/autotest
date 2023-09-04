import React, {useEffect} from 'react';
import BaseLayout from "../layout/BaseLayout";
import {Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const OfferPage = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/');
    },[])
    return (
        <BaseLayout headerType={'logo'}>
            <Container>
                Оферта
            </Container>
        </BaseLayout>
    );
};

export default OfferPage;