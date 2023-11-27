import React from "react";
import CarImage from "../../../../../images/index/car.webp";
const PersonalAccountCarCardInfo = () => {
	return (
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
	);
};

export default PersonalAccountCarCardInfo;
