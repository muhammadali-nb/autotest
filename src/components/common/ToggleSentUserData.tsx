import React, { useEffect, useState } from "react";
import messageIcon from "../../img/common/message.svg";
import closeIcon from "../../img/common/close.svg";
import ContactsForm from "./ContactsForm";
import { useOutside } from "../../hooks/useOutside";

const ToggleSentUserData = () => {
	const [buttonIsShow, setButtonIsShow] = useState(false);
	const { setIsShow, isShow, ref } = useOutside(false);
	useEffect(() => {
		let handler = () => {
			if (window.pageYOffset > 2000 && !buttonIsShow) setButtonIsShow(true);
			else if (window.pageYOffset <= 2000 && !buttonIsShow)
				setButtonIsShow(false);
			setIsShow(false);
		};

		window.addEventListener("scroll", handler);
		// return () => {
		//     window.removeEventListener('scroll', handler);
		// }
	});

	return (
		<div ref={ref}>
			{isShow && (
				<div className={`toggle_sent-data-mobile-form ${isShow && "active"}`}>
					<ContactsForm toggle={true} />
				</div>
			)}
			<button
				className={`toggle_sent-data-mobile ${
					isShow && "toggle_sent-data-mobile-close"
				} ${buttonIsShow && "show"}`}
				onClick={() => setIsShow(!isShow)}>
				{!isShow ? (
					<img src={messageIcon} alt="message sent" />
				) : (
					<img src={closeIcon} alt="close message sent" />
				)}
			</button>
		</div>
	);
};

export default ToggleSentUserData;
