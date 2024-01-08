import React, { useState } from "react";
import PersonalAccountLeasingCardCar from "./PersonalAccountLeasingCard/desktop/PersonalAccountCarCard/PersonalAccountLeasingCardCar";
import PersonalAccountLeasingMaintenance from "./PersonalAccountLeasingCard/desktop/PersonalAccountLeasingMaintenance/PersonalAccountLeasingMaintenance";
import PersonalAccountLeasingPayments from "./PersonalAccountLeasingCard/desktop/PersonalAccountLeasingPayments/PersonalAccountLeasingPayments";
import { IPersonalAccountLeasingCarData } from "../../../types/PersonalAccount/LeasingTypes";

const PersonalAccountLeasingCarCardDesk = ({
	className,
	car,
}: {
	className?: string;
	car: IPersonalAccountLeasingCarData;
}) => {
	
	return (
		<div className={"personal-account-leasing-car " + (className ?? "")}>
			<PersonalAccountLeasingCardCar
				car_info={{ ...car.bank_accounts, ...car.car }}
				car_payment_status={car.payment_status}
				car_payment={car.payment}
			/>
			<div className="d-flex mt-px-15">
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

export default PersonalAccountLeasingCarCardDesk;
