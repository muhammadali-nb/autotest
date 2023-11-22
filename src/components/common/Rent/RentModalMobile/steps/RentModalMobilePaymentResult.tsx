import React, { FC } from "react";
import {
	CarDataType,
	RentBookingPaymentStatus,
} from "../../../../../types/RentTypes";

const RentModalMobilePaymentResult: FC<{
	paymentStatus: RentBookingPaymentStatus;
	closeFunc: () => void;
	car: CarDataType;
}> = (props) => {
	return (
		<div className="pt-px-20">
			<div>
				{props.paymentStatus === "CONFIRMED" ? (
					<>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 60 60"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M0.667969 29.9998C0.667969 13.7995 13.801 0.666504 30.0013 0.666504C46.2017 0.666504 59.3346 13.7995 59.3346 29.9998C59.3346 46.2002 46.2017 59.3332 30.0013 59.3332C13.801 59.3332 0.667969 46.2002 0.667969 29.9998Z"
								fill="#008F4B"
							/>
							<path
								d="M20.2617 30.6319L26.9574 36.956L39.74 23.043"
								stroke="white"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className={"call-content-text-header mt-px-30"}>
							Оплата <br />
							прошла успешно!
						</div>
						<div className={"call-content-text"}>
							{props.car.brand} {props.car.model} — забронирован!
						</div>
					</>
				) : (
					<>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 60 60"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M30.0013 0.666504C13.801 0.666504 0.667969 13.7995 0.667969 29.9998C0.667969 46.2002 13.801 59.3332 30.0013 59.3332C46.2017 59.3332 59.3346 46.2002 59.3346 29.9998C59.3346 13.7995 46.2017 0.666504 30.0013 0.666504ZM23.4155 20.5856C22.6345 19.8046 21.3681 19.8046 20.5871 20.5856C19.806 21.3667 19.806 22.633 20.5871 23.4141L27.1729 29.9998L20.5871 36.5856C19.806 37.3667 19.806 38.633 20.5871 39.4141C21.3681 40.1951 22.6345 40.1951 23.4155 39.4141L30.0013 32.8283L36.5871 39.4141C37.3681 40.1951 38.6345 40.1951 39.4155 39.4141C40.1966 38.633 40.1966 37.3667 39.4155 36.5856L32.8297 29.9998L39.4155 23.4141C40.1966 22.633 40.1966 21.3667 39.4155 20.5856C38.6345 19.8046 37.3681 19.8046 36.5871 20.5856L30.0013 27.1714L23.4155 20.5856Z"
								fill="#BF3535"
							/>
						</svg>
						<div className={"call-content-text-header mt-px-10"}>
							Оплата <br /> была прервана
						</div>
						<div className={"call-content-text"}>
							{props.paymentStatus === "REFUNDED"
								? "Cредства возвращены"
								: props.car.brand + " " + props.car.model}
						</div>
					</>
				)}
			</div>
			<div>
				<button className={"site-btn small mt-px-70"} onClick={props.closeFunc}>
					Закрыть
				</button>
			</div>
		</div>
	);
};

export default RentModalMobilePaymentResult;
