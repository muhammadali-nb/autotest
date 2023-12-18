import React from "react";
import CarImage from "../../../../../images/index/car.webp";

const PersonalAccountLeasingCarCardPadInfoDeal = () => {
	return (
		<div className="personal-account-leasing-car_card-info_deal">
			<p className="personal-account-leasing-car_card-info_date">
				Дата бронирования: <br /> 16.06.2023
			</p>
			<p className="personal-account-leasing-car_card-info_number">
				Номер договора: <br /> 00000000000000
			</p>
			<p className="personal-account-leasing-car_card-info_kasko">
				КАСКО: 0000000 до <span>00.00.0000</span>
			</p>
			<p className="personal-account-leasing-car_card-info_osago">
				ОСАГО: 0000000 до <span>00.00.0000</span>
			</p>
		</div>
	);
};

const PersonalAccountLeasingCarCardPadPaymentStatus = ({
	className,
}: {
	className?: string;
}) => {
	return (
		<div
			className={
				"personal-account-leasing-car_card-payment-status " + (className ?? "")
			}>
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M0.333374 15.0007C0.333374 6.90048 6.89986 0.333984 15 0.333984C23.1002 0.333984 29.6667 6.90048 29.6667 15.0007C29.6667 23.1008 23.1002 29.6673 15 29.6673C6.89986 29.6673 0.333374 23.1008 0.333374 15.0007Z"
						fill="#008F4B"
					/>
					<path
						d="M10.1302 15.316L13.4781 18.478L19.8694 11.5215"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<div className="personal-account-leasing-car_card-payment-status_body ms-px-15">
				<h4>Оплачено</h4>
				<p>Следующий платеж: 12.07.2023 до 00:00</p>
				<span>
					Рекомендуем вносить платежи заранее, <br /> во избежание просрочек
				</span>
			</div>
		</div>
	);
};

const PersonalAccountLeasingCarCardPadInfo = () => {
	return (
		<div>
			<div className="personal-account-leasing-car_card-info">
				<div className="personal-account-leasing-car_card-info_image">
					<img src={CarImage} alt="" />
				</div>
				<div>
					<h1 className="personal-account-leasing-car_card-info_brand">
						Kia{" "}
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
					<div className="personal-account-leasing-car_card-payment-status_body">
						{/* <h4>Оплачено</h4> */}
						<p>Следующий платеж: 12.07.2023 до 00:00</p>
						{/* <span>Рекомендуем вносить платежи заранее, во избежание просрочек</span> */}
					</div>
					<button className="site-btn">Оплатить сейчас</button>
				</div>
			</div>
			<div className="d-flex align-items-streach mt-px-15">
				<PersonalAccountLeasingCarCardPadInfoDeal />
				<PersonalAccountLeasingCarCardPadPaymentStatus className="ms-px-15" />
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarCardPadInfo;
