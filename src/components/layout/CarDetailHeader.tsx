import { useEffect, useState } from "react";
import callIconDark from "./../../img/common/Phone-header-dark.svg";

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
import arrowLeft from "../../img/car-detail/arrow-left.svg";
import { Link, useNavigate } from "react-router-dom";
import { MobileModal } from "../common/MobileModal/MobileModal";

export const WhiteHeader: React.FC<{
	image?: HeaderImage;
	links: Array<HeaderLink>;
	selected?: string;
	show?: boolean;
	setMenuIsShow?: (e: boolean) => void;
	setMobileModal: (e: boolean) => void;
}> = ({
	image = "dark",
	links,
	selected,
	show = false,
	setMenuIsShow,
	setMobileModal,
}) => {
	const navigate = useNavigate();
	return (
		<div
			className={"py-3 bg-white opacity-" + (show ? 100 : 0)}
			style={{
				boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.07)",
				transition: "all 0.2s ease-out",
			}}>
			<Container fluid={"xxl"}>
				<div className={"header-mobile"}>
					<div onClick={() => navigate(-1)}>
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
}> = ({ links, selected, setMenuIsShow }) => {
	const navigate = useNavigate();
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
					<div onClick={() => navigate(-1)}>
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
					<TransparentHeader selected={selectedLink} links={links} />
				)}
				<WhiteHeader
					show={type !== "transparent" || showWhite}
					image={image}
					links={links}
					selected={selectedLink}
					setMobileModal={setCallMobileModal}
				/>
			</div>
			<MobileModal active={callMobileModal} setActive={setCallMobileModal} />
		</>
	);
};

export default CarDetailHeader;
