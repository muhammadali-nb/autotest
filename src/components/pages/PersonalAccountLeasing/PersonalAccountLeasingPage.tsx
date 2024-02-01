import PersonalAccountLeasingLayout from "../../layout/PersonalAccountLayout/PersonalAccountLeasingLayout";
import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import PersonalAccountLeasingCard from "./PersonalAccountLeasingCard/PersonalAccountLeasingCard";
import LeasingLoader from "./LeasingLoader";
import { useQuery } from "@tanstack/react-query";
import LoadError from "../../common/LoadError";
import leasingService from "../../../api-functions/leasing-page/leasing-service";

// const data: IPersonalAccountLeasingCarData[] = [
// 	{
// 		id: 1,
// 		car: {
// 			image: carImage,
// 			brand: "Hyundai",
// 			model: "Sonata",
// 			regnum: "К638ЕТ 53",
// 			payment: 5900,
// 		},
// 		payment: { price: 3000, date: "12.12.2023 до 00:00" },
// 		payment_status: {
// 			status: "success",
// 			status_message: "",
// 			date: "12.07.2023 до 00:00",
// 		},
// 		bank_accounts: {
// 			osago: {
// 				to: "0000000",
// 				number: "00.00.0000",
// 			},
// 			kasko: {
// 				to: "0000000",
// 				number: "00.00.0000",
// 			},
// 			deal_number: "00000000000000",
// 			deal_date: "16.06.2023",
// 		},
// 		maintance_hitory: [
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 2231443,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 530,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 412,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 2,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 			{
// 				mileage: 80000,
// 				price: 9000,
// 				status: "passed",
// 				id: 1,
// 			},
// 		],
// 		payment_history: [
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 			{
// 				type: "Платёж №45",
// 				date: "00.00.00",
// 				price: 60000,
// 				singing: true,
// 				status: "payed",
// 				id: 1,
// 			},
// 		],
// 	},
// ];

const PersonalAccountLeasingPage = () => {
	// const isLoading = false;

	const { data, isLoading, error } = useQuery({
		queryKey: ["personal-accout"],
		queryFn: () => leasingService.getLeasingCars(),
	});

	if (error) {
		if (error) return <LoadError response={error} />;
	}

	return (
		<PersonalAccountLeasingLayout>
			<PersonalAccountHeader>
				<h1 className="personal-account-header_title">Лизинг</h1>
				<PersonalAccountBalance />
			</PersonalAccountHeader>

			<div>
				{!isLoading ? (
					data?.list?.map((_item) => (
						<PersonalAccountLeasingCard key={_item.id} car={_item} />
					))
				) : (
					<LeasingLoader /> // skeleton for api
				)}
			</div>
		</PersonalAccountLeasingLayout>
	);
};

export default PersonalAccountLeasingPage;
