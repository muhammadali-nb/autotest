import React from 'react';
import {Container} from "react-bootstrap";
import BaseLayout from "../layout/BaseLayout";

function NotExistsPage() {
    return (
        <BaseLayout>
            <Container fluid={'xxl'}>
                <div style={{textAlign:'center'}}>
                    Страница не существует
                </div>
            </Container>
        </BaseLayout>

    );
}

export default NotExistsPage;