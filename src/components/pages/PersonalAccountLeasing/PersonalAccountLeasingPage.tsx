import React from "react";
import PersonalAccountLeasingLayout from "../../layout/PersonalAccountLayout/PersonalAccountLeasingLayout";
import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import PersonalAccountLeasingCard from "./PersonalAccountLeasingCard/PersonalAccountLeasingCard";
import { IPersonalAccountLeasingCarData } from "../../../types/PersonalAccount/LeasingTypes";
import carImage from "../../../images/index/car.webp";
const data: IPersonalAccountLeasingCarData[] = [
	{
		id: 1,
		car: {
			image: carImage,
			brand: "Hyundai",
			model: "Sonata",
			regnum: "К638ЕТ 53",
			payment: 5900,
		},
		payment: { price: 3000, date: "12.12.2023 до 00:00" },
		payment_status: {
			status: "success",
			status_message: "",
			date: "12.07.2023 до 00:00",
		},
		bank_accounts: {
			osago: {
				to: "0000000",
				number: "00.00.0000",
			},
			kasko: {
				to: "0000000",
				number: "00.00.0000",
			},
			deal_number: "00000000000000",
			deal_date: "16.06.2023",
		},
	},
];

const PersonalAccountLeasingPage = () => {
	return (
		<PersonalAccountLeasingLayout>
			<PersonalAccountHeader>
				<h1 className="personal-account-header_title">Лизинг</h1>
				<PersonalAccountBalance />
			</PersonalAccountHeader>
			<div>
				{data.map((_item) => (
					<PersonalAccountLeasingCard key={_item.id} car={_item} />
				))}
			</div>
		</PersonalAccountLeasingLayout>
	);
};

export default PersonalAccountLeasingPage;
