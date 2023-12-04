import React from "react";
import PersonalAccountLeasingCardHeader from "../../PersonalAccountLeasingTableHeader";
import PersonalAccountLeasingCardPagination from "../../PersonalAccountLeasingCardPagination";
import PersonalAccountLeasingPaymentsRow from "./PesosonalAccountLeasingPaymentsRow";

interface IProps {
	className?: string;
}

const PersonalAccountLeasingPayments = (props: IProps) => {
	const { className } = props;
	return (
		<div
			className={
				" personal-account-leasing-car_card_payments " + className ?? " "
			}>
			<PersonalAccountLeasingCardHeader>
				<h3>платежи</h3>
				<PersonalAccountLeasingCardPagination />
			</PersonalAccountLeasingCardHeader>
			<div className="personal-account-leasing-car_card_payments-table_body">
				<div>
					<PersonalAccountLeasingPaymentsRow type="header" />
					{[...new Array(15)].map((_item, index) => (
						<PersonalAccountLeasingPaymentsRow
							type="row"
							key={index}
							className={index % 2 !== 0 ? "odd_row" : ""}
						/>
					))}
				</div>
				<div>
					<PersonalAccountLeasingPaymentsRow type="header" />
					{[...new Array(15)].map((_item, index) => (
						<PersonalAccountLeasingPaymentsRow
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

export default PersonalAccountLeasingPayments;
