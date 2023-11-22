import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
	return (
		<div
			className={
				"d-flex w-100 text-center text-muted align-items-center justify-content-center"
			}
			style={{ minHeight: "40vh" }}>
			<div className={"loader"}>
				<FontAwesomeIcon icon={faGear} size={"2x"} />
			</div>
		</div>
	);
};

export default Loader;
