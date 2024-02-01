import React from "react";
import "./PersonalAccountHeader.scss";

const PersonalAccountHeader: React.FC<{
	children: React.ReactNode
}> = (props) => {
	const { children } = props;

	return (
		<div className="personal-account-header">
			{children}
		</div>
	);
};

export default PersonalAccountHeader;
