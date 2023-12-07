import React, { useState } from "react";
import carImage from "../../../../../images/index/car.webp";
import rejectStatus from "../../../../../images/personal-account/card_statuses/rejected.svg";
import watingStatusBlack from "../../../../../images/personal-account/card_statuses/black/waiting-black.svg";
import PersonalAccountLeasingCarModalMaintenance from "./PersonalAccountLeasingCarModalMaintenance";
import PersonalAccountLeasingCarModalPayments from "./PersonalAccountLeasingCarModalPayments";
interface IProps {
	className?: string;
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

const PersonalAccountLeasingCarCardMobileInfo = (props: IProps) => {
	const { className } = props;
	const [maintenanceModal, setMaintenanceModal] = useState(false);
	const [paymentsModal, setPaymentsModal] = useState(false);
	return (
		<>
			<div
				className={"personal-account-leasing-car-mobile " + (className ?? "")}>
				<div className="personal-account-leasing-car-mobile_image">
					<img src={carImage} alt="" />
				</div>
				<h1 className="personal-account-leasing-car-mobile_name">
					Hyundai <span>Sonata</span>
				</h1>
				<h3 className="personal-account-leasing-car-mobile_regnum">
					К638ЕТ 53
				</h3>
				<div className="personal-account-leasing-car-mobile_deal">
					<p className="personal-account-leasing-car-mobile_deal-date">
						Дата первого платежа: 16.06.2023
					</p>
					<p className="personal-account-leasing-car-mobile_deal-number">
						Номер договора: 00000000000000
					</p>
					<p className="personal-account-leasing-car-mobile_deal-kasgo">
						КАСКО: 0000000
					</p>
					<p className="personal-account-leasing-car-mobile_deal-osago">
						ОСАГО: 0000000000
					</p>
				</div>
				<div className="personal-account-leasing-car-mobile_payment">
					Ежемесячный платёж <br />
					<span>60 950 ₽</span>
				</div>
				<h5 className="personal-account-leasing-car-mobile_payment-date">
					Оплата:
					<span> 12.06.2023 до 00:00</span>
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
			/>
			<PersonalAccountLeasingCarModalPayments
				active={paymentsModal}
				setActive={setPaymentsModal}
			/>
		</>
	);
};

export default PersonalAccountLeasingCarCardMobileInfo;
