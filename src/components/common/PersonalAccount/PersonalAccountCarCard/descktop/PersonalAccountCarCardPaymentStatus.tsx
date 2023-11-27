import React from "react";
import success from "../../../../../images/personal-account/rent-history/success.svg";

const PersonalAccountCarCardPaymentStatus = () => {
	return (
		<div className="personal-account-rent-car_payment-status">
			<div className="personal-account-rent-car_payment-status_icon">
				<img src={success} alt="success" />
			</div>
			<div>
				<h2 className="personal-account-rent-car_payment-status_name">
					Оплачено
				</h2>
				<p className="personal-account-rent-car_payment-status_date">
					Следующий платеж:
				</p>
				<p className="personal-account-rent-car_payment-status_date">
					00.00.0000 до 00:00
				</p>
			</div>
		</div>
	);
};

export default PersonalAccountCarCardPaymentStatus;
