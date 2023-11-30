import React from "react";

export interface BankCardProps {
	style?: object;
	favorite: boolean;
	number: string
}

const BankCard = (props: BankCardProps) => {
	const { style, favorite, number } = props;
	return (
		<div style={style} className="bank-card">
			<div className="bank-card_header">
				<h6>Карта</h6>
				<svg
					width="12"
					height="12"
					viewBox="0 0 13 13"
					fill="none"
					className={`bank-card_favorite-icon  ${favorite && "active"}`}
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M6.06795 0.741794C6.26082 0.41066 6.7392 0.410661 6.93207 0.741794L8.66556 3.71802C8.73621 3.83932 8.8546 3.92533 8.9918 3.95504L12.358 4.68399C12.7326 4.76509 12.8804 5.22005 12.6251 5.50581L10.3302 8.07416C10.2366 8.17884 10.1914 8.31801 10.2056 8.45768L10.5525 11.8844C10.5911 12.2657 10.2041 12.5469 9.85344 12.3923L6.70163 11.0034C6.57318 10.9468 6.42684 10.9468 6.29839 11.0034L3.14658 12.3923C2.79591 12.5469 2.4089 12.2657 2.4475 11.8844L2.79445 8.45768C2.80859 8.31801 2.76337 8.17884 2.66984 8.07416L0.374963 5.50581C0.119635 5.22005 0.267462 4.76509 0.641988 4.68399L4.00822 3.95504C4.14542 3.92533 4.26381 3.83932 4.33446 3.71802L6.06795 0.741794Z"
						// fill="#606569"
					/>
				</svg>
			</div>
			<div className="bank-card_number">{number}</div>
		</div>
	);
};

export default BankCard;
