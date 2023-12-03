import React from "react";

const PersonalAccountLeasingCardCarPaymentStatus = () => {
	return (
		<div className="personal-account-leasing-car_card-payment-status">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 30 30"
					fill="none">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M0.333374 15.0007C0.333374 6.90048 6.89986 0.333984 15 0.333984C23.1002 0.333984 29.6667 6.90048 29.6667 15.0007C29.6667 23.1008 23.1002 29.6673 15 29.6673C6.89986 29.6673 0.333374 23.1008 0.333374 15.0007Z"
						fill="#008F4B"
					/>
					<path
						d="M10.1302 15.316L13.4781 18.478L19.8694 11.5215"
						stroke="white"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<div className="personal-account-leasing-car_card-payment-status_body">
				<h4>Оплачено</h4>
				<p>
					Следующий платеж: <br /> 12.07.2023 до 00:00
				</p>
				<span>Рекомендуем вносить платежи заранее, во избежание просрочек</span>
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCardCarPaymentStatus;
