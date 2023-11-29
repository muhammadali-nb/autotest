import React from "react";
import success from "../../../../../images/personal-account/rent-history/success.svg";
import { RentHistoryDataPaymentResult } from "../../../../../types/PersonalAccount/RentHistoryTypes";

const PersonalAccountCarCardPaymentStatusWaiting = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_payment-status-waiting">
			<h4 className="personal-account-rent-car_payment-status-waiting_title">
				Доступно для вывода
			</h4>
			<h2 className="personal-account-rent-car_payment-status-waiting_price">
				{status.price?.toLocaleString()} ₽
			</h2>
			<p className="personal-account-rent-car_payment-status-waiting_date">
				Вывод с: {status.next}
			</p>
		</div>
	);
};

const PersonalAccountCarCardPaymentStatusSuccess = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_payment-status-success">
			<div className="personal-account-rent-car_payment-status-success_icon">
				<img src={success} alt="success" />
			</div>
			<div>
				<h2 className="personal-account-rent-car_payment-status-success_name">
					Оплачено
				</h2>
				<p className="personal-account-rent-car_payment-status-success_date">
					Следующий платеж:
				</p>
				<p className="personal-account-rent-car_payment-status-success_date">
					{status.next}
				</p>
			</div>
		</div>
	);
};

const PersonalAccountCarCardPaymentStatusConfirmed = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_payment-status-confirmed">
			<h2 className="personal-account-rent-car_payment-status-confirmed_header">
				Доступно для вывода: {status.price?.toLocaleString()} ₽
			</h2>
			<p className="personal-account-rent-car_payment-status-confirmed_date">
				Вывод с: {status.next}
			</p>
			<button className=" site-btn personal-account-rent-car_payment-status-confirmed_btn">
				Вывести
			</button>
		</div>
	);
};

const PersonalAccountCarCardPaymentStatusPayed = ({
	status,
}: {
	status: RentHistoryDataPaymentResult;
}) => {
	return (
		<div className="personal-account-rent-car_payment-status-payed">
			<h2 className="personal-account-rent-car_payment-status-payed_header">
				Доступно для вывода: {status.price?.toLocaleString()} ₽
			</h2>
			<p className="personal-account-rent-car_payment-status-payed_date">
				Вывод с: {status.next}
			</p>
			<button className=" site-btn personal-account-rent-car_payment-status-payed_btn">
				Вывести
			</button>
		</div>
	);
};

const PersonalAccountCarCardPaymentStatus = ({
	payment_status,
}: {
	payment_status: RentHistoryDataPaymentResult;
}) => {
	const renderStatus = () => {
		if (payment_status.status === "success") {
			return (
				<PersonalAccountCarCardPaymentStatusSuccess status={payment_status} />
			);
		} else if (payment_status.status === "waiting") {
			return (
				<PersonalAccountCarCardPaymentStatusWaiting status={payment_status} />
			);
		} else if (payment_status.status === "confirmed") {
			return (
				<PersonalAccountCarCardPaymentStatusConfirmed status={payment_status} />
			);
		} else {
			return (
				<PersonalAccountCarCardPaymentStatusPayed status={payment_status} />
			);
		}
	};

	return (
		<div className="personal-account-rent-car_payment-status">
			{renderStatus()}
		</div>
	);
};

export default PersonalAccountCarCardPaymentStatus;
