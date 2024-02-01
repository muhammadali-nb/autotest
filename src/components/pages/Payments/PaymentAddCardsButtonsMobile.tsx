import React, { Dispatch } from "react";
interface IProps {
	className?: string;
	setAddBankCard: (e: boolean) => void;
	setAddScoreCard: (e: boolean) => void;
}
const PaymentAddCardsButtonsMobile = (props: IProps) => {
	const { className, setAddBankCard, setAddScoreCard } = props;
	return (
		<div
			className={
				"personal-account-payments_mobile-add-card " + (className ?? "")
			}>
			<button className="site-btn" onClick={() => setAddBankCard(true)}>
				Добавить Карту
			</button>
			<button className="site-btn" onClick={() => setAddScoreCard(true)}>
				Добавить Счёт
			</button>
		</div>
	);
};

export default PaymentAddCardsButtonsMobile;
