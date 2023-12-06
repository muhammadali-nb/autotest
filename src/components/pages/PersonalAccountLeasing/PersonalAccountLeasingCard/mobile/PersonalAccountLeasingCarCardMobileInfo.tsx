import React from "react";
import carImage from "../../../../../images/index/car.webp";
import PersonalAccountLeasingCardCardMobilePayment from "./PersonalAccountLeasingCardCardMobilePayment";

interface IProps {
	className?: string;
}
const PersonalAccountLeasingCarCardMobileInfo = (props: IProps) => {
	const { className } = props;
	return (
		<div className={"personal-account-leasing-car-mobile " + (className ?? "")}>
			<div className="personal-account-leasing-car-mobile_image">
				<img src={carImage} alt="" />
			</div>
			<h1 className="personal-account-leasing-car-mobile_name">
				Hyundai <span>Sonata</span>
			</h1>
			<h3 className="personal-account-leasing-car-mobile_regnum">К638ЕТ 53</h3>
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
			<div>
				<PersonalAccountLeasingCardCardMobilePayment />
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarCardMobileInfo;
