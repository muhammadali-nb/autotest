import React from "react";
import PersonalAccountCarCardPayment from "./descktop/PersonalAccountCarCardPayment";
import PersonalAccountCarCardPaymentStatus from "./descktop/PersonalAccountCarCardPaymentStatus";
import PersonalAccountCarCardInfo from "./descktop/PersonalAccountCarCardInfo";
import PersonalAccountCarCardInfoMobile from "./mobile/PersonalAccountCarCardInfoMobile";
import PersonalAccountCarCardPaymentMobile from "./mobile/PersonalAccountCarCardPaymentMobile";
import {
	RentHistoryDataCarType,
	RentHistoryDataPaymentPerDay,
	RentHistoryDataPaymentResult,
} from "../../../../types/PersonalAccount/RentHistoryTypes";

const PersonalAccountCarCard = ({
	car,
	payment_result,
	payment_per_day,
}: {
	car: RentHistoryDataCarType;
	payment_result: RentHistoryDataPaymentResult;
	payment_per_day: RentHistoryDataPaymentPerDay;
}) => {
	return (
		<>
			<div className="personal-account-rent-car d-none d-md-grid">
				<PersonalAccountCarCardInfo car={car} />
				<div className="personal-account-rent-car_payment">
					<PersonalAccountCarCardPayment payment={payment_per_day} />
					<PersonalAccountCarCardPaymentStatus
						payment_status={payment_result}
					/>
				</div>
			</div>
			<div className="personal-account-rent-car_mobile d-block d-md-none">
				<div className="personal-account-rent-car_mobile-card">
					<PersonalAccountCarCardInfoMobile
						car={car}
						payment_date={payment_per_day.time}
					/>
					<PersonalAccountCarCardPaymentMobile payment_status={payment_result} />
				</div>
			</div>
		</>
	);
};

export default PersonalAccountCarCard;
