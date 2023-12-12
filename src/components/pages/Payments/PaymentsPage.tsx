import React from "react";
import PersonalAccountPaymentLayout from "../../layout/PersonalAccountLayout/PersonalAccountPaymentLayout";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import { userData } from "../PersonalAccount/PersonalAccountPage";
import PersonalAccountData from "../PersonalAccount/PersonalAccountData";
import { PaymentCardsList } from "./PaymentCards/PaymentBankCardsList";
import PaymentScoreList from "./PaymentCards/PaymentScoreList";
import PaymentCardsTabs from "./PaymentCardsTabs";

export const PaymentsPage = () => {
	return (
		<PersonalAccountPaymentLayout>
			<div className="personal-account_head d-flex align-items-end justify-content-between border-0">
				<PersonalAccountData data={userData} />
				<PersonalAccountBalance />
			</div>
			<div className="d-none d-md-block">
				<PaymentCardsList />
				<PaymentScoreList />
			</div>
			<div className=" d-block d-md-none">
				<PaymentCardsTabs
					bankList={<PaymentCardsList />}
					scoreList={<PaymentScoreList />}
				/>
			</div>
		</PersonalAccountPaymentLayout>
	);
};
