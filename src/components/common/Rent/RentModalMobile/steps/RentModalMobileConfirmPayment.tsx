import React, { FC, useEffect } from "react";
import { ConfirmPhone } from "../../../../../Api";
import { CarBookingStepsType } from "../../../CarRentForm";
import {
	CarDataType,
	RentBookingPaymentStatus,
} from "../../../../../types/RentTypes";
import { ConfirmPaymentQR } from "../../../../../types/AuthContextTypes";
import axios from "axios";

const RentModalMobileConfirmPayment: FC<{
	data: ConfirmPhone | any;
	setStep: (e: CarBookingStepsType) => void;
	step: CarBookingStepsType;
	car: CarDataType;
	deposit: number;
	setDeposit: (e: number) => void;
	confirmPayment: ConfirmPaymentQR;
	setPaymentStatus: (e: RentBookingPaymentStatus) => void;
	paymentStatus: RentBookingPaymentStatus;
	setCarName: (e: string) => void;
}> = (props) => {
	useEffect(() => {
		if (props.paymentStatus !== "CONFIRMED" || "REFUNDED" || "CANCELLED") {
			const interval = setInterval(() => {
				axios
					.get(`/voshod-auto/?w=check-pay&pid=${props.confirmPayment.pid}`)
					.then((res) => {
						if (res.data.result === 1) {
							props.setPaymentStatus(res.data.status);
							props.setCarName(res.data.car);
							if (
								res.data.status === "CONFIRMED" ||
								res.data.status === "REFUNDED" ||
								res.data.status === "CANCELLED"
							) {
								props.setStep("booking_result");
							}
						}
					})
					.catch((error) => {
						console.log(error);
						props.setPaymentStatus(null);
						props.setStep("payment");
					});
			}, 5000);
			return () => {
				clearInterval(interval); // stops interval
			};
		}
	}, [props.paymentStatus]);

	return (
		<div>
			<div>
				<div
					className={
						"text-default font-size-16 line-height-140 font-weight-semibold mb-px-5"
					}>
					К оплате:
				</div>
				<div
					className={
						"text-default font-size-26 line-height-140 font-weight-semibold"
					}>
					{props.deposit} ₽
				</div>
			</div>
			<div className={"d-flex justify-content-center w-100 mt-px-20"}>
				<img
					src={`data:image/svg+xml;utf8,${encodeURIComponent(
						props.confirmPayment.qr
					)}`}
					alt="Confirm payment"
					width={150}
					height={150}
				/>
			</div>
		</div>
	);
};

export default RentModalMobileConfirmPayment;
