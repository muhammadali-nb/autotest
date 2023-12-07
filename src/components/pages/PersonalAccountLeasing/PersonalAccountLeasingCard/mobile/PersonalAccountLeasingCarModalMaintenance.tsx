import React, { Dispatch, useEffect } from "react";
import { HeaderLogoImage } from "../../../../layout/Header";
import call from "../../../../../images/common/phone-call.svg";
import back from "../../../../../images/common/back.svg";
// import MobileModalHeader from "../../../../common/MobileModal/headers/MobileModalHeader";
import PersonalAccountLeasingCarCardMobileMaintanceRow from "./PersonalAccountLeasingCarCardMobileMaintanceRow";
interface IProps {
	setActive: Dispatch<boolean>;
	active: boolean;
}

const PersonalAccountLeasingCarModalMaintenance = (props: IProps) => {
	const { active, setActive } = props;

	useEffect(() => {
		if (active) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [active]);

	return (
		<div
			className={
				"mobile-modal personal-account-leasing-modal " +
				(active ? "active" : "")
			}>
			{/* <MobileModalHeader scheme="dark" setClose={setActive} /> */}
			<div className="personal-account-leasing-modal_body">
				<div className="personal-account-leasing-modal_body-header">
					<h1 className="personal-account-leasing-modal_body_carname">
						Hyundai <span>Sonata</span>
					</h1>
					<p className="personal-account-leasing-modal_body_regnum">
						К638ЕТ 53
					</p>
				</div>
				<div className="personal-account-leasing-modal_body-table">
					<PersonalAccountLeasingCarCardMobileMaintanceRow type="header" />
					{[...new Array(50)].map((_item, index) => (
						<PersonalAccountLeasingCarCardMobileMaintanceRow
							type="row"
							key={index}
							className={index % 2 !== 0 ? "odd_row" : ""}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarModalMaintenance;
