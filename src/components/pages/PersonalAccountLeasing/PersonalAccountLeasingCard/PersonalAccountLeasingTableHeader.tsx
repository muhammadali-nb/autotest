import React, { FC, ReactNode } from "react";
const PersonalAccountLeasingCardHeader: FC<{ children: ReactNode }> = (
	props
) => {
	const { children } = props;

	return (
		<div className="personal-account-leasing-car_card-table_header">
			{children}
		</div>
	);
};

export default PersonalAccountLeasingCardHeader;
