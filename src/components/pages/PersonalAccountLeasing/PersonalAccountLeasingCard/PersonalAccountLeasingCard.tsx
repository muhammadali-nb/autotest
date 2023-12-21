import React from "react";
import PersonalAccountLeasingCarCardMobile from "./mobile/PersonalAccountLeasingCarCardMobile";
import PersonalAccountLeasingCarCardPad from "./pad/PersonalAccountLeasingCarCardPad";
import PersonalAccountLeasingCarCardDesk from "../PersonalAccountLeasingCarCardDesk";
import { IPersonalAccountLeasingCarData } from "../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	car: IPersonalAccountLeasingCarData;
}

const PersonalAccountLeasingCard = (props: IProps) => {
	const {car} = props

	return (
		<>
			<PersonalAccountLeasingCarCardDesk car={car} className="d-none d-xl-block" />
			<PersonalAccountLeasingCarCardPad className="d-none d-md-block d-xl-none " />
			<PersonalAccountLeasingCarCardMobile className="d-block d-md-none" />
		</>
	);
};

export default PersonalAccountLeasingCard;
