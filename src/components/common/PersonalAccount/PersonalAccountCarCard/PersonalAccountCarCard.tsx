import React from "react";
import PersonalAccountCarCardPayment from "./descktop/PersonalAccountCarCardPayment";
import PersonalAccountCarCardPaymentStatus from "./descktop/PersonalAccountCarCardPaymentStatus";
import PersonalAccountCarCardInfo from "./descktop/PersonalAccountCarCardInfo";
import PersonalAccountCarCardInfoMobile from "./mobile/PersonalAccountCarCardInfoMobile";
import PersonalAccountCarCardPaymentMobile from "./mobile/PersonalAccountCarCardPaymentMobile";

const PersonalAccountCarCard = () => {
	return (
		<>
			<div className="personal-account-rent-car d-none d-md-grid">
				<PersonalAccountCarCardInfo />
				<div className="personal-account-rent-car_payment">
					<PersonalAccountCarCardPayment />
					<PersonalAccountCarCardPaymentStatus />
				</div>
			</div>
			<div className="personal-account-rent-car_mobile d-block d-md-none">
				<div className="personal-account-rent-car_mobile-card">
					<PersonalAccountCarCardInfoMobile />
					<PersonalAccountCarCardPaymentMobile />
				</div>
			</div>
		</>
	);
};

export default PersonalAccountCarCard;
