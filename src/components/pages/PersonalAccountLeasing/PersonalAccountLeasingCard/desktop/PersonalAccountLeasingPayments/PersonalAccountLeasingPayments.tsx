import React from "react";
import PersonalAccountLeasingCardHeader from "../../PersonalAccountLeasingTableHeader";
import PersonalAccountLeasingCardPagination from "../../PersonalAccountLeasingCardPagination";

interface IProps {
	className?: string;
}

const PersonalAccountLeasingPayments = (props: IProps) => {
	const { className } = props;
	return (
		<div className={" " + className}>
			<PersonalAccountLeasingCardHeader>
				<h3>TO</h3>
				<PersonalAccountLeasingCardPagination />
			</PersonalAccountLeasingCardHeader>
		</div>
	);
};

export default PersonalAccountLeasingPayments;
