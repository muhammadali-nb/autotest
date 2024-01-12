import React, { ReactElement, useEffect, useState } from "react";
import {
	TypeMaintenceTableRow,
	TypePaymentTableRow,
} from "../../../../types/PersonalAccount/LeasingTypes";
import { log } from "console";

const PersonalAccountLeasingCardPagination = ({
	setActive,
	active,
	totalPages,
}: {
	setActive: (e: any) => void;
	active: number;
	totalPages: number;
}) => {
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		console.log(totalPages);
	}, [totalPages]);
	const handlePrevClick = () => {
		setActive((prev) => Math.max(prev - 1, 1));
	};

	const handleNextClick = () => {
		setActive((prev) => Math.min(prev + 1, totalPages));
	};

	const renderPages = () => {
		const pagesToShow: ReactElement[] = [];
		const startPage = Math.max(1, active - 1);
		const endPage = Math.min(totalPages, startPage + 1);

		for (let i = startPage; i <= endPage; i++) {
			pagesToShow.push(
				<button
					key={i}
					onClick={() => setActive(i)}
					disabled={active === i}
					className={
						"personal-account-leasing-car_card-table_header_pagination_btn " +
						(active === i ? " active" : "")
					}>
					{i}
				</button>
			);
		}

		return pagesToShow;
	};

	return (
		<div className="personal-account-leasing-car_card-table_header_pagination">
			<button
				className="personal-account-leasing-car_card-table_header_pagination_btn-arrow"
				onClick={handlePrevClick}
				disabled={active === 1}>
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

			{renderPages()}

			<button
				className="personal-account-leasing-car_card-table_header_pagination_btn-arrow"
				onClick={handleNextClick}
				disabled={active === totalPages}>
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
