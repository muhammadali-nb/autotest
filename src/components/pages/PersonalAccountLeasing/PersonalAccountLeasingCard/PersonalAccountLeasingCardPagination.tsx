import React from "react";
import { TypeMaintenceTableRow, TypePaymentTableRow } from "../../../../types/PersonalAccount/LeasingTypes";

const PersonalAccountLeasingCardPagination = ({
	list,
	setActive,
	active,
}: {
	list: TypeMaintenceTableRow[][] | TypePaymentTableRow[][];
	setActive: (e: number) => void;
	active: number;
}) => {
	const decrease = () => {
		if (active > 0) {
			setActive(active - 1);
		}
	};

	const increase = () => {
		if (active !== list.length - 1) {
			setActive(active + 1);
		}
	};

	return (
		<div className="personal-account-leasing-car_card-table_header_pagination">
			<button
				className="personal-account-leasing-car_card-table_header_pagination_btn-arrow"
				onClick={decrease}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="19"
					height="19"
					viewBox="0 0 19 19"
					fill="none">
					<path
						d="M11.0834 14.25L6.33337 9.5L11.0834 4.75"
						stroke="#222222"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{list.map((_item, index) => (
				<button
					onClick={() => setActive(index)}
					className={
						"personal-account-leasing-car_card-table_header_pagination_btn " +
						(active === index ? " active" : "")
					}>
					{index + 1}
				</button>
			))}

			<button
				className="personal-account-leasing-car_card-table_header_pagination_btn-arrow"
				onClick={increase}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="19"
					height="19"
					viewBox="0 0 19 19"
					fill="none">
					<path
						d="M7.91663 14.25L12.6666 9.5L7.91663 4.75"
						stroke="#222222"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};

export default PersonalAccountLeasingCardPagination;
