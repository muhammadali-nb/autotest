import React, { useEffect, useState } from "react";
interface IProps {
	type: "header" | "row";
	className?: string;
}
export const PersonalAccountLeasingMaintenanceRow = (props: IProps) => {
	const { type, className } = props;
	
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
				<div>300 000</div>
				<div>60 000</div>
				<div className="success">Пройден</div>
			</div>
		);
	}
};
