import React, { useEffect, useState } from "react";
import { TypeMaintenceTableRow } from "../../../../../../types/PersonalAccount/LeasingTypes";
interface IProps {
	type: "header" | "row";
	className?: string;
	data?: TypeMaintenceTableRow;
}
export const PersonalAccountLeasingMaintenanceRow = (props: IProps) => {
	const { type, className, data } = props;

	if (type === "header") {
		return (
			<div
				className={`personal-account-leasing-car_card_maintenace-table_body_row_header`}>
				<div>
					Пробег <span>км/ч</span>
				</div>
				<div>Сумма, ₽</div>
				<div>Статус</div>
			</div>
		);
	} else {
		return (
			<div
				className={`personal-account-leasing-car_card_maintenace-table_body_row ${
					className ?? " "
				}`}>
				<div>{data?.mileage}</div>
				<div>{data?.price}</div>
				<div className="success">
					{data?.status === "passed" ? "Пройден" : "Не пройден"}
				</div>
			</div>
		);
	}
};
