import React, { ReactNode } from "react";
import { PaginatedResponse } from "../../Api";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faAngleRight,
	faAnglesLeft,
	faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

const PaginationItem: React.FC<{
	children: string | ReactNode;
	link: string;
	active?: boolean;
	[x: string]: any;
}> = (props) => {
	return (
		<Link
			{...props}
			to={props.link}
			className={"paginator-btn" + (props.active ? " active" : "")}>
			{props.children}
		</Link>
	);
};
const PaginationArrow: React.FC<{
	children: string | ReactNode;
	link: string;
	disabled?: boolean;
	[x: string]: any;
}> = (props) => {
	return (
		<>
			{props.disabled && (
				<div className={"paginator-arrow disabled"}>{props.children}</div>
			)}
			{!props.disabled && (
				<Link
					{...props}
					to={props.link}
					className={"paginator-arrow " + (props.disabled ? " disabled" : "")}>
					{props.children}
				</Link>
			)}
		</>
	);
};

const Paginator: React.FC<{ data: PaginatedResponse }> = ({ data }) => {
	let items: Array<ReactNode> = [];
	let [params] = useSearchParams();
	const page = Number.parseInt(params.get("page") ?? "1");
	let path = window.location.pathname;
	const link = (page: number) => {
		let old = params.get("page");
		params.set("page", page.toString());
		let p = path + "?" + params.toString();
		if (old) params.set("page", old);
		else params.delete("page");
		return p;
	};
	for (
		let number = Math.max(1, page - 2);
		number <= Math.min(data.pages, page + 2);
		number++
	) {
		items.push(
			<PaginationItem link={link(number)} key={number} active={number === page}>
				{number}
			</PaginationItem>
		);
	}
	if (data.pages <= 1) {
		return <></>;
	}
	return (
		<div className={"paginator"}>
			<PaginationArrow disabled={page <= 3} link={link(1)}>
				<FontAwesomeIcon icon={faAnglesLeft} />
			</PaginationArrow>
			<PaginationArrow disabled={page <= 1} link={link(page - 1)}>
				<FontAwesomeIcon icon={faAngleLeft} />
			</PaginationArrow>
			{/*{page > 3 && <PaginationFiller  />}*/}

			{items}

			{/*{page < (data.pages - 3) && <PaginationFiller  />}*/}
			<PaginationArrow disabled={page === data.pages} link={link(page + 1)}>
				<FontAwesomeIcon icon={faAngleRight} />
			</PaginationArrow>
			<PaginationArrow
				disabled={page >= data.pages - 3}
				link={link(data.pages)}>
				<FontAwesomeIcon icon={faAnglesRight} />
			</PaginationArrow>
		</div>
	);
};

export default Paginator;
