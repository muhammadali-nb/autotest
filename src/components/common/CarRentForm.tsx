import React, { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Api, { CallRequestData, ErrorResponse } from "../../Api";
import ModalFormTemplate, {
	ModalTemplateConfirm,
	ModalTemplateContent,
	ModalTemplateInput,
	ModalTemplatePhone,
} from "./ModalFormTemplate";
import Utils from "../../Utils";
import { CarData, CarRentDataInfo, CarTag } from "./CarCard";
import { BaseState } from "../../store/reducers/baseDataSlice";
import { useAppSelector } from "../../store/hooks";
import sbpImg from "./../../img/common/sbp.png";
import bankCardImg from "./../../img/common/bank-card.png";
import {
	CarStatBlockEntry,
	CarStatBlockItem,
	CarStatBlockProps,
} from "../pages/Car/CarStatBlock";
import Loader from "./Loader";
import LoadError from "./LoadError";
import { Carousel } from "react-bootstrap";
import caretLeft from "../../img/common/caret-left-big.svg";
import caretRight from "../../img/common/caret-right-big.svg";
import { CarImagesModal } from "../pages/Car/CarImages";

const CarRentContacts: React.FC<{
	closeFunc: () => void;
	setStep: (string) => void;
	car: CarRentDataInfo;
	setData: (CallRequestData) => void;
	data: CallRequestData;
	closeOnBack?: boolean;
}> = (props) => {
	const [passed, setPassed] = useState(false);
	const baseData: BaseState = useAppSelector((state) => state.baseData);
	const brand =
		baseData.left?.brands.values?.find((i) => props.car.brand === i.id)?.name ??
		"неизвестно";
	const model =
		baseData.left?.models.values?.find((i) => props.car.model === i.id)?.name ??
		"неизвестно";

	const send = () => {
		let errors = Utils.validateForm(props.data);
		if (Object.keys(errors).length > 0) {
			props.setData({ ...props.data, errors: errors });
			setPassed(false);
			return;
		}
		Api.carRentCodeRequest(props.data).then((resp) => {
			if (Api.isError(resp)) {
				props.setData({
					...props.data,
					errors: { server: "Ошибка соединения с сервером!" },
				});
				return;
			}

			if (resp.success) {
				props.setStep("confirm");
				setPassed(true);
			} else {
				props.setData({ ...props.data, errors: resp.fields ?? {} });
				setPassed(false);
			}
		});
	};
	const update = (field: string, value: any) => {
		let errors = props.data.errors;
		delete errors[field];
		let newData = { ...props.data, [field]: value, errors: errors };
		props.setData(newData);
		errors = Utils.validateForm(newData);
		setPassed(Object.keys(errors).length === 0);
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
						{brand} {model}
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
					<ModalTemplateInput
						error={props.data.errors["name"]}
						onInput={(e: any) => update("name", e.target.value)}
						onChange={(e: any) => update("name", e.target.value)}
						value={props.data.name}
						small={false}
						placeholder={"Имя"}
					/>
					<ModalTemplateInput
						error={props.data.errors["lastName"]}
						onInput={(e: any) => update("lastName", e.target.value)}
						onChange={(e: any) => update("lastName", e.target.value)}
						value={props.data.lastName}
						small={false}
						placeholder={"Фамилия"}
					/>
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

			<div>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={() => send()}>
					Отправить код
				</button>
				<ModalTemplateConfirm
					small={false}
					error={props.data.errors["confirm"]}
					confirmed={props.data.confirm}
					onChange={(e) => update("confirm", e.target.checked)}
				/>
			</div>
		</ModalTemplateContent>
	);
};

const defaultSmsTimer = 20;
const CarRentConfirmPhone: React.FC<{
	closeFunc: () => void;
	setStep: (string) => void;
	car: CarRentDataInfo;
	data: CallRequestData;
}> = (props) => {
	const [passed, setPassed] = useState(false);
	const [code, setCode] = useState("      ");
	const [error, setError] = useState("");
	const [idPrefix] = useState(Utils.randomString());
	const [timer, setTimer] = useState(0);
	const baseData: BaseState = useAppSelector((state) => state.baseData);
	const brand =
		baseData.left?.brands.values?.find((i) => props.car.brand === i.id)?.name ??
		"неизвестно";
	const model =
		baseData.left?.models.values?.find((i) => props.car.model === i.id)?.name ??
		"неизвестно";

	useEffect(() => {
		let id = "confirm" + props.car.id + idPrefix + "-0";
		let item = document.getElementById(id) as HTMLInputElement;
		item?.focus();
		item?.setSelectionRange(0, 1);
		setTimer(defaultSmsTimer);
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
	const requestCode = () => {
		Api.carRentCodeRequest(props.data).then((resp) => {
			if (Api.isError(resp)) {
				setError("Ошибка соединения с сервером!");
				return;
			}
			if (resp.success) {
				setTimer(defaultSmsTimer);
			}
		});
	};

	const send = () => {
		if (code.replace(/\D+/g, "").length < 6) {
			setError("Укажите код подтверждения!");
			setPassed(false);
			return;
		}
		Api.carRentConfirmRequest(props.data, code).then((resp) => {
			if (Api.isError(resp)) {
				setError("Ошибка соединения с сервером!");
				return;
			}

			if (resp.success) {
				props.setStep("payment");
				setPassed(true);
			} else {
				setError(
					resp.fields && resp.fields["code"]
						? resp.fields["code"]
						: "Неправильный код подтверждения"
				);
				setPassed(false);
			}
		});
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

		let passed = output.replace(/\D+/g, "").length >= 6;
		setPassed(passed);
		console.log("passed: " + passed);
	};
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
						{brand} {model}
					</div>
					<div className={"call-content-text font-size-16"}>
						<span className={"text-default"}>Мы отправили вам код</span>
						<br />
						на номер +7 (999) 999 - 99 -99
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
					<ModalTemplateInput
						small={false}
						id={"confirm" + props.car.id + idPrefix + "-5"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						onInput={(e: any) => update(5, e.target.value)}
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
							onClick={requestCode}>
							Отправить СМС ещё раз
						</button>
					</div>
				)}
				{error && (
					<div className={"my-2 text-red-color font-size-14"}>{error}</div>
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

const CarRentPaymentButton: React.FC<{
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
const CarRentPaymentType: React.FC<{
	closeFunc: () => void;
	data: CallRequestData;
	setStep: (string) => void;
	car: CarRentDataInfo;
}> = (props) => {
	const [payment, setPayment] = useState("");
	const [passed, setPassed] = useState(false);
	const [error, setError] = useState("");
	const [redButton, setRedButton] = useState(false);
	const baseData: BaseState = useAppSelector((state) => state.baseData);
	const brand =
		baseData.left?.brands.values?.find((i) => props.car.brand === i.id)?.name ??
		"неизвестно";
	const model =
		baseData.left?.models.values?.find((i) => props.car.model === i.id)?.name ??
		"неизвестно";
	const send = () => {
		if (payment === "") {
			setError("Выберите способ оплаты");
			setPassed(false);
			setRedButton(true);
			return;
		}
		setRedButton(false);
		Api.carRentPaymentRequest(props.data, props.car, payment).then((resp) => {
			if (Api.isError(resp)) {
				setError("Ошибка соединения с сервером");
				return;
			}

			if (resp.success) {
				props.setStep("finish");
				setPassed(true);
			} else {
				setError(resp.fields ? resp.fields["error"] : "");
				setPassed(false);
			}
		});
	};
	const update = (ptype) => {
		setRedButton(false);
		setPayment(ptype);
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
						onClick={() => props.setStep("confirm")}>
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
						{brand} {model}
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
						{props.car.rentpay} ₽
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
					onClick={() => send()}>
					Перейти к оплате
				</button>
			</div>
		</ModalTemplateContent>
	);
};

const CarRentFormConfirmed: React.FC<{ closeFunc: () => void }> = (props) => {
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
				<button className={"site-btn small"} onClick={() => props.closeFunc()}>
					Закрыть
				</button>
			</div>
		</ModalTemplateContent>
	);
};

const CarRequestFormContent: React.FC<{
	closeFunc: () => void;
	setStep: (string) => void;
	car: CarRentDataInfo;
}> = (props) => {
	const baseData: BaseState = useAppSelector((state) => state.baseData);
	const brand =
		baseData.left?.brands.values?.find((i) => props.car.brand === i.id)?.name ??
		"неизвестно";
	const model =
		baseData.left?.models.values?.find((i) => props.car.model === i.id)?.name ??
		"неизвестно";
	const tags =
		baseData.top?.rent.values?.filter((i) =>
			props.car.special.includes(i.id)
		) ?? [];

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
					{brand} <span className={"text-red-color"}>{model}</span>
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
					{tags.map((i, index) => (
						<CarTag key={index} car={props.car}>
							{i.name}
						</CarTag>
					))}
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
					Депозит от{" "}
					<span className={"font-weight-semibold"}>
						{props.car.deposit.toLocaleString()} ₽
					</span>
				</div>
				<div className={"mb-px-40"}>
					<button
						className={"site-btn big"}
						onClick={() => {
							props.setStep("start");
						}}>
						Забронировать
					</button>
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
							data={{ name: "КПП", value: "АКПП" }}
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
const CarRequestFormImage: React.FC<{
	closeFunc: () => void;
	car: CarRentDataInfo;
}> = (props) => {
	const [car, setCar] = useState<CarData | ErrorResponse | undefined>();
	const [index, setIndex] = useState(0);

	const [showModal, setShowModal] = useState(false);
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	useEffect(() => {
		const fetchCarData = async () => {
			setCar(undefined);
			let carData = await Api.car(props.car.id);
			setCar(carData);
		};
		fetchCarData();
	}, []);
	const handleSelect = (selectedIndex) => {
		if (Api.isError(car)) return;
		if (selectedIndex >= (car?.images?.length ?? 0)) selectedIndex = 0;
		if (selectedIndex < 0) selectedIndex = (car?.images?.length ?? 1) - 1;
		setIndex(selectedIndex);
	};

	if (!car)
		return (
			<div
				className={
					"d-flex flex-column position-relative justify-content-center align-items-center"
				}
				style={{ minWidth: "600px", maxWidth: "600px" }}>
				<Loader />
			</div>
		);
	if (Api.isError(car))
		return (
			<div
				className={
					"d-flex flex-column position-relative justify-content-center align-items-center"
				}
				style={{ minWidth: "600px", maxWidth: "600px" }}>
				<LoadError response={car} />
			</div>
		);

	return (
		<div
			className={"d-flex flex-column position-relative justify-content-center"}
			style={{ minWidth: "600px", maxWidth: "600px" }}>
			<CarImagesModal
				show={showModal}
				car={car}
				handleClose={handleClose}
				index={index}
			/>
			<div className={"car-images mb-0"}>
				<Carousel
					activeIndex={index}
					onSelect={handleSelect}
					controls={false}
					indicators={false}>
					{car.images.map((img, index) => (
						<Carousel.Item key={index}>
							<div
								className={"car-images-image-container cursor-pointer"}
								onClick={handleShow}>
								<img
									className="d-block w-100 car-images-image"
									src={img.full}
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
						{car.images.map((i, ind) => (
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

const CarBookingForm: React.FC<{
	wide?: boolean;
	text?: string | ReactNode;
	func?: () => void;
	btn?: ReactNode;
	step?: string;
	car: CarRentDataInfo;
}> = (props) => {
	const [show, setShow] = useState(false);
	const [step, setStep] = useState(props.step ?? "rent");
	const [data, setData] = useState<CallRequestData>({
		name: "",
		lastName: "",
		phone: "",
		confirm: false,
		errors: {},
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		if (props.func) props.func();
		setShow(true);
	};
	return (
		<>
			<div onClick={handleShow} style={{ cursor: "pointer" }}>
				{props.btn ?? (
					<button className={"site-btn big" + (props.wide ? " w-100" : "")}>
						{props.text ?? <>Забронировать</>}
					</button>
				)}
			</div>

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
						setStep={setStep}
						closeFunc={handleClose}
						car={props.car}
					/>
				)}
				{step === "start" && (
					<CarRentContacts
						data={data}
						setData={setData}
						closeOnBack={props.step == "start"}
						car={props.car}
						closeFunc={handleClose}
						setStep={setStep}
					/>
				)}
				{step === "confirm" && (
					<CarRentConfirmPhone
						data={data}
						car={props.car}
						closeFunc={handleClose}
						setStep={setStep}
					/>
				)}
				{step === "payment" && (
					<CarRentPaymentType
						data={data}
						car={props.car}
						closeFunc={handleClose}
						setStep={setStep}
					/>
				)}
				{step === "finish" && <CarRentFormConfirmed closeFunc={handleClose} />}
			</ModalFormTemplate>
		</>
	);
};

export default CarBookingForm;
