import React, { FC, ReactNode, useEffect } from "react";
import { PaginationArrow, PaginationItem } from "../Paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleLeft,
	faAngleRight,
	faAnglesLeft,
	faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { PaginatedResponse } from "../../../Api";

const RentPaginator: FC<{
	data: PaginatedResponse;
	activePage: number;
}> = ({ data, activePage }) => {
	let items: Array<ReactNode> = [];

	for (
		let number = Math.max(1, activePage - 2);
		number <= Math.min(data.pages, activePage + 2);
		number++
	) {
		items.push(
			<PaginationItem
				link={`/rent/page/${number}`}
				key={number}
				active={number === activePage}>
				{number}
			</PaginationItem>
		);
	}
	if (data.pages <= 1) {
		return <></>;
	}
	return (
		<div className={"paginator"}>
			<PaginationArrow
				disabled={activePage <= 3}
				link={`/rent/page/${activePage - 3}`}>
				<FontAwesomeIcon icon={faAnglesLeft} />
			</PaginationArrow>
			<PaginationArrow
				disabled={activePage <= 1}
				link={`/rent/page/${activePage - 1}`}>
				<FontAwesomeIcon icon={faAngleLeft} />
			</PaginationArrow>
			{/*{page > 3 && <PaginationFiller  />}*/}

			{items}

			{/*{page < (data.pages - 3) && <PaginationFiller  />}*/}
			<PaginationArrow
				disabled={activePage === data.pages}
				link={`/rent/page/${activePage + 1}`}>
				<FontAwesomeIcon icon={faAngleRight} />
			</PaginationArrow>
			<PaginationArrow
				disabled={activePage >= data.pages - 3}
				link={`/rent/page/${data.pages}`}>
				<FontAwesomeIcon icon={faAnglesRight} />
			</PaginationArrow>
		</div>
	);
};

export default RentPaginator;
