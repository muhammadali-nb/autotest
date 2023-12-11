import React from "react";
import { PaymentCardEdit, PaymentCardMainButton } from "./PaymentBankCard";

const PaymentScoreCard = () => {
	return (
		<div className="personal-account-payments_score-card">
			<div className="personal-account-payments_score-card_header mb-px-10">
				<h1>Название счёта</h1>
				<div className="d-flex align-items-center ms-px-15">
					<PaymentCardEdit />
					<PaymentCardMainButton className="ms-px-10" />
				</div>
			</div>
			<ul className="personal-account-payments_score-card_info">
				<li>Название банка: СберБанк</li>
				<li>НДС: Нет</li>
				<li>Р/С: 0000 0000 0000 0000 0000</li>
				<li>К/С: 0000 0000 0000 0000 0000</li>
				<li>ИНН: 0 0 0 0 0 0 0 0 0 0</li>
				<li>КПП: 0 0 0 0 0 0 0 0 0 0</li>
			</ul>
		</div>
	);
};

export default PaymentScoreCard;
