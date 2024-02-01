import React from "react";

const PersonalAccountHeaderMobile: React.FC<{
	children: React.ReactNode
}> = (props) => {
	const { children } = props;

	return (
		<div className="personal-account-header_mobile">
			{children}
		</div>
	);
};

export default PersonalAccountHeaderMobile;
