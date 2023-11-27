import call from "../../../../images/common/phone-call.svg";
import back from "../../../../images/common/back.svg";
import { HeaderLogoImage } from "../../../layout/Header";
import { useEffect, useState } from "react";
import { CarBookingStepsType } from "../../CarRentForm";
import {
	CarDataType,
	RentBookingPaymentStatus,
} from "../../../../types/RentTypes";
import RentModalMobileStart from "./steps/RentModalMobileStart";
import RentModalMobileConfirm from "./steps/RentModalMobileConfirm";
import RentModalMobileCreate from "./steps/RentModalMobileCreate";
import RentModalMobilePayment from "./steps/RentModalMobilePayment";
import RentModalMobileFinish from "./steps/RentModalMobileFinish";
import { ConfirmPaymentQR } from "../../../../types/AuthContextTypes";
import RentModalMobileConfirmPayment from "./steps/RentModalMobileConfirmPayment";
import RentModalMobilePaymentResult from "./steps/RentModalMobilePaymentResult";

export const RentModalMobile = ({
	active,
	setActive,
	car,
	step,
	setStep,
	depositPrice,
	setDepositPrice,
	getPriceCar,
	paymentStatus,
	setPaymentStatus,
	carName,
	setCarName,
}: {
	depositPrice: number;
	setDepositPrice: (e: number) => void;
	active: boolean;
	setActive: (e: boolean) => void;
	step: CarBookingStepsType;
	setStep: (e: CarBookingStepsType) => void;
	car: CarDataType;
	getPriceCar: () => void;
	paymentStatus: RentBookingPaymentStatus;
	setPaymentStatus: (e: RentBookingPaymentStatus) => void;
	carName: string | null;
	setCarName: (e: string) => void;
}) => {
	const [data, setData] = useState({
		phone: "",
		confirm: true,
		errors: {},
	});

	const [timer, setTimer] = useState(0);
	const [confirmPaymentQR, setConfirmPaymentQR] = useState<ConfirmPaymentQR>({
		qr: "",
		pid: "",
	});

	useEffect(() => {
		if (active) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [active]);

	const renderSteps = () => {
		if (step === "start") {
			return (
				<RentModalMobileStart
					setTimer={setTimer}
					data={data}
					setData={setData}
					car={car}
					setStep={setStep}
				/>
			);
		} else if (step === "confirm") {
			return (
				<RentModalMobileConfirm
					step={step}
					setStep={setStep}
					car={car}
					phone={data.phone}
					timerConfirm={timer}
				/>
			);
		} else if (step === "create") {
			return (
				<RentModalMobileCreate
					getPayment={getPriceCar}
					step={step}
					car={car}
					setStep={setStep}
				/>
			);
		} else if (step === "payment") {
			return (
				<RentModalMobilePayment
					setConfirmPayment={setConfirmPaymentQR}
					deposit={depositPrice}
					setDeposit={setDepositPrice}
					data={data}
					car={car}
					setStep={setStep}
				/>
			);
		} else if (step === "confirm_payment") {
			return (
				<RentModalMobileConfirmPayment
					setCarName={setCarName}
					paymentStatus={paymentStatus}
					setPaymentStatus={setPaymentStatus}
					confirmPayment={confirmPaymentQR}
					deposit={depositPrice}
					setDeposit={setDepositPrice}
					data={data}
					car={car}
					step={step}
					setStep={setStep}
				/>
			);
		} else if (step === "booking_result") {
			return (
				<RentModalMobilePaymentResult
					closeFunc={() => setActive(false)}
					car={car}
					paymentStatus={paymentStatus}
				/>
			);
		} else {
			return <RentModalMobileFinish />;
		}
	};

	return (
		<div className={`mobile-modal ${active && "active"}`}>
			<div className="mobile-modal_header">
				<div className="mobile-modal_header-top">
					<img src={back} onClick={() => setActive(false)} alt="" />
					<HeaderLogoImage width={"100px"} height={"24px"} image="light" />
					<img src={call} alt="" />
				</div>
				<div className="mobile-modal_header-bottom">
					<h3>
						Доступные <br /> автомобили
					</h3>
					<p>
						С нами просто. <br /> Индивидуальные решения для вас
					</p>
				</div>
			</div>
			<div className="mobile-modal_body">
				<h1>
					Бронирование <br />{" "}
					<span>{carName || car.brand + " " + car.model}</span>
				</h1>
				<p>
					Оставьте свой номер телефона <br /> и мы перезвоним вам в ближайшее
					время
				</p>
				{renderSteps()}
			</div>
			<div className=" personal-account_footer mobile-modal_footer ">
				ООО ВОСХОДⓒ 2023 год
			</div>
		</div>
	);
};
