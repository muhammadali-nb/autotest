import React from "react";
import CarImage from "../../../../../images/index/car.webp";
const PersonalAccountCarCardInfoMobile = () => {
	return (
		<div className="personal-account-rent-car_mobile-info">
			<div className="personal-account-rent-car_mobile-info_image">
				<img src={CarImage} alt="" />
			</div>
			<div className="personal-account-rent-car_mobile-info_body">
				<p className="personal-account-rent-car_mobile-info_body-date">
					Дата бронирования: 16.06.2023
				</p>
				<h3 className="personal-account-rent-car_mobile-info_body-carname">
					Hyundai <span>Sonata</span>
				</h3>
				<h5 className="personal-account-rent-car_mobile-info_body-seria">
					К638ЕТ 53
				</h5>
				<div className="personal-account-rent-car_mobile-info_body-price">
					<div>Аренда</div>
					<p>
						<span>6 950 ₽</span> / день
					</p>
				</div>
				<p className="personal-account-rent-car_mobile-info_body-payment-date">
					Оплата: <span>ежедневно до 00:00</span>
				</p>
				<p className="personal-account-rent-car_mobile-info_body-deposit">
					Депозит: <span>618 950 ₽</span>
				</p>
			</div>
		</div>
	);
};

export default PersonalAccountCarCardInfoMobile;
