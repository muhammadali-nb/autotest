import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";

const PersonalAccountMenuBurger = ({
	onClick,
	className,
	style,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement>;
	className?: string;
	style?: CSSProperties;
}) => {
	return (
		<div
			className={"personal-account_mobile-burger " + (className ?? "")}
			style={style}
			onClick={onClick}>
			<FontAwesomeIcon icon={faBars} />
		</div>
	);
};

export default PersonalAccountMenuBurger;
