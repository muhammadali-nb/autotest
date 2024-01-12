import React, { useState } from "react";
import PersonalAccountLeasingCardPagination from "../../PersonalAccountLeasingCardPagination";
import PersonalAccountLeasingCardHeader from "../../PersonalAccountLeasingTableHeader";
import { PersonalAccountLeasingMaintenanceRow } from "./PersonalAccountLeasingMaintenanceRow";
import { TypeMaintenceTableRow } from "../../../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	maintenanceList: TypeMaintenceTableRow[];
}

const PersonalAccountLeasingMaintenance = (props: IProps) => {
	const { maintenanceList } = props;
	const [activePage, setActivePage] = useState(1);

	const sortedArray = () => {
		const result: TypeMaintenceTableRow[][] = [];
		if (maintenanceList.length > 0) {
			for (let i = 0; i < maintenanceList.length; i += 15) {
				const fifteenWords = maintenanceList.slice(i, i + 15);
				result.push(fifteenWords);
			}
		}

		return result;
	};

	return (
		<div className="personal-account-leasing-car_card_maintenace">
			<PersonalAccountLeasingCardHeader>
				<h3>TO</h3>
				{maintenanceList.length > 15 && (
					<PersonalAccountLeasingCardPagination
						setActive={setActivePage}
						active={activePage}
						totalPages={sortedArray().length}
					/>
				)}
			</PersonalAccountLeasingCardHeader>
			<div className="personal-account-leasing-car_card_maintenace-table_body">
				{maintenanceList.length > 0 ? (
					<>
						<PersonalAccountLeasingMaintenanceRow type="header" />
						{sortedArray()[activePage - 1].map((_item, index) => (
							<PersonalAccountLeasingMaintenanceRow
								type="row"
								key={index}
								data={_item}
								className={index % 2 !== 0 ? "odd_row" : ""}
							/>
						))}
					</>
				) : (
					<>
						<p className="ps-px-20 font-size-16 font-weight-semi">
							Список с тех.ослуживанием пока пуст
						</p>
					</>
				)}
			</div>
		</div>
	);
};

export default PersonalAccountLeasingMaintenance;
