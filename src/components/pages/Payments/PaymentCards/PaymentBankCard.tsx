import React, { useState } from "react";
import { PaymentBankCardType } from "../../../../types/PersonalAccount/PaymentsTypes";

export const PaymentCardMainButton = ({
	className,
	active,
	setActive,
}: {
	className?: string;
	active: boolean;
	setActive: (e: boolean) => void;
}) => {
	return (
		<button
			onClick={() => setActive(!active)}
			className={
				"personal-account-payments_bank-card_button  personal-account-payments_bank-card_button-like " +
				(active ? "active " : "") +
				(className ?? "")
			}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="none">
				<path
					d="M6.80871 1.18687C7.1173 0.657058 7.8827 0.657057 8.19129 1.18687L9.94924 4.20508C10.0623 4.39916 10.2517 4.53678 10.4712 4.58432L13.8849 5.32354C14.4842 5.45331 14.7207 6.18125 14.3122 6.63846L11.9849 9.24304C11.8353 9.41052 11.7629 9.6332 11.7855 9.85666L12.1374 13.3317C12.1992 13.9417 11.5799 14.3916 11.0189 14.1444L7.8226 12.7359C7.61707 12.6453 7.38293 12.6453 7.1774 12.7359L3.98114 14.1444C3.42007 14.3916 2.80084 13.9417 2.8626 13.3317L3.21445 9.85666C3.23708 9.6332 3.16473 9.41052 3.01508 9.24304L0.687827 6.63846C0.279304 6.18125 0.515825 5.45331 1.11507 5.32354L4.52879 4.58432C4.7483 4.53678 4.93772 4.39916 5.05076 4.20508L6.80871 1.18687Z"
					fill="#E7E7E8"
				/>
			</svg>
		</button>
	);
};

export const PaymentCardEdit = ({ className }: { className?: string }) => {
	return (
		<button
			className={
				"personal-account-payments_bank-card_button personal-account-payments_bank-card_button-edit  " +
				(className ?? "")
			}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="15"
				height="15"
				viewBox="0 0 15 15"
				fill="none">
				<g clipPath="url(#clip0_8309_22720)">
					<path
						d="M12.5 9.1625V12.5C12.5 13.1904 11.9404 13.75 11.25 13.75H2.5C1.80964 13.75 1.25 13.1904 1.25 12.5V3.75C1.25 3.05964 1.80964 2.5 2.5 2.5H5.8375M11.25 1.25L13.75 3.75L7.5 10H5V7.5L11.25 1.25Z"
						stroke="#E7E7E8"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M11.25 1.25L13.75 3.75L7.5 10H5V7.5L11.25 1.25Z"
						fill="#E7E7E8"
					/>
				</g>
				<defs>
					<clipPath id="clip0_8309_22720">
						<rect width="15" height="15" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</button>
	);
};

interface PaymentCardProps {
	card: PaymentBankCardType;
}

const PaymentCard = (props: PaymentCardProps) => {
	const { card } = props;
	const [favarite, setFavorite] = useState(card.main);
	return (
		<div
			className={
				"personal-account-payments_bank-card " + (card.main ? "main " : "")
			}>
			<div className="personal-account-payments_bank-card_header mb-px-10">
				<h1>{card.name.length > 0 ? card.name : "Название карты"}</h1>
				<div className="d-flex align-items-center">
					<PaymentCardEdit />
					<PaymentCardMainButton
						active={favarite}
						setActive={setFavorite}
						className="ms-px-10"
					/>
				</div>
			</div>
			<p className="personal-account-payments_bank-card_number">
				{card.number}
			</p>
		</div>
	);
};

export default PaymentCard;
