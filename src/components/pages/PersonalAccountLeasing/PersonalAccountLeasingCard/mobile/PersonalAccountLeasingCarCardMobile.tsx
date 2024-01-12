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

const PersonalAccountLeasingCarCardMobileStatus = () => {
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
					Рекомендуем вносить платежи заранее, во избежание просрочек
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
				className={"personal-account-leasing-car-mobile " + (className ?? "")}>
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
					<PersonalAccountLeasingCarCardMobileStatus />
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
