import React, { useEffect, useState } from "react";
import PersonalAccountLeasingCardHeader from "../../PersonalAccountLeasingTableHeader";
import PersonalAccountLeasingCardPagination from "../../PersonalAccountLeasingCardPagination";
import PersonalAccountLeasingPaymentsRow from "./PesosonalAccountLeasingPaymentsRow";

interface IProps {
	className?: string;
}

const PersonalAccountLeasingPayments = (props: IProps) => {
	const { className } = props;
	const [size, setSize] = useState("desk");

	useEffect(() => {
		const checkSize = () => {
			if (window.innerWidth > 1350) {
				setSize("desk");
			} else {
				setSize("pad");
			}
		};
		window.addEventListener("resize", checkSize);

		checkSize();

		return () => {
			window.removeEventListener("resize", checkSize);
		};
	}, []);
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
				{size !== "pad" && (
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
				)}
			</div>
		</div>
	);
};

export default PersonalAccountLeasingPayments;
