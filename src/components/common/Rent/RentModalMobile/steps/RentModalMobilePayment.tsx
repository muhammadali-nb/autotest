import React, { useState } from "react";
import { CarRentPaymentButton } from "../../../CarRentForm";
import bankCardImg from "../../../../../img/common/bank-card.png";
import sbpImg from "../../../../../img/common/sbp.png";
import { CarDataType } from "../../../../../types/RentTypes";

const RentModalMobilePayment = ({ car }: { car: CarDataType }) => {
	const [payment, setPayment] = useState("");
	const [passed, setPassed] = useState(false);
	const [error, setError] = useState("");
	const [redButton, setRedButton] = useState(false);
	const update = (ptype) => {
		setRedButton(false);
		setPayment(ptype);
		setPassed(true);
		setError("");
	};
	return (
		<div className="mobile-modal_body-payment">
			<p className="mobile-modal_body-payment_price">
				К оплате: {car.rentpay}₽
			</p>
			<div
				className={
					"d-flex flex-column w-100 gap-y-px-15 mobile-modal_body-payment_types  "
				}>
				<CarRentPaymentButton
					payment={payment}
					error={redButton}
					image={sbpImg}
					text={"СБП"}
					code={"sbp"}
					setPayment={update}
				/>
				<CarRentPaymentButton
					payment={payment}
					error={redButton}
					image={bankCardImg}
					text={"Банковская карта"}
					code={"card"}
					setPayment={update}
				/>
			</div>
			<p className="mobile-modal_body-payment_offert">
				Выбирая способ оплаты, вы соглашаетесь с <span>Условиями оферты</span>
			</p>
		</div>
	);
};

export default RentModalMobilePayment;
