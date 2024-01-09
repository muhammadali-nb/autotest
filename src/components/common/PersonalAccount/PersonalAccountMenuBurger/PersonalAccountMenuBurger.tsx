import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PersonalAccountMenuBurger = ({
	onClick,
	className,
	style,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement>;
	className?: string;
	style?: CSSProperties;
}) => {
	const [upper, setUpper] = useState(false);

	const location = useLocation();

	useEffect(() => {
		if ((location.pathname === "/personal-account/fines" || location.pathname === "/personal-account/transactions") && window.innerWidth < 1024) {
			setUpper(true);
		} else {
			setUpper(false);
		}
	}, []);

	return (
		<div
			className={"personal-account_mobile-burger " + (className ?? "" + (upper ? "upper": ""))}
			style={style}
			onClick={onClick}>
			<FontAwesomeIcon icon={faBars} />
		</div>
	);
};

export default PersonalAccountMenuBurger;
