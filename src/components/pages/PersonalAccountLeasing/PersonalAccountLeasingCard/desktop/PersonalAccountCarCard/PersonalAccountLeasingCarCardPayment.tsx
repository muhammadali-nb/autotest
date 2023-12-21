interface IProps {
	car_payment: {
		date: string;
		price: number;
	};
}

const PersonalAccountLeasingCarCardPayment = (props: IProps) => {
	const { car_payment } = props;
	return (
		<div className="personal-account-leasing-car_card-payment-result">
			<div className="personal-account-leasing-car_card-payment-result_header">
				<h3>{car_payment.price.toLocaleString()} ₽</h3>
				<div>Оплатить сейчас</div>
			</div>
			<p>Оплата: {car_payment.date}</p>
		</div>
	);
};

export default PersonalAccountLeasingCarCardPayment;
