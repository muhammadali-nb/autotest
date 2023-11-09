import React from "react";
import success from "../../../../img/personal-account/rent-history/success.svg";
import CarImage from "../../../../img/index/car.webp";

const PersonalAccountCarCard = () => {
	return (
		<div className="personal-account-rent-car">
			<div className="personal-account-rent-car_card">
				<div className="personal-account-rent-car_card_image">
					<img src={CarImage} alt="" />
				</div>
				<div>
					<p className="personal-account-rent-car_card_date">
						Дата бронирования: 16.06.2023
					</p>
					<h1 className="personal-account-rent-car_card_brand">
						Hyundai{" "}
						<span className="personal-account-rent-car_card_brand-model">
							Sonata
						</span>
					</h1>
					<h4 className="personal-account-rent-car_card_number">К638ЕТ 53</h4>
					<div className="personal-account-rent-car_card_price">
						<p>Аренда</p>
						<span>6 950 ₽</span>/ день
					</div>
					<h4 className="personal-account-rent-car_card_deposit">
						{" "}
						Депозит от{" "}
						<span className="personal-account-rent-car_card_deposit-value">
							618 950 ₽
						</span>
					</h4>
				</div>
			</div>

			<div className="personal-account-rent-car_payment">
				<div className="personal-account-rent-car_payment-card">
					<div className="personal-account-rent-car_payment-card_header">
						<h4 className="personal-account-rent-car_payment-card_price">
							6 950 ₽
						</h4>
						<p className="personal-account-rent-car_payment-card_btn">
							Оплатить сейчас
						</p>
					</div>
					<p className="personal-account-rent-car_payment-card_date">
						Оплата: ежедневно до 00:00
					</p>
				</div>
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
			</div>
		</div>
	);
};

export default PersonalAccountCarCard;
