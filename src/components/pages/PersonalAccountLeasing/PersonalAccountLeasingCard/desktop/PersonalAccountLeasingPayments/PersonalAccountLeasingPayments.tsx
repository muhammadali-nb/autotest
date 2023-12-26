import React, { useEffect, useState } from "react";
import PersonalAccountLeasingCardHeader from "../../PersonalAccountLeasingTableHeader";
import PersonalAccountLeasingCardPagination from "../../PersonalAccountLeasingCardPagination";
import PersonalAccountLeasingPaymentsRow from "./PesosonalAccountLeasingPaymentsRow";
import { TypePaymentTableRow } from "../../../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	className?: string;
	paymentsList: TypePaymentTableRow[];
}

const PersonalAccountLeasingPayments = (props: IProps) => {
	const { className, paymentsList } = props;
	const [size, setSize] = useState("desk");
	const [activePage, setActivePage] = useState(0);

	const sortedArray = () => {
		const result: TypePaymentTableRow[][] = [];

		for (let i = 0; i < paymentsList.length; i += 30) {
			const fifteenWords = paymentsList.slice(i, i + 30);

			result.push(fifteenWords);
		}

		

		return result;
	};

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

				<PersonalAccountLeasingCardPagination
					setActive={setActivePage}
					list={sortedArray()}
					active={activePage}
				/>
			</PersonalAccountLeasingCardHeader>
			<div className="personal-account-leasing-car_card_payments-table_body">
				<div>
					<PersonalAccountLeasingPaymentsRow type="header" />
					{sortedArray()[activePage].slice(0, 15).map((_item, index) => (
						<PersonalAccountLeasingPaymentsRow
							type="row"
							key={index}
							data={_item}
							className={index % 2 !== 0 ? "odd_row" : ""}
						/>
					))}
				</div>
				{size !== "pad" && (
					<div>
						<PersonalAccountLeasingPaymentsRow type="header" />
						{sortedArray()[activePage].slice(15, 30).map((_item, index) => (
							<PersonalAccountLeasingPaymentsRow
								type="row"
								key={index}
								data={_item}
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
