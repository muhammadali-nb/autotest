import React, { useState } from "react";
import carImage from "../../../../../images/index/car.webp";
import rejectStatus from "../../../../../images/personal-account/card_statuses/rejected.svg";
import watingStatusBlack from "../../../../../images/personal-account/card_statuses/black/waiting-black.svg";
import PersonalAccountLeasingCarModalMaintenance from "./PersonalAccountLeasingCarModalMaintenance";
import PersonalAccountLeasingCarModalPayments from "./PersonalAccountLeasingCarModalPayments";
import { IPersonalAccountLeasingCarData } from "../../../../../types/PersonalAccount/LeasingTypes";
interface IProps {
	className?: string;
	car: IPersonalAccountLeasingCarData;
}

const PersonalAccountLeasingCarCardMobileStatus = (props: {
	statusType: "success" | "rejected" | "waiting" | "banned";
}) => {
	const { statusType } = props;

	if (statusType === "success") {
		return (
			<div
				className={
					"personal-account-leasing-car-mobile_payment-status success"
				}>
				<div className="personal-account-leasing-car-mobile_payment-status_img">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 26 26"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M0.167969 13.0013C0.167969 5.91365 5.91365 0.167969 13.0013 0.167969C20.089 0.167969 25.8346 5.91365 25.8346 13.0013C25.8346 20.089 20.089 25.8346 13.0013 25.8346C5.91365 25.8346 0.167969 20.089 0.167969 13.0013Z"
							fill="#008F4B"
						/>
						<path
							d="M8.74219 13.2772L11.6715 16.044L17.2639 9.95703"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				<div>
					<h1 className="personal-account-leasing-car-mobile_payment-status_title">
						Оплачено
					</h1>
					<h4 className="personal-account-leasing-car-mobile_payment-status_desc">
						Следующий платеж: <br />
						00.00.0000 до 00:00
					</h4>
					<p className="personal-account-leasing-car-mobile_payment-status_advice">
						Рекомендуем вносить платежи заранее, <br /> во избежание просрочек
					</p>
				</div>
			</div>
		);
	}

	if (statusType === "banned") {
		return (
			<div className={"personal-account-leasing-car-mobile_payment-status"}>
				<div className="personal-account-leasing-car-mobile_payment-status_img">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="27"
						viewBox="0 0 26 27"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13.0009 0.667969C5.91347 0.667969 0.167969 6.41347 0.167969 13.5009C0.167969 20.5883 5.91347 26.3338 13.0009 26.3338C20.0883 26.3338 25.8338 20.5883 25.8338 13.5009C25.8338 6.41347 20.0883 0.667969 13.0009 0.667969ZM14.0009 8.2513V7.2513H12.0009V8.2513V13.5011V14.5011H14.0009V13.5011V8.2513ZM14.0009 18.7507C14.0009 18.1984 13.5532 17.7507 13.0009 17.7507C12.4486 17.7507 12.0009 18.1984 12.0009 18.7507V19.334C12.0009 19.8863 12.4486 20.334 13.0009 20.334C13.5532 20.334 14.0009 19.8863 14.0009 19.334V18.7507Z"
							fill="#BF3535"
						/>
					</svg>
				</div>
				<div>
					<h1 className="personal-account-leasing-car-mobile_payment-status_title">
						Автомобиль <br /> заблокирован
					</h1>
					<h4 className="personal-account-leasing-car-mobile_payment-status_desc">
						Чтобы продолжить движение, <br /> внесите оплату
					</h4>
					<p className="personal-account-leasing-car-mobile_payment-status_advice">
						Рекомендуем вносить платежи заранее, <br /> во избежание просрочек
					</p>
				</div>
			</div>
		);
	}

	if (statusType === "waiting") {
		return (
			<div
				className={
					"personal-account-leasing-car-mobile_payment-status waiting"
				}>
				<div className="personal-account-leasing-car-mobile_payment-status_img">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="27"
						viewBox="0 0 26 27"
						fill="none">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13.0009 0.667969C5.91347 0.667969 0.167969 6.41347 0.167969 13.5009C0.167969 20.5883 5.91347 26.3338 13.0009 26.3338C20.0883 26.3338 25.8338 20.5883 25.8338 13.5009C25.8338 6.41347 20.0883 0.667969 13.0009 0.667969ZM14.0009 8.2513V7.2513H12.0009V8.2513V8.83463V9.83463H14.0009V8.83463V8.2513ZM14.0009 14.0842C14.0009 13.5319 13.5532 13.0842 13.0009 13.0842C12.4486 13.0842 12.0009 13.5319 12.0009 14.0842V19.334C12.0009 19.8863 12.4486 20.334 13.0009 20.334C13.5532 20.334 14.0009 19.8863 14.0009 19.334V14.0842Z"
							fill="#F5C257"
						/>
					</svg>
				</div>
				<div>
					<h1 className="personal-account-leasing-car-mobile_payment-status_title">
						Внесите оплату
					</h1>
					<h4 className="personal-account-leasing-car-mobile_payment-status_desc">
						Следующий платеж: через 3 дня <br /> 00.00.0000 до 00:00
					</h4>
					<p className="personal-account-leasing-car-mobile_payment-status_advice">
						Рекомендуем вносить платежи заранее, <br /> во избежание просрочек
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="personal-account-leasing-car-mobile_payment-status">
			<div className="personal-account-leasing-car-mobile_payment-status_img">
				<img src={rejectStatus} alt="Rejected" />
			</div>
			<div>
				<h1 className="personal-account-leasing-car-mobile_payment-status_title">
					Не оплачено
				</h1>
				<h4 className="personal-account-leasing-car-mobile_payment-status_desc">
					Во избежание блокирвки автомобиля, внесите платёж до: <br />
					20:34
				</h4>
				<p className="personal-account-leasing-car-mobile_payment-status_advice">
					Рекомендуем вносить платежи заранее, <br /> во избежание просрочек
				</p>
			</div>
		</div>
	);
};

const PersonalAccountLeasingCarCardMobile = (props: IProps) => {
	const { className, car } = props;
	const [maintenanceModal, setMaintenanceModal] = useState(false);
	const [paymentsModal, setPaymentsModal] = useState(false);
	return (
		<>
			<div
				className={
					"personal-account-leasing-car-mobile_card " + (className ?? "")
				}>
				<div className={"personal-account-leasing-car-mobile "}>
					<div className="personal-account-leasing-car-mobile_image">
						<img src={car.car.image} alt="" />
					</div>
					<h1 className="personal-account-leasing-car-mobile_name">
						{car.car.brand} <span>{car.car.model}</span>
					</h1>
					<h3 className="personal-account-leasing-car-mobile_regnum">
						{car.car.regnum}
					</h3>
					<div className="personal-account-leasing-car-mobile_deal">
						<p className="personal-account-leasing-car-mobile_deal-date">
							Дата первого платежа: {car.bank_accounts.deal_date}
						</p>
						<p className="personal-account-leasing-car-mobile_deal-number">
							Номер договора: {car.bank_accounts.deal_number}
						</p>
						<p className="personal-account-leasing-car-mobile_deal-kasgo">
							КАСКО: {car.bank_accounts.kasko.number}
						</p>
						<p className="personal-account-leasing-car-mobile_deal-osago">
							ОСАГО: {car.bank_accounts.osago.number}
						</p>
					</div>
					<div className="personal-account-leasing-car-mobile_payment">
						Ежемесячный платёж <br />
						<span>{car.car.payment} ₽</span>
					</div>
					<h5 className="personal-account-leasing-car-mobile_payment-date">
						Оплата:
						<span>{car.payment.date}</span>
					</h5>
					<div className="mb-px-15">
						<button className="site-btn big">Оплатить сейчас</button>
						<PersonalAccountLeasingCarCardMobileStatus statusType="waiting" />
						<div className="personal-account-leasing-car-mobile_payment-next">
							<div className="personal-account-leasing-car-mobile_payment-next_img">
								<img src={watingStatusBlack} alt="waiting" />
							</div>
							<div>
								<h1 className="personal-account-leasing-car-mobile_payment-next_title">
									Следующее прохождение ТО:
								</h1>
								<p className="personal-account-leasing-car-mobile_payment-next_km">
									300 000 км
								</p>
							</div>
						</div>
					</div>
					<div className="personal-account-leasing-car-mobile_maintenance">
						<button
							className="site-btn big gray mb-px-15"
							onClick={() => setPaymentsModal(true)}>
							график платежей
						</button>
						<button
							className="site-btn big gray"
							onClick={() => setMaintenanceModal(true)}>
							график То
						</button>
					</div>
				</div>
			</div>

			<PersonalAccountLeasingCarModalMaintenance
				active={maintenanceModal}
				setActive={setMaintenanceModal}
				maintance={car.maintance_hitory}
			/>
			<PersonalAccountLeasingCarModalPayments
				active={paymentsModal}
				setActive={setPaymentsModal}
				payments={car.payment_history}
			/>
		</>
	);
};

export default PersonalAccountLeasingCarCardMobile;
