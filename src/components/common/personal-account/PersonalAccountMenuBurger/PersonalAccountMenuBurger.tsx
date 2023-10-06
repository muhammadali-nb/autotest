import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PersonalAccountMenuBurger = () => {
	return (
		<div className="personal-account_mobile-burger">
			<FontAwesomeIcon icon={faBars} />
		</div>
	);
};

export default PersonalAccountMenuBurger;
