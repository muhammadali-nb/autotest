import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Api, { CallRequestData, ErrorResponse } from "../../Api";
import ModalFormTemplate, {
	ModalTemplateConfirm,
	ModalTemplateContent,
	ModalTemplateInput,
	ModalTemplatePhone,
} from "./ModalFormTemplate";
import Utils from "../../utils/Utils";
import { CarDataInfo } from "./CarCard";
import { CarCatalogDataInfo } from "../../types/CatalogTypes";
import { AxiosError } from "axios";
import { MobileModal } from "./MobileModal/MobileModal";
import { BrowserView, MobileView } from "react-device-detect";
import api from "../../core/axios";

const CarBookingFormContent: React.FC<{
	car: CarDataInfo | CarCatalogDataInfo;
	closeFunc: () => void;
	setSent: (boolean) => void;
}> = (props) => {
	const [data, setData] = useState<CallRequestData>({
		name: "",
		lastName: "",
		phone: "",
		confirm: false,
		errors: {},
		middleName: "",
		email: "",
	});
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [passed, setPassed] = useState(false);
	const send = async () => {
		let errors = Utils.validateForm(data);
		if (Object.keys(errors).length > 0) {
			setData({ ...data, errors: errors });
			setPassed(false);
			return;
		}

		try {
			const res = await api.post("/voshod-auto/", {
				withCredentials: true,
				body: JSON.stringify({
					w: "form",
					type: "buyout",
					first_name: data.name,
					last_name: data.lastName,
					middle_name: data.middleName,
					phone: data.phone.slice(1),
					email: data.email,
				}),
			});

			if (res.data.result === 1) {
				props.setSent(true);
				setPassed(true);
			}
		} catch (error) {
			setErrorMessage(
				(error as AxiosError<ErrorResponse>).response?.data.message ??
					"Возникла ошибка с сервером поробуйте позже"
			);
		}

		// //@ts-ignore
		// Api.carBookRequest(data, _).then((resp) => {
		// 	if (Api.isError(resp)) {
		// 		setData({
		// 			...data,
		// 			errors: { server: "Ошибка соединения с сервером!" },
		// 		});
		// 		return;
		// 	}

		// 	if (resp.success) {
		// props.setSent(true);
		// setPassed(true);
		// 	} else {
		// 		setData({ ...data, errors: resp.fields ?? {} });
		// 		setPassed(false);
		// 	}
		// });
	};
	const update = (field: string, value: any) => {
		let errors = data.errors;
		delete errors[field];
		let newData = { ...data, [field]: value, errors: errors };
		setData(newData);
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
						onClick={() => props.closeFunc()}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div>
					<div
						className={
							"call-content-text-header font-size-40 line-height-120 mb-px-10"
						}>
						Запрос
						<div className={"font-size-22 line-height-120"}>
							на бронирование автомобиля
						</div>
					</div>
					<div className={"call-content-text font-size-16"}>
						Оставьте свой номер телефона и мы перезвоним <br /> вам в ближайшее
						время
					</div>
				</div>
			</div>
			<div>
				<div>
					<ModalTemplateInput
						error={data.errors["lastName"]}
						onInput={(e: any) => update("lastName", e.target.value)}
						onChnage={(e: any) => update("lastName", e.target.value)}
						placeholder={"Фамилия"}
						small={false}
					/>
					<ModalTemplateInput
						error={data.errors["name"]}
						onInput={(e: any) => update("name", e.target.value)}
						onChange={(e: any) => update("name", e.target.value)}
						placeholder={"Имя"}
						small={false}
					/>
					{/* <ModalTemplateInput
						error={data.errors["middleName"]}
						onInput={(e: any) => update("middleName", e.target.value)}
						placeholder={"Отчество"}
						small={false}
					/> */}
					<ModalTemplatePhone
						error={data.errors["phone"]}
						small={false}
						onInput={(e: any) => update("phone", e.target.value)}
						onChange={(e: any) => update("phone", e.target.value)}
					/>
					<ModalTemplateInput
						error={data.errors["email"]}
						small={false}
						onInput={(e: any) => update("email", e.target.value)}
						onChange={(e: any) => update("email", e.target.value)}
						placeholder={"E-mail"}
					/>
				</div>
				<div className={"my-2 text-red-color font-size-12"}>
					{errorMessage || <>&nbsp;</>}
				</div>
			</div>
			<div>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={send}>
					Перезвоните мне
				</button>
				<ModalTemplateConfirm
					small={false}
					error={data.errors["confirm"]}
					confirmed={data.confirm}
					onChange={(e) => update("confirm", e.target.checked)}
				/>
			</div>
		</ModalTemplateContent>
	);
};
const CarBookingFormConfirmed: React.FC<{ closeFunc: () => void }> = (
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
				<button className={"site-btn small"} onClick={() => props.closeFunc()}>
					Закрыть
				</button>
			</div>
		</ModalTemplateContent>
	);
};

const CarBookingForm: React.FC<{
	wide?: boolean;
	text?: string | ReactNode;
	car: CarCatalogDataInfo;
	className?: string;
}> = (props) => {
	const [show, setShow] = useState(false);
	const [sent, setSent] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<button
				className={
					"site-btn big " +
					(props.wide ? "w-100 " : "") +
					(props.className ?? " ")
				}
				onClick={handleShow}>
				{props.text ?? <>Забронировать</>}
			</button>
			<BrowserView>
				<ModalFormTemplate
					show={show}
					onHide={handleClose}
					centered
					size={"xl"}>
					{!sent && (
						<CarBookingFormContent
							car={props.car}
							closeFunc={handleClose}
							setSent={setSent}
						/>
					)}
					{sent && <CarBookingFormConfirmed closeFunc={handleClose} />}
				</ModalFormTemplate>
			</BrowserView>
		</>
	);
};

export default CarBookingForm;
