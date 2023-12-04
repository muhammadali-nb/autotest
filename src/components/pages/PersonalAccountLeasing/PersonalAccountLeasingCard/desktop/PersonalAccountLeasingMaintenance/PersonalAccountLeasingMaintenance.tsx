import React from "react";
import PersonalAccountLeasingCardPagination from "../../PersonalAccountLeasingCardPagination";
import PersonalAccountLeasingCardHeader from "../../PersonalAccountLeasingTableHeader";
import { PersonalAccountLeasingMaintenanceRow } from "./PersonalAccountLeasingMaintenanceRow";

const PersonalAccountLeasingMaintenance = () => {
	return (
		<div className="personal-account-leasing-car_card_maintenace">
			<PersonalAccountLeasingCardHeader>
				<h3>TO</h3>
				<PersonalAccountLeasingCardPagination />
			</PersonalAccountLeasingCardHeader>
			<div className="personal-account-leasing-car_card_maintenace-table_body">
				<PersonalAccountLeasingMaintenanceRow type="header" />
				{[...new Array(15)].map((_item, index) => (
					<PersonalAccountLeasingMaintenanceRow
						type="row"
						key={index}
						className={index % 2 !== 0 ? "odd_row" : ""}
					/>
				))}
			</div>
		</div>
	);
};

export default PersonalAccountLeasingMaintenance;
