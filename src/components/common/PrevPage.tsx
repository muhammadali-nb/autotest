import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const PrevPage = ({
	link,
	className,
}: {
	link: string;
	className?: string;
}) => {
	return (
		<Link
			to={link ?? "/"}
			className={
				"btn btn-link d-flex font-weight-semibold font-size-18 align-items-center text-uppercase default-link text-hover-default " +
				className
			}>
			<FontAwesomeIcon icon={faAngleLeft} size={"sm"} />
			&nbsp;&nbsp;Вернуться в каталог
		</Link>
	);
};

export default PrevPage;
