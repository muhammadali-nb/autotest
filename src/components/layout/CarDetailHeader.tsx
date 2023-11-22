import { useEffect, useState } from "react";
import callIconDark from "./../../images/common/Phone-header-dark.svg";

import {
	HeaderImage,
	HeaderLink,
	HeaderLinks,
	HeaderLogoImage,
	HeaderProps,
	LogoHeader,
	defaultLinks,
} from "./Header";
import { Container } from "react-bootstrap";
import CallRequestForm from "../common/CallRequestForm";
import arrowLeft from "../../images/car-detail/arrow-left.svg";
import { Link, useNavigate } from "react-router-dom";
import { MobileModal } from "../common/MobileModal/MobileModal";

export const WhiteHeader: React.FC<{
	image?: HeaderImage;
	links: Array<HeaderLink>;
	selected?: string;
	show?: boolean;
	setMenuIsShow?: (e: boolean) => void;
	setMobileModal: (e: boolean) => void;
	backLink?: string;
}> = ({
	image = "dark",
	links,
	selected,
	show = false,
	setMenuIsShow,
	setMobileModal,
	backLink,
}) => {
	const navigate = useNavigate();

	const goBack = () => {
		//@ts-ignore
		navigate(backLink ?? -1);
	};
	return (
		<div
			className={"py-3 bg-white opacity-" + (show ? 100 : 0)}
			style={{
				boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.07)",
				transition: "all 0.2s ease-out",
			}}>
			<Container fluid={"xxl"}>
				<div className={"header-mobile"}>
					<div onClick={goBack}>
						<img src={arrowLeft} alt="" />
					</div>
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
	);
};

export const TransparentHeader: React.FC<{
	links: Array<HeaderLink>;
	selected?: string;
	setMenuIsShow?: (e: boolean) => void;
	backLink?: string;
}> = ({ links, selected, setMenuIsShow, backLink }) => {
	const navigate = useNavigate();
	const goBack = () => {
		//@ts-ignore
		navigate(backLink ?? -1);
	};

	return (
		<div
			className={"py-3 position-absolute w-100 top-0 left-0"}
			style={{ zIndex: 1000 }}>
			<Container fluid={"xxl"}>
				<div className={"header-mobile"}>
					<div onClick={goBack}>
						<img src={arrowLeft} alt="" />
					</div>
					<HeaderLogoImage height={"24px"} width={"100px"} image={"light"} />
					<CallRequestForm light={true} />
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

const CarDetailHeader: React.FC<HeaderProps> = ({
	type = "white",
	image = "dark",
	links = defaultLinks,
	selectedLink,
	backLink,
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
						selected={selectedLink}
						backLink={backLink}
						links={links}
					/>
				)}
				<WhiteHeader
					show={type !== "transparent" || showWhite}
					image={image}
					links={links}
					backLink={backLink}
					selected={selectedLink}
					setMobileModal={setCallMobileModal}
				/>
			</div>
			<MobileModal active={callMobileModal} setActive={setCallMobileModal} />
		</>
	);
};

export default CarDetailHeader;
