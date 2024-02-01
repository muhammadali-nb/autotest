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
	const [activePage, setActivePage] = useState(1);

	const sortedArray = () => {
		const result: TypePaymentTableRow[][] = [];
		if (paymentsList.length > 0) {
			if (size === "desk") {
				for (let i = 0; i < paymentsList.length; i += 30) {
					const fifteenWords = paymentsList.slice(i, i + 30);

					result.push(fifteenWords);
				}
			} else {
				for (let i = 0; i < paymentsList.length; i += 15) {
					const fifteenWords = paymentsList.slice(i, i + 15);

					result.push(fifteenWords);
				}
			}
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

				{paymentsList.length > (size === "desk" ? 30 : 15) && (
					<PersonalAccountLeasingCardPagination
						setActive={setActivePage}
						active={activePage}
						totalPages={sortedArray().length}
					/>
				)}
			</PersonalAccountLeasingCardHeader>
			<div className="personal-account-leasing-car_card_payments-table_body">
				{sortedArray().length > 0 ? (
					size === "desk" ? (
						<>
							<div>
								<PersonalAccountLeasingPaymentsRow type="header" />
								{sortedArray()
									[activePage - 1].slice(0, 15)
									.map((_item, index) => (
										<PersonalAccountLeasingPaymentsRow
											type="row"
											key={index}
											data={_item}
											className={index % 2 !== 0 ? "odd_row" : ""}
										/>
									))}
							</div>
							<div>
								<PersonalAccountLeasingPaymentsRow type="header" />
								{sortedArray()
									[activePage - 1].slice(15, 30)
									.map((_item, index) => (
										<PersonalAccountLeasingPaymentsRow
											type="row"
											key={index}
											data={_item}
											className={index % 2 !== 0 ? "odd_row" : ""}
										/>
									))}
							</div>
						</>
					) : (
						<div>
							<PersonalAccountLeasingPaymentsRow type="header" />
							{sortedArray()[activePage - 1].map((_item, index) => (
								<PersonalAccountLeasingPaymentsRow
									type="row"
									key={index}
									data={_item}
									className={index % 2 !== 0 ? "odd_row" : ""}
								/>
							))}
						</div>
					)
				) : (
					<>
						<p className="ps-px-20 font-size-16 font-weight-semi">
							Список с платежами пока пуст
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default PersonalAccountLeasingPayments;
