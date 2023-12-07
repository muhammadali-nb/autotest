import React from "react";

interface IProps {
	type: "header" | "row";
	className?: string;
}

const PersonalAccountLeasingCarCardMobilePaymentsRow = (props: IProps) => {
	const { type, className } = props;
	if (type === "header") {
		return (
			<div className="personal-account-leasing-car_card_payments-table_body_row_header">
				<div>Дата</div>
				<div>Тип</div>
				<div>Сумма, ₽</div>
				<div>Статус</div>
			</div>
		);
	} else {
		return (
			<div
				className={`personal-account-leasing-car_card_payments-table_body_row ${
					className ?? " "
				}`}>
				<div>00.00.00</div>
				<div>Налог</div>
				<div>60 000</div>
				<div className="success">Оплатить</div>
			</div>
		);
	}
};

export default PersonalAccountLeasingCarCardMobilePaymentsRow;
