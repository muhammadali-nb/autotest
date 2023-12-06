import React from "react";
import PersonalAccountLeasingCarCardMobileInfo from "./PersonalAccountLeasingCarCardMobileInfo";
import PersonalAccountLeasingCardCardMobilePayment from "./PersonalAccountLeasingCardCardMobilePayment";

interface IProps {
	className?: string;
}

const PersonalAccountLeasingCarCardMobile = (props: IProps) => {
	const { className } = props;
	return (
		<div>
			<PersonalAccountLeasingCarCardMobileInfo />
			
		</div>
	);
};

export default PersonalAccountLeasingCarCardMobile;
