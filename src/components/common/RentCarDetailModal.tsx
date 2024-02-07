import { FC, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
	CarBookingStepsType,
	CarRentBookingStatus,
	CarRentConfirmPhone,
	CarRentContacts,
	CarRentCreateAccount,
	CarRentFormConfirmed,
	CarRentPaymentType,
	CarRentPaymentTypeConfirm,
	CarRequestFormContent,
	CarRequestFormImage,
} from "./CarRentForm";
import { RentBookingPaymentStatus } from "../../types/RentTypes";
import { ConfirmPaymentQR } from "../../types/AuthContextTypes";
import { ConfirmPhone, ErrorResponse } from "../../Api";
import { useQuery } from "@tanstack/react-query";
import rentService from "../../api-functions/rent-page/rent-service";
import axios, { AxiosError } from "axios";
import LoadError from "./LoadError";
import ModalFormTemplate from "./ModalFormTemplate";
import Loader from "./Loader";

const RentCarDetailModal: FC<{
	paymentStatus: RentBookingPaymentStatus;
	setPaymentStatus: (e: RentBookingPaymentStatus) => void;
	step: CarBookingStepsType;
	setStep: (e: CarBookingStepsType) => void;
	getPriceCar: () => void;
	depositPrice: number;
	setDepositPrice: (e: number) => void;
	carName: string | null;
	setCarName: (e: string) => void;
	errorMessage: null | string;
}> = ({
	paymentStatus,
	setPaymentStatus,
	step,
	setStep,
	getPriceCar,
	depositPrice,
	setDepositPrice,
	carName,
	setCarName,
	errorMessage,
}) => {
	const { id, carID } = useParams();
	const location = useLocation();
	const { user_status } = useAuth();
	const [error_message, setErrorMessage] = useState<string | null>(null);
	const [timer, setTimer] = useState(0);
	const [confirmPaymentQR, setConfirmPaymentQR] = useState<ConfirmPaymentQR>({
		qr: "",
		pid: "",
	});
	const [state, setState] = useState<ConfirmPhone>({
		phone: "",
		confirm: false,
		errors: {},
	});
	const navigate = useNavigate();
	const { data, error, isLoading } = useQuery({
		queryKey: [`rent-car-${carID}`, carID],
		queryFn: () => rentService.getOneCar(carID),
	});

	const confirmPhone = () => {
		if (user_status === "banned") {
			return;
		}
		axios
			.get(`/login.php?auth=1&reg=1&phone=${state.phone}`, {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.success) {
					setStep("confirm");
					setTimer(res.data.timer ?? 59);
				}
			})
			.catch((e) => {
				setErrorMessage(
					(e as AxiosError<ErrorResponse>).response?.data.message ??
						"Возникла ошибка с сервером поробуйте позже"
				);
			});
	};

	const handleClose = () => {
		const path =
			location.key === "default" || location ? `/rent/page/${id ?? 1}` : -1;
		//@ts-ignore
		navigate(path);
	};

	if (isLoading) return <Loader />;
	if (error) return <LoadError response={error} />;
	return (
		<ModalFormTemplate
			show={true}
			onHide={handleClose}
			centered
			size={"xl"}
			image={
				step === "rent" ? (
					<CarRequestFormImage closeFunc={handleClose} car={data.item} />
				) : undefined
			}>
			{step === "rent" && (
				<CarRequestFormContent
					errorMessage={errorMessage}
					getDeposit={getPriceCar}
					setStep={setStep}
					closeFunc={handleClose}
					car={data.item}
				/>
			)}
			{step === "start" && (
				<CarRentContacts
					error={error_message}
					submit={confirmPhone}
					data={state}
					setData={setState}
					closeOnBack={step == "start"}
					car={data.item}
					closeFunc={handleClose}
					setStep={setStep}
				/>
			)}
			{step === "confirm" && (
				<CarRentConfirmPhone
					timer={timer}
					getPriceCar={getPriceCar}
					data={state}
					repeatRequest={confirmPhone}
					car={data.item}
					closeFunc={handleClose}
					setStep={setStep}
				/>
			)}
			{step === "create" && (
				<CarRentCreateAccount
					getPayment={getPriceCar}
					data={state}
					setData={setState}
					car={data.item}
					closeFunc={handleClose}
					setStep={setStep}
				/>
			)}
			{step === "payment" && (
				<CarRentPaymentType
					setConfirmPayment={setConfirmPaymentQR}
					deposit={depositPrice}
					setDeposit={setDepositPrice}
					data={state}
					car={data.item}
					closeFunc={handleClose}
					setStep={setStep}
				/>
			)}
			{step === "confirm_payment" && (
				<CarRentPaymentTypeConfirm
					setCarName={setCarName}
					paymentStatus={paymentStatus}
					setPaymentStatus={setPaymentStatus}
					confirmPayment={confirmPaymentQR}
					deposit={depositPrice}
					setDeposit={setDepositPrice}
					data={state}
					car={data.item}
					closeFunc={handleClose}
					step={step}
					setStep={setStep}
				/>
			)}
			{step === "booking_result" && (
				<CarRentBookingStatus
					paymentStatus={paymentStatus}
					closeFunc={handleClose}
					car={data.item}
					carName={carName}
				/>
			)}
			{step === "finish" && <CarRentFormConfirmed closeFunc={handleClose} />}
		</ModalFormTemplate>
	);
};

export default RentCarDetailModal;
