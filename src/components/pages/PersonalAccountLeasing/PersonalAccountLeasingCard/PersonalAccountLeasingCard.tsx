import React from "react";
import PersonalAccountLeasingCardCar from "./desktop/PersonalAccountCarCard/PersonalAccountLeasingCardCar";
import PersonalAccountLeasingMaintenance from "./desktop/PersonalAccountLeasingMaintenance/PersonalAccountLeasingMaintenance";
import PersonalAccountLeasingPayments from "./desktop/PersonalAccountLeasingPayments/PersonalAccountLeasingPayments";
import PersonalAccountLeasingCarCardMobile from "./mobile/PersonalAccountLeasingCarCardMobile";
import PersonalAccountLeasingCarCardPad from "./pad/PersonalAccountLeasingCarCardPad";
const PersonalAccountLeasingCard = () => {
	return (
		<>
			<div className="personal-account-leasing-car d-none d-xl-block">
				<PersonalAccountLeasingCardCar />
				<div className="d-flex mt-px-15">
					<PersonalAccountLeasingMaintenance />
					<PersonalAccountLeasingPayments className="ms-px-15" />
				</div>
			</div>
			<PersonalAccountLeasingCarCardPad className="d-none d-md-block d-xl-none " />
			<PersonalAccountLeasingCarCardMobile className="d-block d-md-none" />
		</>
	);
};

export default PersonalAccountLeasingCard;
