import React, { useEffect, useState } from "react";
// import callIcon from "../../img/common/Phone-header.svg";
// import callIconDark from "../../img/common/Phone-header-dark.svg"; // header phone icons
import logoDark from "./../../images/logo-dark.svg";
import logoDarkCred from "./../../images/logo-dark-cred.svg";
import logoLight from "./../../images/logo-light.svg";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CallRequestForm from "../common/CallRequestForm";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons/faPhoneVolume";
import ModalFormTemplate from "../common/ModalFormTemplate";
import { MobileModal } from "../common/MobileModal/MobileModal";
import callIcon from "./../../images/common/Phone-header.svg";
import callIconDark from "./../../images/common/Phone-header-dark.svg";
import AuthForm from "../common/AuthForm";

export type HeaderType = "transparent" | "white" | "logo";
export type HeaderImage = "dark" | "darkCred" | "light";
export type HeaderLink = {
	text: string;
	path?: string;
	className?: string;
};
export type HeaderProps = {
	type: HeaderType;
	image?: HeaderImage;
	links?: Array<HeaderLink>;
	selectedLink?: string;
	burgerMenuIsShow?: boolean;
	setBurgerMenuIsShow?: any;
};

export const defaultLinks = [
	{ text: "Главная", path: "/", className: "" },
	{ text: "Выкуп", path: "/catalog", className: "" },
	{ text: "Программы", path: "/programs", className: "" },
	{ text: "Аренда", path: "/rent", className: "" },
	{ text: "Вопросы", path: "/faq", className: "" },
	{ text: "Контакты", path: "/contacts", className: "" },
];
export const HeaderLogoImage: React.FC<{
	image: HeaderImage;
	height?: string | number;
	width?: string | number;
}> = ({ image = "dark", height = "38px", width = "auto" }) => {
	return (
		<Link to={"/"}>
			<img
				style={{ height: height, width: width, objectFit: "contain" }}
				src={
					image === "dark"
						? logoDark
						: image === "light"
						? logoLight
						: logoDarkCred
				}
				alt={"Восход"}
			/>
		</Link>
	);
};

export const HeaderLinks: React.FC<{
	links: Array<HeaderLink>;
	light?: boolean;
	selected?: string;
}> = ({ links, light = false, selected = "/" }) => {

	const [authOpened, setAuthOpened] = useState(false);

	return (
		<div className={"header-links"}>
			<div className={"d-none d-lg-flex align-items-center"}>
				{links.map((i, ind) => (
					<Link
						key={ind}
						to={i.path ?? "/"}
						className={
							"header-link " +
							(light ? "light " : "") +
							(selected === i.path ? "selected " : "") +
							i.className
						}>
						{i.text}
					</Link>
				))}
			</div>
			<div className={"header-controls"}>

				<AuthForm light={light} />

				<CallRequestForm
					text={
						<span className={"font-weight-semibold"}>
							Заказать звонок&nbsp;&nbsp;&nbsp;
							<FontAwesomeIcon icon={faArrowRight} />
						</span>
					}
					small={true}
					light={light}
				/>
			</div>
		</div>
	);
};

export const LogoHeader: React.FC<{ image?: HeaderImage }> = ({
	image = "dark",
}) => {
	return (
		<div className={"d-flex w-100 justify-content-center py-4"}>
			<HeaderLogoImage image={image} height={"41px"} width={"172px"} />
		</div>
	);
};

