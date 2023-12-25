import React from "react";
import { TypePaymentTableRow } from "../../../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	type: "header" | "row";
	className?: string;
	data?: TypePaymentTableRow;
}
const PesosonalAccountLeasingPaymentsRow = (props: IProps) => {
	const { type, className, data } = props;
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
				<div>{data?.date}</div>
				<div>{data?.type}</div>
				<div>{data?.price}</div>
				<div className="success">Оплачен</div>
			</div>
		);
	}
};

export default PesosonalAccountLeasingPaymentsRow;
