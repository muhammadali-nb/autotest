import React from "react";
<<<<<<< HEAD
import "./PersonalAccountHeader.scss";
=======
>>>>>>> mobile-version

const PersonalAccountHeader = () => {
	return (
		<div className="personal-account-header">
			<h1 className="personal-account-header_title">История аренды</h1>

			<div className="personal-account-header_balance">
				Баланс:{" "}
				<span className="personal-account-header_balance-value">10 000 ₽</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 22 22"
					fill="none">
					<path
						d="M10.5572 13.5734C10.8018 13.8093 11.1982 13.8093 11.4428 13.5734L14.9403 10.1984C15.3348 9.8178 15.0554 9.16699 14.4976 9.16699H7.50241C6.94457 9.16699 6.66519 9.8178 7.05965 10.1984L10.5572 13.5734Z"
						fill="#222222"
					/>
				</svg>
			</div>
		</div>
	);
};

export default PersonalAccountHeader;
