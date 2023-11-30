import React from "react";
import { RentHistoryDataPaymentPerDay } from "../../../../../types/PersonalAccount/RentHistoryTypes";

const PersonalAccountCarCardPayment = ({
	payment,
}: {
	payment: RentHistoryDataPaymentPerDay;
}) => {
	return (
		<div className="personal-account-rent-car_payment-card">
			{payment.status === "confirmed" ? (
				<>
					<div className="personal-account-rent-car_payment-card_header-confirmed">
						<h4>Аренда завершена</h4>
						<p>
							Дата сдачи автомобиля: <br /> {payment.time}
						</p>
					</div>
				</>
			) : (
				<div>
					<div className="personal-account-rent-car_payment-card_header">
						<p className="personal-account-rent-car_payment-card_date">
							Оплата: ежедневно до {payment.time}
						</p>
						<h4 className="personal-account-rent-car_payment-card_price">
							{payment.price.toLocaleString()} ₽
						</h4>
					</div>
					<button className="site-btn personal-account-rent-car_payment-card_btn">
						Оплатить сейчас
					</button>
				</div>
			)}
		</div>
	);
};

export default PersonalAccountCarCardPayment;
