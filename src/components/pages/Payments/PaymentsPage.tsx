import React from "react";
import PersonalAccountPaymentLayout from "../../layout/PersonalAccountLayout/PersonalAccountPaymentLayout";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import { userData } from "../PersonalAccount/PersonalAccountPage";
import PersonalAccountData from "../PersonalAccount/PersonalAccountData";
import { PaymentCardsList } from "./PaymentCards/PaymentBankCardsList";
import PaymentScoreList from "./PaymentCards/PaymentScoreList";

export const PaymentsPage = () => {
	return (
		<PersonalAccountPaymentLayout>
			<div className="personal-account_head d-flex align-items-end justify-content-between">
				<PersonalAccountData data={userData} />
				<PersonalAccountBalance />
			</div>
			<PaymentCardsList />
			<PaymentScoreList />
		</PersonalAccountPaymentLayout>
	);
};
