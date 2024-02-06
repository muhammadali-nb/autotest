import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import Api, { CallRequestData, ConfirmPhone, ErrorResponse } from "../../Api";
import { useAuth } from "../../hooks/useAuth";
import caretLeft from "../../images/common/caret-left-big.svg";
import caretRight from "../../images/common/caret-right-big.svg";
import { ConfirmPaymentQR } from "../../types/AuthContextTypes";
import {
	CarDataType,
	RentBookingPaymentStatus,
	RentCreateAccountForm,
} from "../../types/RentTypes";
import Utils from "../../utils/Utils";
import { CarImagesModal } from "../pages/Car/CarImages";
import {
	CarStatBlockEntry,
	CarStatBlockItem,
	CarStatBlockProps,
} from "../pages/Car/CarStatBlock";
import bankCardImg from "./../../images/common/bank-card.png";
import sbpImg from "./../../images/common/sbp.png";
import { CarTag } from "./CarCard";
import FileInput from "./FileInput";
import LoadError from "./LoadError";
import Loader from "./Loader";
import ModalFormTemplate, {
	ModalTemplateConfirm,
	ModalTemplateContent,
	ModalTemplateInput,
	ModalTemplatePhone,
} from "./ModalFormTemplate";
import api from "../../core/axios";
export type CarBookingStepsType =
	| "rent"
	| "start"
	| "confirm"
	| "create"
	| "payment"
	| "confirm_payment"
	| "booking_result"
	| "finish";

export const CarRentContacts: React.FC<{
	closeFunc: () => void;
	setStep: (string) => void;
	car: CarDataType;
	setData: (CallRequestData) => void;
	data: ConfirmPhone;
	closeOnBack?: boolean;
	submit: () => void;
	error: string | null;
}> = (props) => {
	const [passed, setPassed] = useState(false);
	const { user_status } = useAuth();

	const send = () => {
		let errors = Utils.validateConfirmPhone(props.data);

		if (Object.keys(errors).length > 0) {
			props.setData({ ...props.data, errors: errors });
			setPassed(false);
			return;
		}
		props.submit();
	};
	const update = (field: string, value: any) => {
		let errors = props.data.errors;
		delete errors[field];
		let newData = { ...props.data, [field]: value, errors: errors };
		props.setData(newData);
		errors = Utils.validateConfirmPhone(newData);
		setPassed(Object.keys(errors).length === 0);
		Utils.validatePhone(props.data.phone);
	};
	return (
		<ModalTemplateContent>
			<div>
				<div className={"mb-px-90"}>
					<button
						className={
							"default-link font-size-18 font-weight-semibold text-hover-default"
						}
						onClick={() => {
							props.closeOnBack ? props.closeFunc() : props.setStep("rent");
						}}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div>
					<div
						className={
							"call-content-text-header font-size-40 line-height-120 mb-px-10"
						}>
						Бронирование
						<br />
						{props.car.brand} {props.car.model}
					</div>
					<div className={"call-content-text font-size-16"}>
						Оставьте свой номер телефона,
						<br />
						для регистрации и оплаты бронирования
					</div>
				</div>
			</div>
			<div>
				<div>
					<ModalTemplatePhone
						error={props.data.errors["phone"]}
						onInput={(e: any) => update("phone", e.target.value)}
						value={props.data.phone}
						small={false}
						onChange={(e: any) => update("phone", e.target.value)}
					/>
				</div>
				{props.data.errors["server"] && (
					<div className={"my-2 text-red-color font-size-12"}>
						{props.data.errors["server"]}
					</div>
				)}
			</div>
			{props.error && (
				<p className="text-red-color my-px-10 font-fize-14">{props.error}</p>
			)}
			{user_status === "banned" ? (
				<p className="text-red-color my-px-10 font-fize-14">
					Вы забанены, и не можете дальше продвигаться
				</p>
			) : (
				<div>
					<button
						className={"site-btn small " + (!passed ? "dark" : "")}
						onClick={send}>
						Отправить код
					</button>
					<ModalTemplateConfirm
						small={false}
						error={props.data.errors["confirm"]}
						confirmed={props.data.confirm}
						onChange={(e) => update("confirm", e.target.checked)}
					/>
				</div>
			)}
		</ModalTemplateContent>
	);
};

