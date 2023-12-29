import React, { useEffect } from "react";
import "./MobileModal.scss";
import call from "../../../images/common/phone-call.svg";
import back from "../../../images/common/back.svg";
import { HeaderLogoImage } from "../../layout/Header";
import MobileAuthForm from "./MobileAuthForm";
import MobileOrderCall from "./MobileOrderCall";
import MobileCarRequestForm from "./MobileCarRequestForm";
import MobileEditPhone from "./MobileEditPhone";
import MobileEditEmail from "./MobileEditEmail";
import WithdrawConfirmPhone from "../PersonalAccount/PersonalAccountWithdraw/mobile/WithdrawConfirmPhone";
import MobileAddBankCard from "./payment/MobileAddBankCard";
import MobileAddScoreCard from "./payment/MobileAddScoreCard";

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
				{(type === "rent" || !type) && (
					<MobileCarRequestForm closeFn={() => setActive(false)} />
				)}
				{type === "auth" && (
					<MobileAuthForm closeFunc={() => setActive(false)} />
				)}
				{type === "orderCall" && (
					<MobileOrderCall closeFunc={() => setActive(false)} />
				)}
				{type === "editPhone" && (
					<MobileEditPhone closeFunc={() => setActive(false)} isActive={active} />
				)}
				{type === "editEmail" && (
					<MobileEditEmail closeFunc={() => setActive(false)} />
				)}
				{type === "withdrawConfirm" && (
					<WithdrawConfirmPhone closeFunc={() => setActive(false)} />
				)}
				{type === "paymentAddBankCard" && (
					<MobileAddBankCard closeFn={() => setActive(false)} />
				)}
				{type === "paymentAddScoreCard" && (
					<MobileAddScoreCard closeFn={() => setActive(false)} />
				)}
			</div>
		</div>
	);
};
