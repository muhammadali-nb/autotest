import React from "react";
import PersonalAccountPaymentLayout from "../../layout/PersonalAccountLayout/PersonalAccountPaymentLayout";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import { userData } from "../PersonalAccount/PersonalAccountPage";
import PersonalAccountData from "../PersonalAccount/PersonalAccountData";
import { PaymentCardsList } from "./PaymentCards/PaymentBankCardsList";
import PaymentScoreList from "./PaymentCards/PaymentScoreList";
import PaymentCardsTabs from "./PaymentCardsTabs";
import PaymentsLoader from "./PaymentsLoader";

const data = {
	paymentCards: [
		{
			id: 1,
			number: "8000 9999 9999 0000",
			name: "",
			favorite: true,
			main: true,
		},
		{
			id: 2,
			number: "7700 9999 7670 7100",
			name: "",
			favorite: true,
			main: false,
		},
		{
			id: 3,
			number: "7700 9999 7670 7100",
			name: "",
			favorite: true,
			main: false,
		},
		{
			id: 4,
			number: "7700 9999 7670 7100",
			name: "",
			favorite: true,
			main: false,
		},
		{
			id: 5,
			number: "7700 9999 7670 7100",
			name: "",
			favorite: true,
			main: false,
		},
		{
			id: 6,
			number: "7700 9999 7670 7100",
			name: "",
			favorite: true,
			main: false,
		},
	],
	scoreCards: [
		{
			id: 1,
			name: "",
			favorite: true,
			main: true,
			bank_name: "СберБанк",
			nds: true,
			checking_account: "4444 7777 0000 1000 1111",
			correspondent_account: "9999 1141 0000 0000 3310",
			taxpayer_identification_number: "0 0 0 0 0 0 0 0 0 0",
			tax_registration_reason_code: "0 0 0 0 0 0 0 0 0 0",
		},
		{
			id: 2,
			name: "",
			favorite: true,
			main: false,
			bank_name: "СберБанк",
			nds: true,
			checking_account: "4444 7777 0000 1000 1111",
			correspondent_account: "9999 1141 0000 0000 3310",
			taxpayer_identification_number: "0 0 0 0 0 0 0 0 0 0",
			tax_registration_reason_code: "0 0 0 0 0 0 0 0 0 0",
		},
		{
			id: 3,
			name: "",
			favorite: true,
			main: false,
			bank_name: "СберБанк",
			nds: true,
			checking_account: "4444 7777 0000 1000 1111",
			correspondent_account: "9999 1141 0000 0000 3310",
			taxpayer_identification_number: "0 0 0 0 0 0 0 0 0 0",
			tax_registration_reason_code: "0 0 0 0 0 0 0 0 0 0",
		},
		{
			id: 4,
			name: "",
			favorite: true,
			main: false,
			bank_name: "СберБанк",
			nds: true,
			checking_account: "4444 7777 0000 1000 1111",
			correspondent_account: "9999 1141 0000 0000 3310",
			taxpayer_identification_number: "0 0 0 0 0 0 0 0 0 0",
			tax_registration_reason_code: "0 0 0 0 0 0 0 0 0 0",
		},
	],
};

export const PaymentsPage = () => {
	const isLoading = false;
	return (
		<PersonalAccountPaymentLayout>
			<div className="personal-account_head d-flex align-items-end justify-content-between mt-px-md-15 border-0">
				<PersonalAccountData data={userData} />
				<PersonalAccountBalance />
			</div>
			{isLoading ? (
				<PaymentsLoader />
			) : (
				<>
					<div className="d-none d-md-block">
						<PaymentCardsList data={data.paymentCards} />
						<PaymentScoreList data={data.scoreCards} />
					</div>
					<div className=" d-block d-md-none">
						<PaymentCardsTabs
							bankList={<PaymentCardsList data={data.paymentCards} />}
							scoreList={<PaymentScoreList data={data.scoreCards} />}
						/>
					</div>
				</>
			)}
		</PersonalAccountPaymentLayout>
	);
};
