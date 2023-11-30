import React from "react";
import { Link } from "react-router-dom";

const PersonalAccountlinks = [
	{
		id: 1,
		name: "Мои данные",
		path: "/personal-account",
	},
	{
		id: 2,
		name: "Аренда",
		path: "/personal-account/rent-history",
	},
	{
		id: 3,
		name: "Лизинг",
		path: "/personal-account/leasing",
	},
	{
		id: 4,
		name: "Транзакции",
		path: "/personal-account/transactions"
	},
	{
		id: 5,
		name: "Карты оплаты",
		path: "/personal-account/payment",
	},
	{
		id: 6,
		name: "Штрафы",
		path: "/personal-account/fine",
	},
	{
		id: 7,
		path: "/personal-account/subscriptions",
		name: "Подписки",
	},
];

const PersonalAccountMenu = ({
	selected,
	className,
}: {
	selected: string;
	className?: string;
}) => {
	return (
		<div className={"personal-account_menu " + className}>
			<div className={"personal-account_menu-links"}>
				{PersonalAccountlinks.map((i) => (
					<Link
						key={i.id}
						to={i.path ?? "/"}
						className={
							"header-link " + (selected === i.path ? "selected " : "")
						}>
						{i.name}
					</Link>
				))}
			</div>
		</div>
	);
};

export default PersonalAccountMenu;
