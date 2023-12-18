import React from "react";
import PersonalAccountLeasingCarCardPadInfo from "./PersonalAccountLeasingCarCardPadInfo";
import PersonalAccountLeasingMaintenance from "../desktop/PersonalAccountLeasingMaintenance/PersonalAccountLeasingMaintenance";

import PersonalAccountLeasingPayments from "../desktop/PersonalAccountLeasingPayments/PersonalAccountLeasingPayments";

interface IProps {
	className?: string;
}

const PersonalAccountLeasingCarCardPad = (props: IProps) => {
	const { className } = props;
	return (
		<div className={className}>
			<PersonalAccountLeasingCarCardPadInfo />
			<div className="mt-px-15 d-flex">
				<PersonalAccountLeasingMaintenance/>
				<PersonalAccountLeasingPayments className="ms-px-15" />
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarCardPad;
