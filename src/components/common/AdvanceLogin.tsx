import React, { Dispatch } from "react";
import closeIcon from "../../images/common/mobile_menu-icons/close-advance.svg";

interface AdvanceLoginProps {
	isShow: boolean;
	setIsShow: Dispatch<boolean>;
}
const AdvanceLogin = (props: AdvanceLoginProps) => {
	const { isShow, setIsShow } = props;

	return (
		<div className={`mobile-menu_advance ${isShow && "active"} `}>
			<div className="mobile-menu_advance_content">
				<h5>Войдите в личный кабинет</h5>
				<p>Бронировать и арендовать автомобили станет быстрее и удобнее</p>
			</div>
			<div
				className="mobile-menu_advance_close"
				onClick={() => setIsShow(false)}>
				<img src={closeIcon} alt="close" />
			</div>
		</div>
	);
};

export default AdvanceLogin;
