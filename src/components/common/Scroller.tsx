import React, { useEffect, useState } from "react";
import caret from "./../../images/common/caret-up-white.png";
import mobileIcon from "../../images/common/footer/arrow-scroller.svg";
import { useLocation } from "react-router-dom";

const Scroller = ({ className }: { className?: string }) => {
	const [show, setShow] = useState(false);
	const [upper, setUpper] = useState(false);

	const location = useLocation();

	useEffect(() => {
		let handler = () => {
			if (window.pageYOffset > 50 && !show) setShow(true);
			else if (window.pageYOffset <= 50 && !show) setShow(false);
		};

		if (location.pathname === "/personal-account/fines" && window.innerWidth < 1024) {
			setUpper(true);
		} else {
			setUpper(false);
		}

		window.addEventListener("scroll", handler);
		// return () => {
		//     window.removeEventListener('scroll', handler);
		// }
		
	});
	return (
		<button
			className={"scroller " + (show ? "show " : "") + (className ?? "") + (upper ? "upper": "")}
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}>
			<img src={caret} className="d-none d-md-block" alt="" />
			<img src={mobileIcon} className="d-block d-md-none" alt="" />
		</button>
	);
};

export default Scroller;
