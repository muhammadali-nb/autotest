import React, { useState } from "react";
import PaymentCardAddButton from "./PaymentCardAddButton";
import PaymentCard from "./PaymentBankCard";
import PaymentCardAddModal from "./PaymentCardAddModal";
import { PaymentBankCardType } from "../../../../types/PersonalAccount/PaymentsTypes";

interface IProps {
	data: PaymentBankCardType[];
}

export const PaymentCardsList = (props: IProps) => {
	const { data } = props;
	const [modalAddBankCard, setModalAddBankCard] = useState(false);

	const closeModal = () => {
		setModalAddBankCard(false);
	};

	return (
		<>
			<div className="personal-account-payments_bank-card-list">
				<div className="d-none d-md-block">
					<PaymentCardAddButton onClick={() => setModalAddBankCard(true)} />
				</div>
				<div className="personal-account-payments_bank-card-list_cards ">
					{data.map((_item) => (
						<PaymentCard card={_item} key={_item.id} />
					))}
				</div>
			</div>
			<PaymentCardAddModal
				type="bank"
				show={modalAddBankCard}
				onHide={closeModal}
			/>
		</>
	);
};
