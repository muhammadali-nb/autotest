import React, { useEffect, useState } from "react";
import { BrowserView } from "react-device-detect";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { CarRentDataInfo } from "./CarCard";
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
import Loader from "./Loader";
import LoadError from "./LoadError";
import ModalFormTemplate from "./ModalFormTemplate";
import { useMounted } from "../../hooks/useMounted";

const RentCarDetailModal = () => {
	const { carID } = useParams();
	const isMounted = useMounted();
	const { initialize, user_status } = useAuth();
	const [step, setStep] = useState<CarBookingStepsType>("rent");
	const [error_message, setErrorMessage] = useState<string | null>(null);
	const [paymentStatus, setPaymentStatus] =
		useState<RentBookingPaymentStatus>(null);
	const [depositPrice, setDepositPrice] = useState(0);
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
	const { data, error, isLoading, isSuccess } = useQuery({
		queryKey: [`rent-car-${carID}`, carID],
		queryFn: () => rentService.getOneCar(carID),
	});

	useEffect(() => {
		//@ts-ignore
		if (isMounted) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [isMounted]);

	const chekckUser = async () => {
		await initialize();
		if (user_status) {
			setStep("rent");
		}
	};

	useEffect(() => {
		console.log(carID);
	}, [carID]);

	const confirmPhone = () => {
		if (user_status === "banned") {
			return;
		}
		axios
			.get(
				`https://taxivoshod.ru/api/login.php?auth=1&reg=1&phone=${state.phone}`,
				{ withCredentials: true }
			)
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
				console.log(e);
			});
	};

	const getPriceCar = async () => {
		try {
			const res = await axios.get(
				`https://taxivoshod.ru/api/voshod-auto/?w=book-a-car&id=${carID}`,
				{
					withCredentials: true,
				}
			);
			if (res.data.result === 1) {
				setDepositPrice(res.data.summ);
				if (res.data.summ > 0) setStep("payment");
				else setStep("finish");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		chekckUser();
	}, [step]);

	const handleClose = () => {
		navigate(-1);
	};

	if (error) return <LoadError response={error} />;
	if (isLoading) return <></>;
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
					// closeOnBack={step === "start"}
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
					paymentStatus={paymentStatus}
					setPaymentStatus={setPaymentStatus}
					confirmPayment={confirmPaymentQR}
					deposit={depositPrice}
					setDeposit={setDepositPrice}
					data={state}
					car={data.item}
					closeFunc={handleClose}
					setStep={setStep}
				/>
			)}
			{step === "booking_result" && (
				<CarRentBookingStatus
					paymentStatus={paymentStatus}
					closeFunc={handleClose}
					car={data.item}
				/>
			)}
			{step === "finish" && <CarRentFormConfirmed closeFunc={handleClose} />}
		</ModalFormTemplate>
	);
};

export default RentCarDetailModal;
