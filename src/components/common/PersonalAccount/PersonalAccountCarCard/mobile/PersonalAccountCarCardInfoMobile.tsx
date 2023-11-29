import React from "react";
import CarImage from "../../../../../images/index/car.webp";
import { RentHistoryDataCarType } from "../../../../../types/PersonalAccount/RentHistoryTypes";
const PersonalAccountCarCardInfoMobile = ({
	car,
	payment_date,
}: {
	car: RentHistoryDataCarType;
	payment_date: string;
}) => {
	return (
		<div className="personal-account-rent-car_mobile-info">
			<div className="personal-account-rent-car_mobile-info_image">
				<img src={car.image} alt={car.brand + " " + car.model} />
			</div>
			<div className="personal-account-rent-car_mobile-info_body">
				<p className="personal-account-rent-car_mobile-info_body-date">
					Дата бронирования: {car.booking_date}
				</p>
				<h3 className="personal-account-rent-car_mobile-info_body-carname">
					{car.brand} <span>{car.model}</span>
				</h3>
				<h5 className="personal-account-rent-car_mobile-info_body-seria">
					{car.seria}
				</h5>
				<div className="personal-account-rent-car_mobile-info_body-price">
					<div>Аренда</div>
					<p>
						<span>{car.payment.toLocaleString()} ₽</span> / день
					</p>
				</div>
				<p className="personal-account-rent-car_mobile-info_body-payment-date">
					Оплата: <span>ежедневно до {payment_date} </span>
				</p>
				<p className="personal-account-rent-car_mobile-info_body-deposit">
					Депозит: <span>{car.deposit.toLocaleString()} ₽</span>
				</p>
			</div>
		</div>
	);
};

export default PersonalAccountCarCardInfoMobile;
