import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PersonalAccountMenuBurger = ({
	onClick,
}: {
	onClick: React.MouseEventHandler<HTMLDivElement>;
}) => {
	return (
		<div className="personal-account_mobile-burger" onClick={onClick}>
			<FontAwesomeIcon icon={faBars} />
		</div>
	);
};

export default PersonalAccountMenuBurger;
