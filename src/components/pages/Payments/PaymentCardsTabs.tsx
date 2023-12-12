import React, { useState } from "react";

interface IProps {
	className?: string;
	bankList: JSX.Element;
	scoreList: JSX.Element;
}

const PaymentCardsTabs = (props: IProps) => {
	const { className, bankList, scoreList } = props;
	const [page, setPage] = useState<"all" | "bank-cards" | "score-cards">("all");

	return (
		<div>
			<div
				className={
					"nav nav-tabs car-info-btns_mobile personal-account-payments_tab d-flex d-md-none " +
					(className ?? "")
				}>
				<button
					className={"nav-link " + (page === "all" ? "active" : "")}
					onClick={() => setPage("all")}>
					Все
				</button>
				<button
					className={"nav-link " + (page === "bank-cards" ? "active" : "")}
					onClick={() => setPage("bank-cards")}>
					Карты
				</button>
				<button
					className={"nav-link " + (page === "score-cards" ? "active" : "")}
					onClick={() => setPage("score-cards")}>
					Счета
				</button>
			</div>
			{page === "all" && (
				<>
					{bankList}
					<div className="personal-account-payments_tab-content_divider" />
					{scoreList}
				</>
			)}
			{page === "bank-cards" && <>{bankList}</>}
			{page === "score-cards" && <>{scoreList}</>}
		</div>
	);
};

export default PaymentCardsTabs;
