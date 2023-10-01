import React, { useEffect, useState } from "react";
import caret from "./../../img/common/caret-up-white.png";
import mobileIcon from "../../img/common/footer/arrow-scroller.svg";

const Scroller = () => {
	const [show, setShow] = useState(false);
	useEffect(() => {
		let handler = () => {
			if (window.pageYOffset > 50 && !show) setShow(true);
			else if (window.pageYOffset <= 50 && !show) setShow(false);
		};

		window.addEventListener("scroll", handler);
		// return () => {
		//     window.removeEventListener('scroll', handler);
		// }
	});
	return (
		<button
			className={"scroller " + (show ? "show" : "")}
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}}>
			<img src={caret} className="d-none d-md-block" alt="" />
			<img src={mobileIcon} className="d-block d-md-none" alt="" />
		</button>
	);
};

export default Scroller;
