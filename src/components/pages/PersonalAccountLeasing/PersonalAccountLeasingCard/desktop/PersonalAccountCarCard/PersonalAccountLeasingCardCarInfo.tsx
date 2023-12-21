import carImage from "../../../../../../images/index/car.webp";
import {
	IPersonalAccountLeasingCarDataBankAccounts,
	IPersonalAccountLeasingCarDataInfo,
} from "../../../../../../types/PersonalAccount/LeasingTypes";

interface IProps {
	car: IPersonalAccountLeasingCarDataInfo &
		IPersonalAccountLeasingCarDataBankAccounts;
}

const PersonalAccountLeasingCarCardInfo = (props: IProps) => {
	const { car } = props;

	return (
		<div className="personal-account-leasing-car_card-info">
			<div className="personal-account-leasing-car_card-info_image">
				<img src={car.image} alt={car.brand + " " + car.model} />
			</div>
			<div>
				<p className="personal-account-leasing-car_card-info_date">
					Дата бронирования: {car.deal_date}
				</p>
				<p className="personal-account-leasing-car_card-info_number">
					Номер договора: {car.deal_number}
				</p>
				<h1 className="personal-account-leasing-car_card-info_brand">
					{car.brand}
					<span className="personal-account-leasing-car_card-info_brand-model">
						{car.model}
					</span>
				</h1>
				<h4 className="personal-account-leasing-car_card-info_seria">
					{car.regnum}
				</h4>

				<div className="personal-account-leasing-car_card-info_price">
					<p>Ежемесячный платёж</p>
					<span>{car.payment} ₽</span>
				</div>
				<p className="personal-account-leasing-car_card-info_kasko">
					КАСКО: {car.kasko.number} до <span>{car.kasko.to}</span>
				</p>
				<p className="personal-account-leasing-car_card-info_osago">
					ОСАГО: {car.osago.number} до <span>{car.osago.to}</span>
				</p>
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarCardInfo;
