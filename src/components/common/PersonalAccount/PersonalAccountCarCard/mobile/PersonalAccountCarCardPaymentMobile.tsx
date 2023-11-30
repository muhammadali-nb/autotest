import React from "react";

import successImage from "../../../../../images/personal-account/rent-history/card_statuses/success.svg";
import waitingImage from "../../../../../images/personal-account/rent-history/card_statuses/waiting.svg";

const PersonalAccountCardPaymentStatusSuccessMobile = () => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-success">
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					<img src={successImage} alt="" />
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Оплачено</h2>
					<h4>Следующий платеж: 00.00.0000 до 00:00</h4>
				</div>
			</div>
		</div>
	);
};
const PersonalAccountCardPaymentStatusWaitingMobile = () => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-waiting">
			<button className=" site-btn personal-account-rent-car_mobile-check_btn">
				Оплатить сейчас
			</button>
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					<img src={waitingImage} alt="" />
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Не оплачено</h2>
					<h4>
						Во избежание блокирвки автомобиля <br /> внесите платёж до:
					</h4>
					<p>00.00.0000 до 00:00</p>
				</div>
			</div>
		</div>
	);
};
const PersonalAccountCardPaymentStatusConfirmedMobile = () => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-confirmed">
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					<img src={successImage} alt="" />
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Оплачено</h2>
					<h4>Следующий платеж: 00.00.0000 до 00:00</h4>
				</div>
			</div>
			<button className="site-btn personal-account-rent-car_mobile-check_btn">
				Вывести
			</button>
		</div>
	);
};
const PersonalAccountCardPaymentStatusPayedMobile = () => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-payed">
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					<img src={successImage} alt="" />
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Оплачено</h2>
					<h4>Следующий платеж: 00.00.0000 до 00:00</h4>
				</div>
			</div>
			<button className="site-btn personal-account-rent-car_mobile-check_btn">
				Вывести
			</button>
		</div>
	);
};
const PersonalAccountCarCardPaymentMobile = () => {
	return (
		<div className="personal-account-rent-car_mobile-check">
			{/* <PersonalAccountCardPaymentStatusWaitingMobile /> */}
			{/* <PersonalAccountCardPaymentStatusSuccessMobile /> */}
			<PersonalAccountCardPaymentStatusConfirmedMobile />
		</div>
	);
};
export default PersonalAccountCarCardPaymentMobile;
