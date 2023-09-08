import React from 'react';
import BaseLayout from "../layout/BaseLayout";
import {Container} from "react-bootstrap";

const UserAgreementPage = () => {
    return (
        <BaseLayout headerType={'logo'}>
            <Container>
                Пользовательское соглашение
            </Container>
        </BaseLayout>
    );
};

export default UserAgreementPage;