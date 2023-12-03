import React from "react";
import PersonalAccountLeasingCardCar from "./desktop/PersonalAccountCarCard/PersonalAccountLeasingCardCar";
import PersonalAccountLeasingMaintenance from "./desktop/PersonalAccountLeasingMaintenance/PersonalAccountLeasingMaintenance";
import PersonalAccountLeasingPayments from "./desktop/PersonalAccountLeasingPayments/PersonalAccountLeasingPayments";

const PersonalAccountLeasingCard = () => {
	return (
		<div className="personal-account-leasing-car">
			<PersonalAccountLeasingCardCar />
			<div className="mt-px-15 d-flex">
				<PersonalAccountLeasingMaintenance />
				<PersonalAccountLeasingPayments className="ml-px-15" />
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCard;
