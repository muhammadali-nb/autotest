import React, { useState } from "react";
import { PaymentCardEdit, PaymentCardMainButton } from "./PaymentBankCard";
import { PaymentScoreCardType } from "../../../../types/PersonalAccount/PaymentsTypes";

interface IProps {
	card: PaymentScoreCardType;
}

const PaymentScoreCard = (props: IProps) => {
	const { card } = props;
	const [active, setActive] = useState(card.main);
	return (
		<div
			className={
				"personal-account-payments_score-card " + (card.main ? "main " : "")
			}>
			<div className="personal-account-payments_score-card_header mb-px-10">
				<h1>{card.name.length > 0 ? card.name : "Название счёта"}</h1>
				<div className="d-flex align-items-center ms-px-15">
					<PaymentCardEdit />
					<PaymentCardMainButton
						active={active}
						setActive={setActive}
						className="ms-px-10"
					/>
				</div>
			</div>
			<ul className="personal-account-payments_score-card_info">
				<li>Название банка: {card.bank_name}</li>
				<li>НДС: {card.nds}</li>
				<li>Р/С: {card.checking_account}</li>
				<li>К/С: {card.correspondent_account}</li>
				<li>ИНН: {card.taxpayer_identification_number}</li>
				<li>КПП: {card.tax_registration_reason_code}</li>
			</ul>
		</div>
	);
};

export default PaymentScoreCard;
