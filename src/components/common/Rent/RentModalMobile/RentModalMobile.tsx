import call from "../../../../img/common/phone-call.svg";
import back from "../../../../img/common/back.svg";
import { HeaderLogoImage } from "../../../layout/Header";
import { Link } from "react-router-dom";
import { FC, ReactElement, useEffect, useState } from "react";
import { ModalTemplatePhone } from "../../ModalFormTemplate";
import { CarBookingStepsType } from "../../CarRentForm";
import { CarDataType } from "../../../../types/RentTypes";
import RentModalMobileStart from "./steps/RentModalMobileStart";
import RentModalMobileConfirm from "./steps/RentModalMobileConfirm";
import RentModalMobileCreate from "./steps/RentModalMobileCreate";
import RentModalMobilePayment from "./steps/RentModalMobilePayment";
import RentModalMobileFinish from "./steps/RentModalMobileFinish";
import { useAuth } from "../../../../hooks/useAuth";
import axios from "axios";

export const RentModalMobile = ({
	active,
	setActive,
	car,
	step,
	setStep,
}: {
	active: boolean;
	setActive: (e: boolean) => void;
	step: CarBookingStepsType;
	setStep: (e: CarBookingStepsType) => void;
	car: CarDataType;
}) => {
	const { initialize, user_status } = useAuth();
	const [timer, setTimer] = useState(59);
	const [data, setData] = useState({
		phone: "",
		confirm: true,
		errors: {},
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
			return <RentModalMobileCreate />;
		} else if (step === "payment") {
			return <RentModalMobilePayment />;
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
					Бронирование <br /> <span>{car.brand + " " + car.model}</span>
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
