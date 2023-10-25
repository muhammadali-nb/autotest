import React from "react";
import BankCard from "../../../common/PersonalAccount/BankCard/BankCard";
import "./PersonalAccountBankCards.scss";
import ScoreCard from "../../../common/ScoreCard/ScoreCard";

const cards = [
	{
		id: 1,
		number: "**** 0011",
		fav: true,
	},
	{
		id: 2,
		number: "**** 0022",
		fav: false,
	},
	{
		id: 3,
		number: "**** 0033",
		fav: false,
	},
];

const cardScore = [
	{
		id: 1,
		number: "**** 0011",
		fav: true,
	},
	{
		id: 2,
		number: "**** 0022",
		fav: false,
	},
	{
		id: 3,
		number: "**** 0033",
		fav: false,
	},
	{
		id: 4,
		number: "**** 0033",
		fav: false,
	},
];

export const PersonalAccountCards = () => {
	return (
		<div className="personal-account_cards">
			<div
				className="personal-account_cards-score"
				style={{
					width: cardScore.length * 46 + 42,
				}}>
				{cardScore.map((_item, index) => (
					<ScoreCard
						number={"**** 1111"}
						favorite={_item.fav}
						key={_item.id}
						style={{
							position: "absolute",
							zIndex: cardScore.length - index,
							top: "0",
							left: index * 46 + "px",
						}}
					/>
				))}
			</div>
			<div
				style={{
					width: 46 * cards.length + 48 + "px",
				}}
				className="personal-account_cards-bank">
				{cards.map((_item, index) => (
					<BankCard
						number={_item.number}
						favorite={_item.fav}
						key={_item.id}
						style={{
							position: "absolute",
							zIndex: cards.length - index,
							top: "0",
							left: index * 46 + "px",
						}}
					/>
				))}
			</div>
			<div className="personal-account_cards-add">
				<svg
					width="16"
					height="17"
					viewBox="0 0 16 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M7.99999 3.16699V8.50033M7.99999 8.50033H13.3333M7.99999 8.50033H2.66666M7.99999 8.50033V13.8337"
						stroke="#BABCBF"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	);
};
