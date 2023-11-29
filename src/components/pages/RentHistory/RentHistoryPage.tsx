import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountCarCard from "../../common/PersonalAccount/PersonalAccountCarCard/PersonalAccountCarCard";
import PersonalAccountRentLayout from "../../layout/PersonalAccountLayout/PersonalAccountRentLayout";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import carImage from "../../../images/index/car.webp";
import { IRentHistoryData } from "../../../types/PersonalAccount/RentHistoryTypes";

const RentHistryData: IRentHistoryData[] = [
	{
		id: 1,
		car: {
			id: 1, // car id
			image: carImage,
			brand: "HYUNDAI",
			model: "SONATA",
			seria: "К638ЕТ 53",
			payment: 6920,
			deposit: 618950,
			booking_date: "16.06.2023",
		},
		payment_per_day: {
			time: "00.00.0000 до 00:00",
			price: 6950,
			status: "confirmed",
		},
		payment_result: {
			status: "waiting",
			next: "00.00.0000 до 00:00",
			price: 6340,
		},
	},
	{
		id: 2,
		car: {
			id: 2, // car id
			image: carImage,
			brand: "Porsche",
			model: "911",
			seria: "К638ЕТ 53",
			payment: 6920,
			deposit: 618950,
			booking_date: "16.06.2023",
		},
		payment_per_day: {
			time: "00:00",
			price: 6950,
			status: "new",
		},
		payment_result: {
			status: "success",
			next: "00.00.0000 до 00:00",
			price: 6340,
		},
	},
];

const RentHistoryPage = () => {
	return (
		<PersonalAccountRentLayout>
			<div className="d-none d-md-block">
				<PersonalAccountHeader />
				<div className="personal-account_page-rent_cars">
					{RentHistryData.map((_item) => (
						<PersonalAccountCarCard
							key={_item.id}
							car={_item.car}
							payment_per_day={_item.payment_per_day}
							payment_result={_item.payment_result}
						/>
					))}
				</div>
			</div>
			<div className="d-block d-md-none">
				<PersonalAccountHeaderMobile />
				<div className="personal-account_page-rent_cars">
					{RentHistryData.map((_item) => (
						<PersonalAccountCarCard
							key={_item.id}
							car={_item.car}
							payment_per_day={_item.payment_per_day}
							payment_result={_item.payment_result}
						/>
					))}
				</div>
			</div>
		</PersonalAccountRentLayout>
	);
};

export default RentHistoryPage;
