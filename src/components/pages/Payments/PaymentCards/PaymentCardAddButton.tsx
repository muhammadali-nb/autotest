import React from "react";

interface IProps {
	onClick?: () => void;
	className?: string;
}

const PaymentCardAddButton = (props: IProps) => {
	const { onClick, className } = props;
	return (
		<button
			onClick={onClick}
			className={"personal-account-payments_add-btn " + (className ?? "")}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="24"
				viewBox="0 0 25 24"
				fill="none">
				<path
					d="M12.5 4V12M12.5 12H20.5M12.5 12H4.5M12.5 12V20"
					stroke="#B80600"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};

export default PaymentCardAddButton;
