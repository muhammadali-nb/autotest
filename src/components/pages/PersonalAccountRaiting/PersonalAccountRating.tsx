import React from 'react';
import PersonalAccountRaitingLayout from '../../layout/PersonalAccountLayout/PersonalAccountRaitingLayout';
import PersonalAccountHeader from '../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader';
import PersonalAccountData from '../PersonalAccount/PersonalAccountData';
import { userData } from '../PersonalAccount/PersonalAccountPage';

const PersonalAccountRaiting = () => {

    return (
        <PersonalAccountRaitingLayout>
            <PersonalAccountHeader>
				<PersonalAccountData data={userData} />
			</PersonalAccountHeader>
            
        </PersonalAccountRaitingLayout>
    )
}

export default PersonalAccountRaiting;