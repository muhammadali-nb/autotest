import carImage from "../../../../../../images/index/car.webp";

const PersonalAccountLeasingCarCardInfo = (props) => {
	return (
		<div className="personal-account-leasing-car_card-info">
			<div className="personal-account-leasing-car_card-info_image">
				<img src={carImage} alt={"car name"} />
			</div>
			<div>
				<p className="personal-account-leasing-car_card-info_date">
					Дата бронирования: 16.06.2023
				</p>
				<p className="personal-account-leasing-car_card-info_number">
					Номер договора: 00000000000000
				</p>
				<h1 className="personal-account-leasing-car_card-info_brand">
					Kia{" "}
					<span className="personal-account-leasing-car_card-info_brand-model">
						k5
					</span>
				</h1>
				<h4 className="personal-account-leasing-car_card-info_seria">
					К638ЕТ 53
				</h4>

				<div className="personal-account-leasing-car_card-info_price">
					<p>Ежемесячный платёж</p>
					<span>6 950 ₽</span>
				</div>
				<p className="personal-account-leasing-car_card-info_kasko">
					КАСКО: 0000000 до <span>00.00.0000</span>
				</p>
				<p className="personal-account-leasing-car_card-info_osago">
					ОСАГО: 0000000 до <span>00.00.0000</span>
				</p>
			</div>
		</div>
	);
};

export default PersonalAccountLeasingCarCardInfo;