export const CarRentConfirmPhone: React.FC<{
	closeFunc: () => void;
	setStep: (string) => void;
	car: CarDataType;
	data: ConfirmPhone;
	timer: number;
	repeatRequest: () => void;
	getPriceCar: () => void;
}> = (props) => {
	const [passed, setPassed] = useState(false);
	const [code, setCode] = useState("      ");
	const [error, setError] = useState("");
	const [idPrefix] = useState(Utils.randomString());
	const { register, error_message } = useAuth();
	const [timer, setTimer] = useState(props.timer);

	useEffect(() => {
		let id = "confirm" + props.car.id + idPrefix + "-0";
		let item = document.getElementById(id) as HTMLInputElement;
		item?.focus();
		item?.setSelectionRange(0, 1);
		setTimer(props.timer);
	}, []);
	useEffect(() => {
		if (timer > 0)
			setTimeout(() => {
				setTimer(timer - 1);
			}, 1000);
	}, [timer]);
	const timerToString = () => {
		let minutes = ("0" + Math.floor(timer / 60)).slice(-2);
		let seconds = ("0" + (timer % 60)).slice(-2);
		return minutes + ":" + seconds;
	};

	const send = async () => {
		if (code.replace(/\D+/g, "").length < 5) {
			setPassed(false);
			setError("Укажите код подтверждения!");
			return;
		}
		setError("");

		try {
			const res: any = await register(props.data.phone, code);
			if (res.success) {
				if (res.has_profile) {
					await props.getPriceCar();
				} else {
					props.setStep("create");
				}
				setPassed(true);
			}
		} catch (error) {
			console.log(error);
			setPassed(false);
		}
	};

	const update = (index: number, value: string) => {
		if (!value.replace(/\D/, "")) {
			setPassed(false);
			return;
		}
		let output = code.substring(0, index) + value + code.substring(index + 1);
		setCode(output);

		console.log("update code: " + output);
		let id = "confirm" + props.car.id + idPrefix + "-" + (index + 1);
		if (index < 5) {
			let item = document.getElementById(id) as HTMLInputElement;
			item?.focus();
			item?.setSelectionRange(0, 1);
		}

		let passed = output.replace(/\D+/g, "").length >= 5;
		setPassed(passed);
		console.log("passed: " + passed);
	};

	useEffect(() => {
		if (code.replace(/\D+/g, "").length === 5) {
			send();
		}
	}, [code]);

	return (
		<ModalTemplateContent>
			<div>
				<div className={"mb-px-90"}>
					<button
						className={
							"default-link font-size-18 font-weight-semibold text-hover-default"
						}
						onClick={() => props.setStep("start")}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div>
					<div
						className={
							"call-content-text-header font-size-40 line-height-120 mb-px-10"
						}>
						Бронирование
						<br />
						{props.car.brand} {props.car.model}
					</div>
					<div className={"call-content-text font-size-16"}>
						<span className={"text-default"}>Мы отправили вам код</span>
						<br />
						на номер {props.data.phone}
					</div>
				</div>
			</div>
			<div>
				<div className={"d-flex justify-content-between"}>
					<ModalTemplateInput
						id={"confirm" + props.car.id + idPrefix + "-0"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						small={false}
						onInput={(e: any) => update(0, e.target.value)}
					/>
					<ModalTemplateInput
						id={"confirm" + props.car.id + idPrefix + "-1"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						small={false}
						onInput={(e: any) => update(1, e.target.value)}
					/>
					<ModalTemplateInput
						small={false}
						id={"confirm" + props.car.id + idPrefix + "-2"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						onInput={(e: any) => update(2, e.target.value)}
					/>
					<ModalTemplateInput
						small={false}
						id={"confirm" + props.car.id + idPrefix + "-3"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						onInput={(e: any) => update(3, e.target.value)}
					/>
					<ModalTemplateInput
						small={false}
						id={"confirm" + props.car.id + idPrefix + "-4"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						onInput={(e: any) => update(4, e.target.value)}
					/>
				</div>
				{timer > 0 && (
					<div className={"my-px-10 font-size-14 text-gray-color"}>
						Вы сможете запросить СМС через {timerToString()}
					</div>
				)}
				{timer <= 0 && (
					<div className={"my-px-10"}>
						<button
							className={
								"default-link text-default text-decoration-underline font-size-14"
							}
							onClick={props.repeatRequest}>
							Отправить СМС ещё раз
						</button>
					</div>
				)}
				{error.length > 0 && (
					<div className={"my-2 text-red-color font-size-14"}>{error}</div>
				)}
				{error_message && (
					<div className={"my-2 text-red-color font-size-14"}>
						{error_message}
					</div>
				)}
			</div>

			<div className={"d-flex justify-content-between"}>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={() => send()}>
					Подтвердить код
				</button>
				<button
					className={
						"default-link text-decoration-none default-transition text-gray-color text-hover-default"
					}
					onClick={() => props.setStep("start")}>
					<FontAwesomeIcon icon={faAngleLeft} />
					&nbsp;&nbsp;&nbsp;Изменить номер
				</button>
			</div>
		</ModalTemplateContent>
	);
};

export const CarRentPaymentButton: React.FC<{
	payment: string;
	error: boolean;
	image: string;
	text: string;
	code: string;
	setPayment: (string) => void;
}> = ({ payment, error, image, text, code, setPayment }) => {
	return (
		<button
			className={
				"car-rent-modal-btn " +
				(payment === code ? " selected" : "") +
				(error ? " error" : "")
			}
			onClick={() => setPayment(code)}>
			<div className={"car-rent-modal-btn-image"}>
				<img src={image} alt="" />
			</div>
			<div className={"car-rent-modal-btn-text"}>{text}</div>
		</button>
	);
};

const pay_koef = {
	// процеты оплаты
	card: 0.97,
	sbp: 0.99,
};
export const CarRentPaymentType: React.FC<{
	closeFunc: () => void;
	data: ConfirmPhone | any;
	setStep: (string) => void;
	car: CarDataType;
	deposit: number;
	setConfirmPayment: (e: ConfirmPaymentQR) => void;
	setDeposit: (e: number) => void;
}> = (props) => {
	const [payment, setPayment] = useState("");
	const [passed, setPassed] = useState(false);
	const [error, setError] = useState<null | string>(null);
	const [redButton, setRedButton] = useState(false);
	const { isAuthenticated } = useAuth();
	const [cardPrice] = useState(
		parseFloat((props.deposit / pay_koef.card).toFixed(2))
	);
	const [sbpPrice] = useState(
		parseFloat((props.deposit / pay_koef.sbp).toFixed(2))
	);

	const send = async () => {
		if (payment === "") {
			setError("Выберите способ оплаты");
			setPassed(false);
			setRedButton(true);
			return;
		}
		setRedButton(false);
		try {
			const res = await api.get(
				`/voshod-auto/?w=pay&summ=${
					payment === "sbp" ? sbpPrice : cardPrice
				}&payment=${payment === "card" ? "classic" : "sbp"}&car_id=${
					props.car.id
				}`,
				{ withCredentials: true }
			);

			if (res.data.result === 1) {
				if (payment === "sbp") {
					props.setConfirmPayment({ qr: res.data.qr, pid: res.data.pid });
					props.setStep("confirm_payment");
				} else if (payment === "card") {
					window.location.replace(res.data.redirect);
				}
			}
		} catch (error) {
			setError(
				(error as AxiosError<ErrorResponse>).response?.data.message ??
					"Возникла ошибка с сервером поробуйте позже"
			);
		}
	};
	const update = (ptype) => {
		if (ptype === "sbp") {
			props.setDeposit(sbpPrice);
		} else if (ptype === "card") {
			props.setDeposit(cardPrice);
		}
		setPayment(ptype);
		setRedButton(false);
		setPassed(true);
		setError("");
	};

	return (
		<ModalTemplateContent>
			<div>
				<div className={"mb-px-90"}>
					<button
						className={
							"default-link font-size-18 font-weight-semibold text-hover-default"
						}
						onClick={() => props.setStep(isAuthenticated ? "rent" : "start")}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div className={"mb-px-20"}>
					<div
						className={
							"call-content-text-header font-size-40 line-height-120 mb-px-10"
						}>
						Бронирование
						<br />
						{props.car.brand} {props.car.model}
					</div>
					<div
						className={
							"font-size-16 line-height-140 font-weight-medium mb-px-40"
						}>
						Выберите форму оплаты
					</div>
					<div
						className={
							"text-default font-size-16 line-height-140 font-weight-semibold mb-px-5"
						}>
						К оплате:
					</div>
					<div
						className={
							"text-default font-size-32 line-height-140 font-weight-semibold"
						}>
						{props.deposit} ₽
					</div>
				</div>
			</div>
			<div>
				<div className={"d-flex flex-column w-100 gap-y-px-15"}>
					<CarRentPaymentButton
						payment={payment}
						error={redButton}
						image={sbpImg}
						text={"СБП"}
						code={"sbp"}
						setPayment={update}
					/>
					<CarRentPaymentButton
						payment={payment}
						error={redButton}
						image={bankCardImg}
						text={"Банковская карта"}
						code={"card"}
						setPayment={update}
					/>
				</div>
				<div className={"my-2 text-red-color font-size-12"}>
					{error || <>&nbsp;</>}
				</div>
			</div>
			<div>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={send}>
					Перейти к оплате
				</button>
			</div>
		</ModalTemplateContent>
	);
};

export const CarRentPaymentTypeConfirm: React.FC<{
	closeFunc: () => void;
	data: ConfirmPhone | any;
	setStep: (e: CarBookingStepsType) => void;
	step: CarBookingStepsType;
	car: CarDataType;
	deposit: number;
	setDeposit: (e: number) => void;
	confirmPayment: ConfirmPaymentQR;
	setPaymentStatus: (e: RentBookingPaymentStatus) => void;
	paymentStatus: RentBookingPaymentStatus;
	setCarName: (e: string) => void;
}> = (props) => {
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (props.paymentStatus !== "CONFIRMED" || "REFUNDED" || "CANCELLED") {
			const interval = setInterval(() => {
				axios
					.get(`/voshod-auto/?w=check-pay&pid=${props.confirmPayment.pid}`)
					.then((res) => {
						if (res.data.result === 1) {
							props.setPaymentStatus(res.data.status);
							props.setCarName(res.data.car);
							if (
								res.data.status === "CONFIRMED" ||
								res.data.status === "REFUNDED" ||
								res.data.status === "CANCELLED"
							) {
								props.setStep("booking_result");
							}
						}
					})
					.catch((error) => {
						console.log(error);
						props.setPaymentStatus(null);
						props.setStep("payment");
					});
			}, 5000);
			return () => {
				clearInterval(interval); // stops interval
			};
		}
	}, [props.paymentStatus]);

	return (
		<ModalTemplateContent>
			<div>
				<div className={"mb-px-90"}>
					<button
						className={
							"default-link font-size-18 font-weight-semibold text-hover-default"
						}
						onClick={() =>
							props.setStep(isAuthenticated ? "payment" : "start")
						}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div className={"mb-px-20"}>
					<div
						className={
							"call-content-text-header font-size-40 line-height-120 mb-px-10"
						}>
						Бронирование
						<br />
						{props.car.brand + " " + props.car.model}
					</div>
					<div
						className={
							"font-size-16 line-height-140 font-weight-medium mb-px-40"
						}>
						Выберите форму оплаты
					</div>
					<div
						className={
							"text-default font-size-16 line-height-140 font-weight-semibold mb-px-5"
						}>
						К оплате:
					</div>
					<div
						className={
							"text-default font-size-32 line-height-140 font-weight-semibold"
						}>
						{props.deposit} ₽
					</div>
				</div>
			</div>
			<div>
				<div className={"d-flex justify-content-center w-100"}>
					<img
						src={`data:image/svg+xml;utf8,${encodeURIComponent(
							props.confirmPayment.qr
						)}`}
						alt=""
						width={200}
						height={200}
					/>
				</div>
			</div>
			<div style={{ height: "40px" }}>
				<div className={"my-2 text-red-color font-size-12"}>
					{/* {error || <>&nbsp;</>} */}
				</div>
			</div>
		</ModalTemplateContent>
	);
};

export const CarRentBookingStatus: React.FC<{
	paymentStatus: RentBookingPaymentStatus;
	closeFunc: () => void;
	car: CarDataType;
	carName: string | null;
}> = (props) => {
	return (
		<ModalTemplateContent>
			<div style={{ marginTop: "162px" }}>
				{props.paymentStatus === "CONFIRMED" ? (
					<>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="60"
							height="60"
							viewBox="0 0 60 60"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M0.667969 29.9998C0.667969 13.7995 13.801 0.666504 30.0013 0.666504C46.2017 0.666504 59.3346 13.7995 59.3346 29.9998C59.3346 46.2002 46.2017 59.3332 30.0013 59.3332C13.801 59.3332 0.667969 46.2002 0.667969 29.9998Z"
								fill="#008F4B"
							/>
							<path
								d="M20.2617 30.6319L26.9574 36.956L39.74 23.043"
								stroke="white"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className={"call-content-text-header mt-px-30"}>
							Оплата <br />
							прошла успешно!
						</div>
						<div className={"call-content-text"}>
							{props.carName || props.car.brand + " " + props.car.model} —
							забронирован!
						</div>
					</>
				) : (
					<>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="60"
							height="60"
							viewBox="0 0 60 60"
							fill="none">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M30.0013 0.666504C13.801 0.666504 0.667969 13.7995 0.667969 29.9998C0.667969 46.2002 13.801 59.3332 30.0013 59.3332C46.2017 59.3332 59.3346 46.2002 59.3346 29.9998C59.3346 13.7995 46.2017 0.666504 30.0013 0.666504ZM23.4155 20.5856C22.6345 19.8046 21.3681 19.8046 20.5871 20.5856C19.806 21.3667 19.806 22.633 20.5871 23.4141L27.1729 29.9998L20.5871 36.5856C19.806 37.3667 19.806 38.633 20.5871 39.4141C21.3681 40.1951 22.6345 40.1951 23.4155 39.4141L30.0013 32.8283L36.5871 39.4141C37.3681 40.1951 38.6345 40.1951 39.4155 39.4141C40.1966 38.633 40.1966 37.3667 39.4155 36.5856L32.8297 29.9998L39.4155 23.4141C40.1966 22.633 40.1966 21.3667 39.4155 20.5856C38.6345 19.8046 37.3681 19.8046 36.5871 20.5856L30.0013 27.1714L23.4155 20.5856Z"
								fill="#BF3535"
							/>
						</svg>
						<div className={"call-content-text-header mt-px-30"}>
							Оплата <br /> была прервана
						</div>
						<div className={"call-content-text"}>
							{props.paymentStatus === "REFUNDED"
								? "Cредства возвращены"
								: props.car.brand + " " + props.car.model}
						</div>
					</>
				)}
			</div>
			<div>
				<button className={"site-btn small"} onClick={props.closeFunc}>
					Закрыть
				</button>
			</div>
		</ModalTemplateContent>
	);
};

export const CarRentFormConfirmed: React.FC<{ closeFunc: () => void }> = (
	props
) => {
	return (
		<ModalTemplateContent>
			<div style={{ marginTop: "130px" }}>
				<div className={"call-content-text-header"}>
					Спасибо <br />
					за обращение
				</div>
				<div className={"call-content-text"}>
					Наш специалист с вами свяжется
				</div>
				<div className={"call-content-text"}>Пожалуйста, ожидайте</div>
				<div
					style={{ width: "100px", height: "6px", margin: "20px 0" }}
					className={"bg-red-color"}></div>
			</div>
			<div>
				<button className={"site-btn small"} onClick={props.closeFunc}>
					Закрыть
				</button>
			</div>
		</ModalTemplateContent>
	);
};

export const CarRequestFormContent: React.FC<{
	closeFunc: () => void;
	setStep: (e: CarBookingStepsType) => void;
	car: CarDataType;
	getDeposit: () => void;
	errorMessage: null | string;
}> = (props) => {
	const { isAuthenticated, user_status, has_profile } = useAuth();

	const ckeckSteps = async () => {
		if (isAuthenticated && has_profile) {
			await props.getDeposit();
		} else if (!has_profile && user_status === "need_auth") {
			props.setStep("start");
		} else if (isAuthenticated && !has_profile) {
			props.setStep("create");
		}
	};

	const statSettings: CarStatBlockProps = {
		data: [],
		dotted: false,
		column1Width: "70px",
		column2Width: "auto",
	};
	return (
		<div className={"py-px-35 px-px-60 flex-grow"}>
			<div>
				<div
					className={
						"font-size-40 line-height-120 font-weight-semibold text-uppercase mb-px-10"
					}>
					{props.car.brand}{" "}
					<span className={"text-red-color"}>{props.car.model}</span>
				</div>
				<div
					className={
						"text-gray-color font-weight-medium font-size-24 line-height-120 mb-px-20"
					}>
					{props.car.regnum}
				</div>
				<div className={"car__card-taglist mb-px-60"}>
					<CarTag
						type={props.car.available ? "free" : "not-free"}
						car={props.car}>
						{props.car.available ? "Свободна" : "Занята"}
					</CarTag>
				</div>
				<div
					className={
						"font-size-32 line-height-120 font-weight-semibold mb-px-15"
					}>
					{props.car.rentpay.toLocaleString()} ₽{" "}
					<span className={"font-size-24 line-height-120"}>/ день</span>
				</div>
				<div
					className={
						"font-size-16 line-height-120 font-weight-medium mb-px-40"
					}>
					Депозит от{"  "}
					<span className={"font-weight-semibold"}>
						{props.car.deposit.toLocaleString()} ₽
					</span>
				</div>
				<div className={"mb-px-40"}>
					{props.car.available ? (
						<button className={"site-btn big"} onClick={ckeckSteps}>
							Забронировать
						</button>
					) : (
						<div style={{ height: "50px" }}></div>
					)}

					<div></div>
					{props.errorMessage && (
						<div className={"my-2 text-red-color font-size-12"}>
							{props.errorMessage}
						</div>
					)}
				</div>
				<div
					className={
						"font-size-24 line-height-120 font-weight-medium mb-px-25"
					}>
					Информация
				</div>
				<div className={"mb-px-40"}>
					<CarStatBlockEntry settings={statSettings}>
						<CarStatBlockItem
							settings={statSettings}
							data={{ name: "Год", value: props.car.year }}
						/>
						<CarStatBlockItem
							settings={statSettings}
							data={{ name: "КПП", value: props.car.kpp }}
						/>
						<CarStatBlockItem
							settings={statSettings}
							data={{ name: "Пробег", value: props.car.run + " км" }}
						/>
					</CarStatBlockEntry>
				</div>
			</div>
			<div></div>
		</div>
	);
};
export const CarRequestFormImage: React.FC<{
	closeFunc: () => void;
	car: CarDataType;
}> = (props) => {
	const [index, setIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);
	const handleSelect = (selectedIndex) => {
		if (Api.isError(props.car)) return;
		if (selectedIndex >= (props.car?.images?.length ?? 0)) selectedIndex = 0;
		if (selectedIndex < 0) selectedIndex = (props.car?.images?.length ?? 1) - 1;
		setIndex(selectedIndex);
	};

	if (!props.car)
		return (
			<div
				className={
					"d-flex flex-column position-relative justify-content-center align-items-center"
				}
				style={{ minWidth: "600px", maxWidth: "600px" }}>
				<Loader />
			</div>
		);
	if (Api.isError(props.car))
		return (
			<div
				className={
					"d-flex flex-column position-relative justify-content-center align-items-center"
				}
				style={{ minWidth: "600px", maxWidth: "600px" }}>
				<LoadError response={props.car} />
			</div>
		);

	return (
		<div
			className={"d-flex flex-column position-relative justify-content-center"}
			style={{ minWidth: "600px", maxWidth: "600px" }}>
			<CarImagesModal
				show={showModal}
				car_images={props.car.images}
				handleClose={handleClose}
				index={index}
			/>
			<div className={"car-images mb-0"}>
				<Carousel
					activeIndex={index}
					onSelect={handleSelect}
					controls={false}
					indicators={false}>
					{props.car?.images?.map((img, index) => (
						<Carousel.Item key={img.id}>
							<div
								className={"car-images-image-container cursor-pointer"}
								onClick={handleShow}>
								<img
									className="d-block w-100 car-images-image"
									src={img?.image}
									alt=""
								/>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</div>
			<div
				className={
					"position-absolute bottom-0 left-0 w-100 d-flex justify-content-center p-3"
				}>
				<div className={"car-images-controls w-100"}>
					<button
						className={"car-images-controls-btn"}
						onClick={() => handleSelect(index - 1)}>
						<img src={caretLeft} width={16} height={32} alt="" />
					</button>
					<div className={"car-images-controls-sliders"}>
						{[...new Array(props.car.images.length)].map((i, ind) => (
							<div
								key={ind}
								className={
									"car-images-controls-slider " +
									(index === ind ? "active" : "")
								}
								onClick={() => handleSelect(ind)}>
								<div></div>
							</div>
						))}
					</div>
					<button 
						className={"car-images-controls-btn"}
						onClick={() => handleSelect(index + 1)}>
						<img src={caretRight} width={16} height={32} alt="" />
					</button>
				</div>
			</div>
			<div className={"position-absolute top-0 left-0 px-px-30 py-px-20"}>
				<button
					className={
						"default-link font-size-18 font-weight-semibold text-decoration-none"
					}
					onClick={() => props.closeFunc()}>
					<FontAwesomeIcon icon={faAngleLeft} />
					&nbsp;&nbsp;НАЗАД
				</button>
			</div>
		</div>
	);
};

export const CarRentCreateAccount: React.FC<{
	closeFunc: () => void;
	setStep: (string) => void;
	car: CarDataType;
	setData: (CallRequestData) => void;
	data: ConfirmPhone | CallRequestData;
	closeOnBack?: boolean;
	getPayment: () => void;
}> = (props) => {
	const [base64, setBase64] = useState("");
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [state, setState] = useState<RentCreateAccountForm>({
		name: "",
		lastName: "",
		middleName: "",
		image: "",
		errors: {},
	});
	const [passed, setPassed] = useState(false);
	const createAccount = async () => {
		let errors = Utils.validateRentCreateAccont(state);

		if (Object.keys(errors).length > 0) {
			console.log(errors);
			setState({ ...state, errors: errors });
			setPassed(false);
			return;
		}

		try {
			const res = await fetch("/voshod-auto/?w=update-profile", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					w: "update-profile",
					first_name: state.name,
					last_name: state.lastName,
					middle_name: state.middleName,
					license_photo: base64,
				}),
			});
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();
			if (data.result === 1) {
				props.getPayment();
			}
		} catch (error) {
			console.log(error);
			setErrorMessage(
				(error as AxiosError<ErrorResponse>).response?.data.message ??
					"Возникла ошибка с сервером поробуйте позже"
			);
		}
	};

	const updateForm = (field: string, value: any) => {
		let errors = state.errors;
		delete errors[field];
		let newData = { ...state, [field]: value, errors: errors };
		setState(newData);
		errors = Utils.validateRentCreateAccont(newData);
		setPassed(Object.keys(errors).length === 0);
		// Utils.validatePhone(props.data.phone);
	};

	return (
		<ModalTemplateContent>
			<div>
				<div className={"mb-px-90"}>
					<button
						className={
							"default-link font-size-18 font-weight-semibold text-hover-default"
						}
						onClick={() => {
							props.closeOnBack ? props.closeFunc() : props.setStep("rent");
						}}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div>
					<div
						className={
							"call-content-text-header font-size-40 line-height-120 mb-px-10"
						}>
						Бронирование
						<br />
						{props.car.brand} {props.car.model}
					</div>
					<div className={"call-content-text font-size-16"}>
						Оставьте свой номер телефона,
						<br />
						для регистрации и оплаты бронирования
					</div>
				</div>
			</div>
			<div>
				<ModalTemplateInput
					placeholder="Фамилия"
					value={state.lastName}
					error={state.errors?.lastName}
					small={false}
					onChange={(e) => updateForm("lastName", e.target.value)}
					onInput={(e) => updateForm("lastName", e.target.value)}
				/>
				<ModalTemplateInput
					placeholder="Имя"
					value={state.name}
					error={state.errors?.name}
					small={false}
					onChange={(e) => updateForm("name", e.target.value)}
					onInput={(e) => updateForm("name", e.target.value)}
				/>
				<ModalTemplateInput
					placeholder="Отчество"
					value={state.middleName}
					error={state.errors?.middleName}
					small={false}
					onChange={(e) => updateForm("middleName", e.target.value)}
					onInput={(e) => updateForm("middleName", e.target.value)}
				/>
				<FileInput upload={setBase64} />
			</div>
			<button
				className={"site-btn small " + (!passed ? "dark" : "")}
				onClick={() => createAccount()}>
				Перейти к оплате
			</button>
		</ModalTemplateContent>
	);
};

export const CarBookingForm: React.FC<{
	wide?: boolean;
	text?: string | ReactNode;
	func?: () => void;
	btn?: ReactNode;
	step?: string;
	car: CarDataType | any;
	car_id: number;
}> = (props) => {
	const { user_status } = useAuth();
	const [error_message, setErrorMessage] = useState<string | null>(null);
	const [paymentStatus, setPaymentStatus] =
		useState<RentBookingPaymentStatus>(null);
	const [depositPrice, setDepositPrice] = useState(0);
	const [show, setShow] = useState(false);
	const [step, setStep] = useState<CarBookingStepsType>("rent");
	const [timer, setTimer] = useState(0);
	const [carName, setCarName] = useState<string | null>(null);

	const [confirmPaymentQR, setConfirmPaymentQR] = useState<ConfirmPaymentQR>({
		qr: "",
		pid: "",
	});
	const [state, setState] = useState<ConfirmPhone>({
		phone: "",
		confirm: false,
		errors: {},
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
				console.log(e);
			});
	};

	const getPriceCar = async () => {
		try {
			const res = await api.get(
				`/voshod-auto/?w=book-a-car&id=${props.car_id}`,
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
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	return (
		<>
			<button
				className={"site-btn big" + (props.wide ? " w-100" : "")}
				onClick={handleShow}>
				{props.text ?? <>Забронировать</>}
			</button>
			<ModalFormTemplate
				show={show}
				onHide={handleClose}
				centered
				size={"xl"}
				image={
					step === "rent" ? (
						<CarRequestFormImage closeFunc={handleClose} car={props.car} />
					) : undefined
				}>
				{step === "rent" && (
					<CarRequestFormContent
						errorMessage={error_message}
						getDeposit={getPriceCar}
						setStep={setStep}
						closeFunc={handleClose}
						car={props.car}
					/>
				)}
				{step === "start" && (
					<CarRentContacts
						error={error_message}
						submit={confirmPhone}
						data={state}
						setData={setState}
						closeOnBack={props.step == "start"}
						car={props.car}
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
						car={props.car}
						closeFunc={handleClose}
						setStep={setStep}
					/>
				)}
				{step === "create" && (
					<CarRentCreateAccount
						getPayment={getPriceCar}
						data={state}
						setData={setState}
						closeOnBack={props.step == "start"}
						car={props.car}
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
						car={props.car}
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
						car={props.car}
						step={step}
						closeFunc={handleClose}
						setStep={setStep}
					/>
				)}
				{step === "booking_result" && (
					<CarRentBookingStatus
						paymentStatus={paymentStatus}
						closeFunc={handleClose}
						car={props.car}
						carName={carName}
					/>
				)}
				{step === "finish" && <CarRentFormConfirmed closeFunc={handleClose} />}
			</ModalFormTemplate>
		</>
	);
};

export default CarBookingForm;
