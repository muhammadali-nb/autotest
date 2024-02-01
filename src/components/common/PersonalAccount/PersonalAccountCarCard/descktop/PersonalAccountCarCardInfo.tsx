import React from "react";
import CarImage from "../../../../../images/index/car.webp";
import { RentHistoryDataCarType } from "../../../../../types/PersonalAccount/RentHistoryTypes";

const PersonalAccountCarCardInfo = ({
	car,
}: {
	car: RentHistoryDataCarType;
}) => {
	return (
		<div className="personal-account-rent-car_card">
			<div className="personal-account-rent-car_card_image">
				<img src={car.image} alt={car.brand + " " + car.model} />
			</div>
			<div>
				<p className="personal-account-rent-car_card_date">
					Дата бронирования: {car.booking_date}
				</p>
				<h1 className="personal-account-rent-car_card_brand">
					{car.brand}{" "}
					<span className="personal-account-rent-car_card_brand-model">
						{car.model}
					</span>
				</h1>
				<h4 className="personal-account-rent-car_card_number">{car.seria}</h4>
				<div className="personal-account-rent-car_card_price">
					<p>Аренда</p>
					<span>{car.payment.toLocaleString()} ₽</span>/ день
				</div>
				<h4 className="personal-account-rent-car_card_deposit">
					{" "}
					Депозит от{" "}
					<span className="personal-account-rent-car_card_deposit-value">
						{car.deposit.toLocaleString()} ₽
					</span>
				</h4>
			</div>
		</div>
	);
};

export default PersonalAccountCarCardInfo;
