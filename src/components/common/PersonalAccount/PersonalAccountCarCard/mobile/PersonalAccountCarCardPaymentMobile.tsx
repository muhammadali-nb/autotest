import React from "react";

import successImage from "../../../../../images/personal-account/rent-history/card_statuses/success.svg";
import waitingImage from "../../../../../images/personal-account/rent-history/card_statuses/waiting.svg";
import { RentHistoryDataPaymentResult } from "../../../../../types/PersonalAccount/RentHistoryTypes";

const PersonalAccountCardPaymentStatusSuccessMobile = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-success">
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					<img src={successImage} alt="" />
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Оплачено</h2>
					<h4>
						Следующий платеж: <br /> <span>{status.next}</span>
					</h4>
					<p>Рекомендуем вносить платежи заранее, во избежание просрочек</p>
				</div>
			</div>
		</div>
	);
};
const PersonalAccountCardPaymentStatusWaitingMobile = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-waiting">
			<button className=" site-btn personal-account-rent-car_mobile-check_btn mb-px-15">
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
					<p>{status.next}</p>
				</div>
			</div>
		</div>
	);
};
const PersonalAccountCardPaymentStatusConfirmedMobile = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-confirmed">
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					<img src={successImage} alt="" />
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Оплачено</h2>
					<h4>Следующий платеж: {status.next}</h4>
				</div>
			</div>
			<button className="site-btn personal-account-rent-car_mobile-check_btn">
				Вывести
			</button>
		</div>
	);
};
const PersonalAccountCardPaymentStatusPayedMobile = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_mobile-check_status-payed">
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					<img src={successImage} alt="" />
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Оплачено</h2>
					<h4>Следующий платеж: {status.next}</h4>
				</div>
			</div>
			<button className="site-btn personal-account-rent-car_mobile-check_btn">
				Вывести
			</button>
		</div>
	);
};
const PersonalAccountCarCardPaymentMobile = () => {
	const payment_status = {
		status: "waiting",
		next: "10.18.2000",
	};
	const renderStatus = () => {
		if (payment_status.status === "success") {
			return (
				<PersonalAccountCardPaymentStatusSuccessMobile
					status={payment_status}
				/>
			);
		} else if (payment_status.status === "waiting") {
			return (
				<PersonalAccountCardPaymentStatusWaitingMobile
					status={payment_status}
				/>
			);
		} else if (payment_status.status === "confirmed") {
			return (
				<PersonalAccountCardPaymentStatusConfirmedMobile
					status={payment_status}
				/>
			);
		} else {
			return (
				<PersonalAccountCardPaymentStatusPayedMobile status={payment_status} />
			);
		}
	};

	return (
		<div className="personal-account-rent-car_mobile-check">
			{renderStatus()}
		</div>
	);
};
export default PersonalAccountCarCardPaymentMobile;
