import React, { useState } from "react";
import PaymentCardAddButton from "./PaymentCardAddButton";
import PaymentScoreCard from "./PaymentScoreCard";
import PaymentCardAddModal from "./PaymentCardAddModal";

const PaymentScoreList = () => {
	const [modalAddScoreCard, setModalAddScoreCard] = useState(false);

	const closeModal = () => {
		setModalAddScoreCard(false);
	};

	return (
		<>
			<div className="personal-account-payments_score-card-list">
				<div>
					<PaymentCardAddButton onClick={() => setModalAddScoreCard(true)} />
				</div>
				<div className="personal-account-payments_score-card-list_cards ms-px-10">
					{[...new Array(6)].map((_item, index) => (
						<PaymentScoreCard />
					))}
				</div>
			</div>
			<PaymentCardAddModal
				type="score"
				show={modalAddScoreCard}
				onHide={closeModal}
			/>
		</>
	);
};

export default PaymentScoreList;
