import React, { useEffect, useState } from "react";
import PersonalAccountLeasingCardPagination from "../../PersonalAccountLeasingCardPagination";
import PersonalAccountLeasingCardHeader from "../../PersonalAccountLeasingTableHeader";
import { PersonalAccountLeasingMaintenanceRow } from "./PersonalAccountLeasingMaintenanceRow";
import { TypeMaintenceTableRow } from "../../../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	maintenanceList: TypeMaintenceTableRow[];
}

const PersonalAccountLeasingMaintenance = (props: IProps) => {
	const { maintenanceList } = props;
	const [activePage, setActivePage] = useState(0);

	const sortedArray = () => {
		const result: TypeMaintenceTableRow[][] = [];

		for (let i = 0; i < maintenanceList.length; i += 15) {
			const fifteenWords = maintenanceList.slice(i, i + 15);

			result.push(fifteenWords);
		}

		
		return result;
	};

	return (
		<div className="personal-account-leasing-car_card_maintenace">
			<PersonalAccountLeasingCardHeader>
				<h3>TO</h3>
				<PersonalAccountLeasingCardPagination
					setActive={setActivePage}
					list={sortedArray()}
					active={activePage}
				/>
			</PersonalAccountLeasingCardHeader>
			<div className="personal-account-leasing-car_card_maintenace-table_body">
				<PersonalAccountLeasingMaintenanceRow type="header" />
				{sortedArray()[activePage].map((_item, index) => (
					<PersonalAccountLeasingMaintenanceRow
						type="row"
						key={index}
						data={_item}
						className={index % 2 !== 0 ? "odd_row" : ""}
					/>
				))}
			</div>
		</div>
	);
};

export default PersonalAccountLeasingMaintenance;
