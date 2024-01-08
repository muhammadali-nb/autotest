import React, { RefObject, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// icons for menu
import closeMenu from "../../../images/personal-account/menu/chevron-left.svg";
import arrow from "../../../images/personal-account/menu/arrow-left.svg";
import user from "../../../images/personal-account/menu/user.svg";
import car from "../../../images/personal-account/menu/car.svg";
import ticked from "../../../images/personal-account/menu/ticket.svg";
import card from "../../../images/personal-account/menu/card.svg";
import warning from "../../../images/personal-account/menu/warning.svg";
import smile from "../../../images/personal-account/menu/smile.svg";
import wallet from "../../../images/personal-account/menu/wallet.svg";

interface MobileMenuProps {
	menuIsOpen: boolean;
	setMenuIsOpen: (e: boolean) => void;
	menuRef: RefObject<HTMLDivElement>;
	setMainMenu: (arg: boolean) => void;
}

const defaultLinks = [
	{
		text: "Мои данные",
		path: "/personal-account",
		className: "",
		icon: user,
		id: 1,
	},
	{
		text: "Аренда",
		path: "/personal-account/rent-history",
		className: "",
		icon: car,
		id: 2,
	},
	{
		text: "Лизинг",
		path: "/personal-account/leasing",
		className: "",
		icon: ticked,
		id: 3,
	},
	{
		id: 4,
		text: "Транзакции",
		path: "/personal-account/transactions",
		className: "",
		icon: wallet,
	},
	{
		text: "Карты оплаты",
		path: "/personal-account/payment",
		className: "",
		icon: card,
		id: 5,
	},
	{
		text: "Штрафы",
		path: "/personal-account/fines",
		icon: warning,
		id: 6,
		className: "",
	},
	{
		text: "Подписки",
		path: "/personal-account/subscriptions",
		className: "",
		icon: smile,
		id: 7,
	},
];

const PersonalAccountMenuMobile = (props: MobileMenuProps) => {
	const { menuIsOpen, setMenuIsOpen, menuRef, setMainMenu } = props;
	// const [loginAdvanceIsShow, setLoginAdvanceIsShow] = useState(true);

	useEffect(() => {
		if (menuIsOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [menuIsOpen]);

	const backToMainMenu = () => {
		if (!menuIsOpen) return;
		setMenuIsOpen(false);
		setMainMenu(true);
	};

	return (
		<div
			className={`mobile-menu ${
				menuIsOpen ? "active" : ""
			} mobile-menu-personal-account`}>
			<div
				ref={menuRef}
				className={`mobile-menu_container ${
					menuIsOpen ? "active" : ""
				} mobile-menu-personal-account_container`}>
				<div>
					<div className={"d-flex align-items-center gap-px-15"}>
						<div onClick={() => setMenuIsOpen(false)}>
							<img src={closeMenu} alt="close menu" />
						</div>
						<h3 className="mobile-menu-personal-account_header-close">
							Личный кабинет
						</h3>
					</div>
					<div>
						<ul className="mobile-menu_routes">
							{defaultLinks.map((_item) => (
								<li
									className="mobile-menu_routes_item mobile-menu-personal-account_link"
									key={_item.id}>
									<Link to={_item.path}>
										<img src={_item.icon} alt={_item.text} />
										<p>{_item.text}</p>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div
					className="mobile-menu-personal-account_come-to-menu"
					onClick={backToMainMenu}>
					<img src={arrow} alt="" />
					<p>Вернуться в меню</p>
				</div>
			</div>
		</div>
	);
};

export default PersonalAccountMenuMobile;
