import React, { useEffect, useState } from "react";
import PersonalAccountLeasingCarCardMobile from "./mobile/PersonalAccountLeasingCarCardMobile";
import PersonalAccountLeasingCarCardPad from "./pad/PersonalAccountLeasingCarCardPad";
import PersonalAccountLeasingCarCardDesk from "../PersonalAccountLeasingCarCardDesk";
import { IPersonalAccountLeasingCarData } from "../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	car: IPersonalAccountLeasingCarData;
}

const PersonalAccountLeasingCard = (props: IProps) => {
	const { car } = props;

	const [size, setSize] = useState<"desk" | "pad" | "mobile">("desk");

	useEffect(() => {
		const checkSize = () => {
			if (window.innerWidth > 1200) {
				setSize("desk");
			} else if (window.innerWidth > 767) {
				setSize("pad");
			} else {
				setSize("mobile");
			}
		};
		window.addEventListener("resize", checkSize);

		checkSize();

		return () => {
			window.removeEventListener("resize", checkSize);
		};
	}, []);

	if (size === "desk") {
		return (
			<PersonalAccountLeasingCarCardDesk
				car={car}
				className="d-none d-xl-block"
			/>
		);
	}

	if (size === "pad") {
		return (
			<PersonalAccountLeasingCarCardPad
				car={car}
				className="d-none d-md-block d-xl-none"
			/>
		);
	}

	return (
		<PersonalAccountLeasingCarCardMobile
			car={car}
			className="d-block d-md-none"
		/>
	);
};

export default PersonalAccountLeasingCard;
