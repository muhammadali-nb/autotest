import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { HeaderLogoImage } from "../../layout/Header";
import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../../store/hooks";
import { FilterCommon } from "./FiltersBlock";

const CatalogMobileMenu = ({
	isActive,
	setIsActive,
}: {
	isActive: boolean;
	setIsActive: (e: boolean) => void;
}) => {
	const baseData = useAppSelector((state) => state.baseData);
	return (
		<div className={`filter-menu ${isActive && "active"}  `}>
			<div>
				<div className="filter-menu_header">
					<FontAwesomeIcon
						icon={faArrowLeft}
						onClick={() => setIsActive(false)}
					/>
					<HeaderLogoImage image={"dark"} width={100} height={24} />
					<FontAwesomeIcon icon={faCheck} onClick={() => setIsActive(false)} />
				</div>
				<div className="filter-menu_body">
					<div className="filter-menu_body-content">
						{Object.entries(baseData.left).map(([key, value]) => (
							<FilterCommon field={key} key={key} data={value} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CatalogMobileMenu;
