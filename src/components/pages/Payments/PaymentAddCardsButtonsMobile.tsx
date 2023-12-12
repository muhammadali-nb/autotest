import React from "react";
interface IProps {
	className?: string;
}
const PaymentAddCardsButtonsMobile = (props: IProps) => {
	const { className } = props;
	return (
		<div
			className={
				"personal-account-payments_mobile-add-card " + (className ?? "")
			}>
			<button className="site-btn">Добавить Карту</button>
			<button className="site-btn">Добавить Счёт</button>
		</div>
	);
};

export default PaymentAddCardsButtonsMobile;
