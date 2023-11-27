import React from "react";

const PersonalAccountCarCardPayment = () => {
	return (
		<div className="personal-account-rent-car_payment-card">
			<div className="personal-account-rent-car_payment-card_header">
				<p className="personal-account-rent-car_payment-card_date">
					Оплата: ежедневно до 00:00
				</p>
				<h4 className="personal-account-rent-car_payment-card_price">
					6 950 ₽
				</h4>
			</div>
			<button className="site-btn personal-account-rent-car_payment-card_btn">
				Оплатить сейчас
			</button>
		</div>
	);
};

export default PersonalAccountCarCardPayment;
