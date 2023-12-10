import React from "react";
import PaymentCardAddButton from "./PaymentCardAddButton";
import PaymentCard from "./PaymentCard";

export const PaymentCardsList = () => {
	return (
		<div className="personal-account-payments_card-list">
			<div>
				<PaymentCardAddButton />
			</div>
			<div className="personal-account-payments_card-list_cards ms-px-15">
				{[...new Array(6)].map((_item, index) => (
					<PaymentCard key={index} />
				))}
			</div>
		</div>
	);
};
