import { RefObject, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderLogoImage } from "./Header";

//icons
import { useAuth } from "../../hooks/useAuth";
import arrow from "../../images/common/menu-arrow.svg";
import car from "../../images/common/mobile_menu-icons/car.svg";
import dashboard from "../../images/common/mobile_menu-icons/dashboard.svg";
import house from "../../images/common/mobile_menu-icons/house.svg";
import loginIcon from "../../images/common/mobile_menu-icons/login.svg";
import phone from "../../images/common/mobile_menu-icons/phone.svg";
import question from "../../images/common/mobile_menu-icons/question.svg";
import ticked from "../../images/common/mobile_menu-icons/ticked.svg";
import Utils from "../../utils/Utils";
import AdvanceLogin from "../common/AdvanceLogin";
import { MobileModal } from "../common/MobileModal/MobileModal";

interface MobileMenuProps {
	menuIsOpen: boolean;
	setMenuIsOpen: (e: boolean) => void;
	menuRef: RefObject<HTMLDivElement>;
}

const defaultLinks = [
	{ text: "Главная", path: "/", className: "", icon: house, id: 1 },
	{ text: "Выкуп", path: "/catalog", className: "", icon: car, id: 2 },
	{
		text: "Программы",
		path: "/programs",
		className: "",
		icon: dashboard,
		id: 3,
	},
	{ text: "Аренда", path: "/rent/page/1", className: "", icon: ticked, id: 4 },
	{ text: "Вопросы", path: "/faq", className: "", icon: question, id: 5 },
	{ text: "Контакты", path: "/contacts", className: "", icon: phone, id: 6 },
];

const MobileMenu = (props: MobileMenuProps) => {
	const { menuIsOpen, setMenuIsOpen, menuRef } = props;
	const [loginAdvanceIsShow, setLoginAdvanceIsShow] = useState(true);
	const [authIsOpen, setAuthIsOpen] = useState(false);

	const { isAuthenticated, logout, first_name, last_name, phone } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (menuIsOpen) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [menuIsOpen]);

	const exit = () => {
		logout();
		navigate("/");
	};

	return (
		<div className={`mobile-menu ${menuIsOpen ? "active" : ""} `}>
			<div
				ref={menuRef}
				className={`mobile-menu_container ${menuIsOpen ? "active" : ""} `}>
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
							<img src={arrow} alt="" />
							{/* <ReactSVG src={arrow} color="#222" fill="#222" /> */}
						</div>
						<HeaderLogoImage image={"light"} width={"100px"} height={"24px"} />
					</div>
					<div>
						<ul className="mobile-menu_routes">
							{defaultLinks.map((_item) => (
								<li className="mobile-menu_routes_item" key={_item.id}>
									<Link to={_item.path}>
										<img src={_item.icon} alt={_item.text} />
										<p>{_item.text}</p>
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div>
					{!isAuthenticated ? (
						<>
							<AdvanceLogin
								isShow={loginAdvanceIsShow}
								setIsShow={setLoginAdvanceIsShow}
							/>
							<div
								className="mobile-menu_login mt-4"
								onClick={() => setAuthIsOpen(!authIsOpen)}>
								<img src={loginIcon} alt={"login"} />
								<h5>Войти в ЛК</h5>
							</div>
							<MobileModal
								active={authIsOpen}
								type={"auth"}
								setActive={setAuthIsOpen}
							/>
						</>
					) : (
						<div className="mobile-menu_user mt-4 d-flex flex-column">
							<span
								className="mb-1 fw-medium font-size-16"
								onClick={() => navigate("/personal-account")}>
								{last_name + " " + first_name}
							</span>
							{phone && (
								<span className="fw-medium font-size-12 mb-3">
									{Utils.formatPhone(phone)}
								</span>
							)}
							<button className="font-size-16 fw-medium" onClick={exit}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none">
									<path
										d="M6.66667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V2.66666C2 1.93028 2.59695 1.33333 3.33333 1.33333H6.66667"
										stroke="#222222"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M11.3333 10.6667L14 7.99999M14 7.99999L11.3333 5.33333M14 7.99999H6"
										stroke="#222222"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								Выйти
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;
