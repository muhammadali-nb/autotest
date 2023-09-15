import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Cookies = () => {
	const [show, setShow] = useState(
		!localStorage.getItem("hideCookiesReminder")
	);
	const hide = () => {
		localStorage.setItem("hideCookiesReminder", "1");
		setShow(false);
	};
	return (
		<div className={"cookies " + (show ? "show" : "")}>
			<div className={"flex-grow-1"}>
				<div className={" cookies_header"}>Мы используем файлы-сookies</div>
				<div className={"cookies_description"}>
					Продолжая использовать этот сайт вы даёте своё согласие на работу с
					этими файлами
				</div>
			</div>
			<button
				className={" border-0 p-2 bg-transparent text-white d-flex"}
				onClick={() => hide()}>
				<FontAwesomeIcon icon={faCircleXmark} />
			</button>
		</div>
	);
};

export default Cookies;
