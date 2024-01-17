import React from "react";
import PersonalAccountLeasingCarCardPadInfo from "./PersonalAccountLeasingCarCardPadInfo";
import PersonalAccountLeasingMaintenance from "../desktop/PersonalAccountLeasingMaintenance/PersonalAccountLeasingMaintenance";

import PersonalAccountLeasingPayments from "../desktop/PersonalAccountLeasingPayments/PersonalAccountLeasingPayments";
import { IPersonalAccountLeasingCarData } from "../../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	className?: string;
	car: IPersonalAccountLeasingCarData;
}

const PersonalAccountLeasingCarCardPad = (props: IProps) => {
	const { className, car } = props;
	return (
		<div className={"personal-account-leasing-car-mobile_card " + className}>
			<PersonalAccountLeasingCarCardPadInfo />
			<div className="mt-px-15 d-flex">
				<PersonalAccountLeasingMaintenance
					maintenanceList={car.maintance_hitory}
				/>
				<PersonalAccountLeasingPayments
					paymentsList={car.payment_history}
					className="ms-px-15"
				/>
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarCardPad;
