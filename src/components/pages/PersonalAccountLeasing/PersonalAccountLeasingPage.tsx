import React from "react";
import PersonalAccountLeasingLayout from "../../layout/PersonalAccountLayout/PersonalAccountLeasingLayout";
import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import PersonalAccountLeasingCard from "./PersonalAccountLeasingCard/PersonalAccountLeasingCard";

const PersonalAccountLeasingPage = () => {
	return (
		<PersonalAccountLeasingLayout>
			<PersonalAccountHeader>
				<h1 className="personal-account-header_title">Лизинг</h1>
				<PersonalAccountBalance />
			</PersonalAccountHeader>
			<div>
				<PersonalAccountLeasingCard />
			</div>
		</PersonalAccountLeasingLayout>
	);
};

export default PersonalAccountLeasingPage;