export const WhiteHeader: React.FC<{
	image?: HeaderImage;
	links: Array<HeaderLink>;
	selected?: string;
	show?: boolean;
	setMenuIsShow: any;
	setMobileModal: (e: boolean) => void;
}> = ({
	image = "dark",
	links,
	selected,
	show = false,
	setMenuIsShow,
	setMobileModal,
}) => {
	return (
		<>
			<div
				className={"py-3 bg-white opacity-" + (show ? 100 : 0)}
				style={{
					boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.07)",
					transition: "all 0.2s ease-out",
				}}>
				<Container fluid={"xxl"}>
					<div className={"header-mobile"}>
						<FontAwesomeIcon
							onClick={() => setMenuIsShow(true)}
							className="header-mobile_burger header-mobile_burger_dark"
							icon={faBars}
						/>

						<HeaderLogoImage height={"24px"} width={"100px"} image={image} />
						{/*<FontAwesomeIcon className='header-mobile_phone header-mobile_phone_dark' icon={faPhoneVolume} />*/}
						<CallRequestForm className="d-none d-md-block" light={false} />
						<img
							src={callIconDark}
							className="d-block d-md-none"
							onClick={() => setMobileModal(true)}
							alt="order call"
						/>
					</div>
					<div className={"header-desktop"}>
						<HeaderLogoImage image={image} />
						<HeaderLinks selected={selected} links={links ?? defaultLinks} />
					</div>
				</Container>
			</div>
		</>
	);
};
export const TransparentHeader: React.FC<{
	links: Array<HeaderLink>;
	selected?: string;
	setMenuIsShow: any;
	setMobileModal: (e: boolean) => void;
}> = ({ links, selected, setMenuIsShow, setMobileModal }) => {
	// const func = async () => {
	//
	//     // setTimeout(function (){
	//     //     let start = Date.now();
	//     //     console.log("start long: " + start)
	//     //     while((start + 10000) > Date.now()){
	//     //
	//     //     }
	//     //     console.log('loooong time: ' + Date.now());
	//     // }, 100);
	//     // setTimeout(function (){
	//     //     console.log('short time' + Date.now());
	//     // }, 200);
	//
	//     const sleep = async(time)=>{
	//         let start = Date.now();
	//         while((start + time) > Date.now()){
	//         }
	//     }
	//     const f = async (time, name, state) => {
	//         let start = Date.now();
	//         console.log(`start ${name} promise (+${time}): ` + (Date.now() % 100000), ' main thread state:' + state)
	//         while((start + time) > Date.now()){
	//             await sleep(100)
	//         }
	//     }
	//
	//
	//     console.log("================")
	//     console.log("start main thread " + (Date.now() % 100000))
	//     console.log("----")
	//     let state = 'long';
	//     new Promise<void>(async function(resolver){
	//         console.log('start long task: ' + (Date.now() % 100000), ' main thread state:' + state);
	//         let max = 2000, counter = 0;
	//         while(counter < max){
	//             let random = Math.floor(Math.random() * 100);
	//             await sleep(random)
	//             counter = Math.min(counter + random, max);
	//             console.log('long promise progress: +' + (random / (max/100)) + "%, total: " + (counter / (max/100)));
	//         }
	//         console.log('end long promise: ' + (Date.now() % 100000), ' main thread state:' + state);
	//         resolver();
	//     }).then(()=>{
	//         console.log('end long task: ' + (Date.now() % 100000), ' main thread state:' + state);
	//     })
	//
	//     state = 'short';
	//     new Promise<void>(async function(resolver){
	//         console.log('start short task: ' + (Date.now() % 100000), ' main thread state:' + state);
	//         let max = 1000, counter = 0;
	//         while(counter < max){
	//             let random = Math.floor(Math.random() * 100);
	//             await sleep(random)
	//             counter = Math.min(counter + random, max);
	//             console.log('short promise progress: +' + (random / (max/100)) + "%, total: " + (counter / (max/100)));
	//         }
	//         console.log('end short promise: ' + (Date.now() % 100000), ' main thread state:' + state);
	//         resolver();
	//     }).then(()=>{
	//         const f1 = async() =>{
	//             console.log('end short task: ' + (Date.now() % 100000), ' main thread state:' + state);
	//         }
	//         f1();
	//     })
	//
	//     state='ended';
	//     console.log("end main thread " + (Date.now() % 100000))
	//     console.log("----")
	// }

	return (
		<div
			className={"py-3 position-absolute w-100 top-0 left-0"}
			style={{ zIndex: 1000 }}>
			<Container fluid={"xxl"}>
				<div className={"header-mobile"}>
					<FontAwesomeIcon
						className="header-mobile_burger header-mobile_burger_light"
						icon={faBars}
						onClick={() => setMenuIsShow(true)}
					/>
					<HeaderLogoImage height={"24px"} width={"100px"} image={"light"} />
					<CallRequestForm className="d-none d-md-block" light={true} />
					<img
						src={callIcon}
						onClick={() => setMobileModal(true)}
						className="d-block d-md-none"
						alt=""
					/>
				</div>
				<div className={"header-desktop"}>
					<HeaderLogoImage image={"light"} />
					<HeaderLinks
						light={true}
						selected={selected}
						links={links ?? defaultLinks}
					/>
					{/*<button onClick={()=>func()}>Click me</button>*/}
				</div>
			</Container>
		</div>
	);
};
const Header: React.FC<HeaderProps> = ({
	type = "white",
	image = "dark",
	links = defaultLinks,
	selectedLink,
	setBurgerMenuIsShow,
	burgerMenuIsShow,
}: HeaderProps) => {
	const [showWhite, setShowWhite] = useState(false);
	const [callMobileModal, setCallMobileModal] = useState(false);

	useEffect(() => {
		let handler = () => {
			if (window.pageYOffset > 150 && !showWhite) setShowWhite(true);
			else if (window.pageYOffset <= 50 && !showWhite) setShowWhite(false);
		};
		window.addEventListener("scroll", handler);
		// return () => {
		//     window.removeEventListener('scroll', handler);
		// }
	});

	if (type === "logo") return <LogoHeader image={image} />;
	return (
		<>
			<div className={"header "}>
				{type === "transparent" && !showWhite && (
					<TransparentHeader
						setMenuIsShow={setBurgerMenuIsShow}
						selected={selectedLink}
						links={links}
						setMobileModal={setCallMobileModal}
					/>
				)}
				<WhiteHeader
					show={type !== "transparent" || showWhite}
					image={image}
					links={links}
					setMenuIsShow={setBurgerMenuIsShow}
					selected={selectedLink}
					setMobileModal={setCallMobileModal}
				/>
			</div>
			<MobileModal active={callMobileModal} setActive={setCallMobileModal} />
		</>
	);
};

export default Header;
