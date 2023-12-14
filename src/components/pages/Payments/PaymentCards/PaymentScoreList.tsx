import React, { useState } from "react";
import PaymentCardAddButton from "./PaymentCardAddButton";
import PaymentScoreCard from "./PaymentScoreCard";
import PaymentCardAddModal from "./PaymentCardAddModal";
import { PaymentScoreCardType } from "../../../../types/PersonalAccount/PaymentsTypes";

interface IProps {
	data: PaymentScoreCardType[];
}

const PaymentScoreList = (props: IProps) => {
	const { data } = props;
	const [modalAddScoreCard, setModalAddScoreCard] = useState(false);

	const closeModal = () => {
		setModalAddScoreCard(false);
	};

	return (
		<>
			<div className="personal-account-payments_score-card-list">
				<div className="d-none d-md-block">
					<PaymentCardAddButton onClick={() => setModalAddScoreCard(true)} />
				</div>
				<div className="personal-account-payments_score-card-list_cards">
					{data.map((_item, index) => (
						<PaymentScoreCard card={_item} key={_item.id} />
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
