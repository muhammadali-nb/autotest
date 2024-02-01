import React, { useEffect } from "react";

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="27"
						viewBox="0 0 26 27"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0.166016 13.5013C0.166016 6.41365 5.9117 0.667969 12.9993 0.667969C20.087 0.667969 25.8327 6.41365 25.8327 13.5013C25.8327 20.589 20.087 26.3346 12.9993 26.3346C5.9117 26.3346 0.166016 20.589 0.166016 13.5013Z"
							fill="#008F4B"
						/>
						<path
							d="M8.73828 13.7772L11.6676 16.544L17.26 10.457"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h2>Оплачено</h2>
					<h4>
						Следующий платеж: <span>{status.next}</span>
					</h4>
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
			{/* <button className=" site-btn personal-account-rent-car_mobile-check_btn mb-px-15">
				Оплатить сейчас
			</button> */}
			<div className="personal-account-rent-car_mobile-check_result">
				<div className="personal-account-rent-car_mobile-check_result-image">
					{/* <img src={waitingImage} alt="" /> */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="27"
						viewBox="0 0 26 27"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M12.9993 0.667969C5.9117 0.667969 0.166016 6.41365 0.166016 13.5013C0.166016 20.589 5.9117 26.3346 12.9993 26.3346C20.087 26.3346 25.8327 20.589 25.8327 13.5013C25.8327 6.41365 20.087 0.667969 12.9993 0.667969ZM13.9993 8.2513C13.9993 7.69902 13.5516 7.2513 12.9993 7.2513C12.4471 7.2513 11.9993 7.69902 11.9993 8.2513V13.5013C11.9993 13.8357 12.1664 14.1479 12.4446 14.3334L15.9446 16.6667C16.4042 16.973 17.025 16.8489 17.3314 16.3893C17.6378 15.9298 17.5136 15.3089 17.054 15.0026L13.9993 12.9661V8.2513Z"
							fill="#E19F52"
						/>
					</svg>
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h4>Доступно для вывода:</h4>
					<h2>{status.price?.toLocaleString()} ₽</h2>

					<p>Вывод c {status.next}</p>
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="27"
						viewBox="0 0 26 27"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0.166016 13.5013C0.166016 6.41365 5.9117 0.667969 12.9993 0.667969C20.087 0.667969 25.8327 6.41365 25.8327 13.5013C25.8327 20.589 20.087 26.3346 12.9993 26.3346C5.9117 26.3346 0.166016 20.589 0.166016 13.5013Z"
							fill="#BABCBF"
						/>
						<path
							d="M8.73828 13.7772L11.6676 16.544L17.26 10.457"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h4>Доступно для вывода:</h4>
					<h2>{status.price?.toLocaleString()} ₽</h2>
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="27"
						viewBox="0 0 26 27"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0.166016 13.5013C0.166016 6.41365 5.9117 0.667969 12.9993 0.667969C20.087 0.667969 25.8327 6.41365 25.8327 13.5013C25.8327 20.589 20.087 26.3346 12.9993 26.3346C5.9117 26.3346 0.166016 20.589 0.166016 13.5013Z"
							fill="#008F4B"
						/>
						<path
							d="M8.73828 13.7772L11.6676 16.544L17.26 10.457"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div className="personal-account-rent-car_mobile-check_result-data">
					<h4>Доступно для вывода:</h4>
					<h2>{status.price?.toLocaleString()} ₽</h2>
				</div>
			</div>
			<button className="site-btn dark personal-account-rent-car_mobile-check_btn mt-px-15">
				Вывести
			</button>
		</div>
	);
};
const PersonalAccountCarCardPaymentMobile = ({
	payment_status,
}: {
	payment_status: RentHistoryDataPaymentResult;
}) => {
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
