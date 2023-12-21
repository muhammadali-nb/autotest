import React, { FC } from "react";
import PersonalAccountLeasingCarCardInfo from "./PersonalAccountLeasingCardCarInfo";
import PersonalAccountLeasingCarCardPayment from "./PersonalAccountLeasingCarCardPayment";
import PersonalAccountLeasingCardCarPaymentStatus from "./PersonalAccountLeasingCardCarPaymentStatus";
import {
	IPersonalAccountLeasingCarCardPaymentStatus,
	IPersonalAccountLeasingCarDataBankAccounts,
	IPersonalAccountLeasingCarDataInfo,
} from "../../../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	car_info: IPersonalAccountLeasingCarDataInfo &
		IPersonalAccountLeasingCarDataBankAccounts;
	car_payment_status: IPersonalAccountLeasingCarCardPaymentStatus;
	car_payment: {
		date: string;
		price: number;
	};
}

const PersonalAccountLeasingCardCar = (props: IProps) => {
	const { car_info, car_payment, car_payment_status } = props;
	return (
		<div className="personal-account-rent-car">
			<PersonalAccountLeasingCarCardInfo car={car_info} />
			<div className="personal-account-rent-car_payment">
				<PersonalAccountLeasingCarCardPayment car_payment={car_payment} />
				<PersonalAccountLeasingCardCarPaymentStatus
					car_payment_status={car_payment_status}
				/>
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCardCar;
