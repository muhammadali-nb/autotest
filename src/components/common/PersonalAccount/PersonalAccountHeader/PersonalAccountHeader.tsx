import React from "react";
import "./PersonalAccountHeader.scss";
import PersonalAccountBalance from "../../../pages/PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";

const PersonalAccountHeader = () => {
	return (
		<div className="personal-account-header">
			<h1 className="personal-account-header_title">История аренды</h1>
			<PersonalAccountBalance />
		</div>
	);
};

export default PersonalAccountHeader;
