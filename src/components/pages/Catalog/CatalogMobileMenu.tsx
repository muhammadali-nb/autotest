import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { HeaderLogoImage } from "../../layout/Header";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../store/hooks";
import { FilterCommon } from "../Rent/FiltersBlock";

const CatalogMobileMenu = ({
	isActive,
	setIsActive,
	data,
}: {
	isActive: boolean;
	setIsActive: (e: boolean) => void;
	data: any;
}) => {
	const baseData: any = useAppSelector((state) => state.baseData);

	useEffect(() => {
		if (isActive) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [isActive]);

	return (
		<div className={`filter-menu ${isActive && "active"}  `}>
			<div className="filter-menu_scroller">
				<div className="filter-menu_header">
					<FontAwesomeIcon
						icon={faArrowLeft}
						onClick={() => setIsActive(false)}
					/>
					<HeaderLogoImage image={"dark"} width={100} height={24} />
					<FontAwesomeIcon icon={faCheck} onClick={() => setIsActive(false)} />
				</div>
				<div className="filter-menu_body">
					{data &&
						Object.entries(data.left).map(([key, value]: any) => (
							<FilterCommon field={key} key={key} data={value} />
						))}
				</div>
			</div>
		</div>
	);
};

export default CatalogMobileMenu;
