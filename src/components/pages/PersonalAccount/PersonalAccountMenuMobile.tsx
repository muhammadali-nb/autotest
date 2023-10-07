import React, { RefObject, useEffect, useState } from "react";
import { HeaderImage } from "../../layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//icons ../../../img/common/mobile_menu-icons/house.svg
import house from "../../../img/common/mobile_menu-icons/house.svg";

import dashboard from "../../../img/common/mobile_menu-icons/dashboard.svg";
import phone from "../../../img/common/mobile_menu-icons/phone.svg";
import question from "../../../img/common/mobile_menu-icons/question.svg";

import loginIcon from "../../../img/common/mobile_menu-icons/login.svg";
// import AdvanceLogin from "../../../img/common/mobile_menu-icons/";
import closeMenu from "../../../img/personal-account/menu/chevron-left.svg";
import arrow from "../../../img/personal-account/menu/arrow-left.svg";

import user from "../../../img/personal-account/menu/user.svg";
import car from "../../../img/personal-account/menu/car.svg";
import ticked from "../../../img/personal-account/menu/ticket.svg";
import card from "../../../img/personal-account/menu/card.svg";
import warning from "../../../img/personal-account/menu/warning.svg";
import smile from "../../../img/personal-account/menu/smile.svg";

interface MobileMenuProps {
	menuIsOpen: boolean;
	setMenuIsOpen: (e: boolean) => void;
	menuRef: RefObject<HTMLDivElement>;
}

const defaultLinks = [
	{
		text: "Мои данные",
		path: "/personal-account",
		className: "",
		icon: user,
		id: 1,
	},
	{ text: "Аренда", path: "/rent", className: "", icon: car, id: 2 },
	{
		text: "Лизинг",
		path: "/programs",
		className: "",
		icon: ticked,
		id: 3,
	},
	{ text: "Карты оплаты", path: "/", className: "", icon: card, id: 4 },
	{ text: "Штрафы", path: "/", className: "", icon: warning, id: 5 },
	{ text: "Подписки", path: "/", className: "", icon: smile, id: 6 },
];

const PersonalAccountMenuMobile = (props: MobileMenuProps) => {
	const { menuIsOpen, setMenuIsOpen, menuRef } = props;
	const [loginAdvanceIsShow, setLoginAdvanceIsShow] = useState(true);

	useEffect(() => {
		if (menuIsOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [menuIsOpen]);

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
						{/* <FontAwesomeIcon
							color={"#fff"}
							width={20}
							height={20}
							onClick={() => setMenuIsOpen(false)}
							icon={faArrowLeft}
						/> */}

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
				<div className="mobile-menu-personal-account_come-to-menu">
					{/* <AdvanceLogin
						isShow={loginAdvanceIsShow}
						setIsShow={setLoginAdvanceIsShow}
					/>
					<div className="mobile-menu_login mt-4">
						<img src={loginIcon} alt={"login"} />
						<h5>Войти в ЛК</h5>
					</div> */}
					<img src={arrow} alt="" />
					<p>Вернуться в меню</p>
				</div>
			</div>
		</div>
	);
};

export default PersonalAccountMenuMobile;
