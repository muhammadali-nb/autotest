import React, { useState } from "react";
import { CarRentPaymentButton } from "../../../CarRentForm";
import bankCardImg from "../../../../../images/common/bank-card.png";
import sbpImg from "../../../../../images/common/sbp.png";
import { CarDataType } from "../../../../../types/RentTypes";
import { ConfirmPhone } from "../../../../../Api";
import { ConfirmPaymentQR } from "../../../../../types/AuthContextTypes";
import axios from "axios";

const pay_koef = {
	// процеты оплаты
	card: 0.97,
	sbp: 0.99,
};

const RentModalMobilePayment = (props: {
	data: ConfirmPhone | any;
	setStep: (string) => void;
	car: CarDataType;
	deposit: number;
	setConfirmPayment: (e: ConfirmPaymentQR) => void;
	setDeposit: (e: number) => void;
}) => {
	const [payment, setPayment] = useState("");
	const [passed, setPassed] = useState(false);
	const [redButton, setRedButton] = useState(false);
	const [error, setError] = useState("");
	const [cardPrice] = useState(
		parseFloat((props.deposit / pay_koef.card).toFixed(2))
	);
	const [sbpPrice] = useState(
		parseFloat((props.deposit / pay_koef.sbp).toFixed(2))
	);

	const send = async () => {
		if (payment === "") {
			setError("Выберите способ оплаты");
			setPassed(false);
			setRedButton(true);
			return;
		}
		setRedButton(false);
		try {
			const res = await axios.get(
				`https://taxivoshod.ru/api/voshod-auto/?w=pay&summ=${
					payment === "sbp" ? sbpPrice : cardPrice
				}&payment=${payment === "card" ? "classic" : "sbp"}&car=${
					props.car.id
				}`,
				{ withCredentials: true }
			);

			if (res.data.result === 1) {
				if (payment === "sbp") {
					props.setConfirmPayment({ qr: res.data.qr, pid: res.data.pid });
					props.setStep("confirm_payment");
				} else if (payment === "card") {
					window.location.replace(res.data.redirect);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
	const update = (ptype) => {
		if (ptype === "sbp") {
			props.setDeposit(sbpPrice);
		} else if (ptype === "card") {
			props.setDeposit(cardPrice);
		}
		setPayment(ptype);
		setRedButton(false);
		setPassed(true);
		setError("");
	};

	return (
		<div className="mobile-modal_body-payment">
			<p className="mobile-modal_body-payment_price">
				К оплате: {props.deposit}₽
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
			<div className={"my-2 text-red-color font-size-12"}>
				{error || <>&nbsp;</>}
			</div>
			<button
				className={
					"site-btn small mt-px-50 " +
					(!passed ? "dark" : "") +
					" mobile-modal_body-confirm_submit-send"
				}
				onClick={send}>
				Перейти к оплате
			</button>
		</div>
	);
};

export default RentModalMobilePayment;
