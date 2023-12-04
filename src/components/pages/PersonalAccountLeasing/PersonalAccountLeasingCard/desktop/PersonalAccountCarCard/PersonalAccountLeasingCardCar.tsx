import React, { FC } from "react";
import PersonalAccountLeasingCarCardInfo from "./PersonalAccountLeasingCardCarInfo";
import PersonalAccountLeasingCarCardPayment from "./PersonalAccountLeasingCarCardPayment";
import PersonalAccountLeasingCardCarPaymentStatus from "./PersonalAccountLeasingCardCarPaymentStatus";

const PersonalAccountLeasingCardCar: FC<{}> = (props) => {
	return (
		<div className="personal-account-rent-car d-none d-md-grid">
			<PersonalAccountLeasingCarCardInfo />
			<div className="personal-account-rent-car_payment">
				<PersonalAccountLeasingCarCardPayment />
				<PersonalAccountLeasingCardCarPaymentStatus />
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCardCar;
