import React, { FC } from "react";
import PersonalAccountCarCardInfo from "../../../../../common/PersonalAccount/PersonalAccountCarCard/descktop/PersonalAccountCarCardInfo";
import PersonalAccountCarCardPayment from "../../../../../common/PersonalAccount/PersonalAccountCarCard/descktop/PersonalAccountCarCardPayment";
import PersonalAccountCarCardPaymentStatus from "../../../../../common/PersonalAccount/PersonalAccountCarCard/descktop/PersonalAccountCarCardPaymentStatus";
import carImage from "../../../../../../images/index/car.webp";
const PersonalAccountLeasingCarCardInfo = (props) => {
	return (
		<div className="personal-account-leasing-car_card-info">
			<div className="personal-account-leasing-car_card-info_image">
				<img src={carImage} alt={""} />
			</div>
			<div>
				<p className="personal-account-leasing-car_card-info_date">
					Дата бронирования: 16.06.2023
				</p>
				<p className="personal-account-leasing-car_card-info_number">
					Номер договора: 00000000000000
				</p>
				<h1 className="personal-account-leasing-car_card-info_brand">
					Kia
					<span className="personal-account-leasing-car_card-info_brand-model">
						k5
					</span>
				</h1>
				<h4 className="personal-account-leasing-car_card-info_seria">
					К638ЕТ 53
				</h4>

				<div className="personal-account-leasing-car_card-info_price">
					<p>Ежемесячный платёж</p>
					<span>6 950 ₽</span>
				</div>
				<p className="personal-account-leasing-car_card-info_kasko">
					КАСКО: 0000000 до <span>00.00.0000</span>
				</p>
				<p className="personal-account-leasing-car_card-info_osago">
					ОСАГО: 0000000 до <span>00.00.0000</span>
				</p>
			</div>
		</div>
	);
};

const PersonalAccountLeasingCarCardPayment = () => {
	return (
		<div className="personal-account-leasing-car_card-payment-result">
			<div className="personal-account-leasing-car_card-payment-result_header">
				<h3>40 000 ₽</h3>
				<div>Оплатить сейчас</div>
			</div>
			<p>Оплата: 12.06.2023 до 00:00</p>
		</div>
	);
};
const PersonalAccountLeasingCarCardPaymentStatus = () => {
	return (
		<div className="personal-account-leasing-car_card-payment-status">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.333374 15.0007C0.333374 6.90048 6.89986 0.333984 15 0.333984C23.1002 0.333984 29.6667 6.90048 29.6667 15.0007C29.6667 23.1008 23.1002 29.6673 15 29.6673C6.89986 29.6673 0.333374 23.1008 0.333374 15.0007Z"
						fill="#008F4B"
					/>
					<path
						d="M10.1302 15.316L13.4781 18.478L19.8694 11.5215"
						stroke="white"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div className="personal-account-leasing-car_card-payment-status_body">
				<h4>Оплачено</h4>
				<p>
					Следующий платеж: <br /> 12.07.2023 до 00:00
				</p>
				<span>Рекомендуем вносить платежи заранее, во избежание просрочек</span>
			</div>
		</div>
	);
};

const PersonalAccountLeasingCardCar: FC<{}> = (props) => {
	return (
		<div className="personal-account-rent-car d-none d-md-grid">
			<PersonalAccountLeasingCarCardInfo />
			<div className="personal-account-rent-car_payment">
				<PersonalAccountLeasingCarCardPayment />
				<PersonalAccountLeasingCarCardPaymentStatus />
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCardCar;
