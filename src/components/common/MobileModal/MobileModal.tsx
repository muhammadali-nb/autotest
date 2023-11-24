import React, { useEffect } from "react";
import "./MobileModal.scss";

import call from "../../../images/common/phone-call.svg";
import back from "../../../images/common/back.svg";
import { HeaderLogoImage } from "../../layout/Header";
import { Link } from "react-router-dom";
import MobileAuthForm from "./MobileAuthForm";
import MobileOrderCall from "./MobileOrderCall";
import MobileCarRequestForm from "./MobileCarRequestForm";

export const MobileModal = ({
	active,
	setActive,
	type,
}: {
	active: boolean;
	setActive: (e: boolean) => void;
	type?: string;
}) => {
	useEffect(() => {
		if (active) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [active]);

	return (
		<div className={`mobile-modal ${active && "active"}`}>
			<div className="mobile-modal_header">
				<div className="mobile-modal_header-top">
					<img src={back} onClick={() => setActive(false)} alt="" />
					<HeaderLogoImage width={"100px"} height={"24px"} image="light" />
					<img src={call} alt="" />
				</div>
				<div className="mobile-modal_header-bottom">
					<h3>
						Доступные <br /> автомобили
					</h3>
					<p>
						С нами просто. <br /> Индивидуальные решения для вас
					</p>
				</div>
			</div>
			<div className="mobile-modal_body">
				{(type === "rent" || !type) && <MobileCarRequestForm />}
				{type === "auth" && (
					<MobileAuthForm closeFunc={() => setActive(false)} />
				)}
				{type === "orderCall" && (
					<MobileOrderCall closeFunc={() => setActive(false)} />
				)}
			</div>
		</div>
	);
};
