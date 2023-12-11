import React, { useState } from "react";
import PaymentCardAddButton from "./PaymentCardAddButton";
import PaymentCard from "./PaymentBankCard";
import PaymentCardAddModal from "./PaymentCardAddModal";

export const PaymentCardsList = () => {
	const [modalAddBankCard, setModalAddBankCard] = useState(false);

	const closeModal = () => {
		setModalAddBankCard(false);
	};

	return (
		<>
			<div className="personal-account-payments_bank-card-list">
				<div>
					<PaymentCardAddButton onClick={() => setModalAddBankCard(true)} />
				</div>
				<div className="personal-account-payments_bank-card-list_cards ms-px-10">
					{[...new Array(6)].map((_item, index) => (
						<PaymentCard key={index} />
					))}
				</div>
			</div>
			<PaymentCardAddModal type="bank" show={modalAddBankCard} onHide={closeModal} />
		</>
	);
};
