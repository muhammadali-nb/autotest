import React, { Dispatch, useEffect } from "react";
import { HeaderLogoImage } from "../../../../layout/Header";
import call from "../../../../../images/common/phone-call.svg";
import back from "../../../../../images/common/back.svg";
import MobileModalHeader from "../../../../common/MobileModal/headers/MobileModalHeader";
import PersonalAccountLeasingCarCardMobileMaintanceRow from "./PersonalAccountLeasingCarCardMobileMaintanceRow";
import { TypeMaintenceTableRow } from "../../../../../types/PersonalAccount/LeasingTypes";
interface IProps {
	setActive: Dispatch<boolean>;
	active: boolean;
	maintance: TypeMaintenceTableRow[];
}

const PersonalAccountLeasingCarModalMaintenance = (props: IProps) => {
	const { active, setActive, maintance } = props;

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
			<MobileModalHeader
				scheme="dark"
				setClose={setActive}
				className="personal-account-leasing-modal_header"
			/>
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
					{maintance.map((_item, index) => (
						<PersonalAccountLeasingCarCardMobileMaintanceRow
							type="row"
							data={_item}
							key={_item.id}
							className={index % 2 !== 0 ? "odd_row" : ""}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarModalMaintenance;
