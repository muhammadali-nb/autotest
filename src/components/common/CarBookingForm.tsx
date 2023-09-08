import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Api, { CallRequestData } from "../../Api";
import ModalFormTemplate, {
	ModalTemplateConfirm,
	ModalTemplateContent,
	ModalTemplateInput,
	ModalTemplatePhone,
} from "./ModalFormTemplate";
import Utils from "../../Utils";
import { CarDataInfo } from "./CarCard";

const CarBookingFormContent: React.FC<{
	car: CarDataInfo;
	closeFunc: () => void;
	setSent: (boolean) => void;
}> = (props) => {
	const [data, setData] = useState<CallRequestData>({
		name: "",
		lastName: "",
		phone: "",
		confirm: false,
		errors: {},
	});
	const [passed, setPassed] = useState(false);
	const send = () => {
		let errors = Utils.validateForm(data);
		if (Object.keys(errors).length > 0) {
			setData({ ...data, errors: errors });
			setPassed(false);
			return;
		}
		Api.carBookRequest(data, props.car).then((resp) => {
			if (Api.isError(resp)) {
				setData({
					...data,
					errors: { server: "Ошибка соединения с сервером!" },
				});
				return;
			}

			if (resp.success) {
				props.setSent(true);
				setPassed(true);
			} else {
				setData({ ...data, errors: resp.fields ?? {} });
				setPassed(false);
			}
		});
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
						error={data.errors["name"]}
						onInput={(e: any) => update("name", e.target.value)}
						placeholder={"Имя"}
						small={false}
					/>
					<ModalTemplateInput
						error={data.errors["lastName"]}
						onInput={(e: any) => update("lastName", e.target.value)}
						placeholder={"Фамилия"}
						small={false}
					/>
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
						placeholder={"E-mail"}
					/>
				</div>
				{data.errors["server"] && (
					<div className={"my-2 text-red-color font-size-12"}>
						{data.errors["server"]}
					</div>
				)}
			</div>

			<div>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={() => send()}>
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
	car: CarDataInfo;
}> = (props) => {
	const [show, setShow] = useState(false);
	const [sent, setSent] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			<button
				className={"site-btn big" + (props.wide ? " w-100" : "")}
				onClick={handleShow}>
				{props.text ?? <>Забронировать</>}
			</button>
			<ModalFormTemplate show={show} onHide={handleClose} centered size={"xl"}>
				{!sent && (
					<CarBookingFormContent
						car={props.car}
						closeFunc={handleClose}
						setSent={setSent}
					/>
				)}
				{sent && <CarBookingFormConfirmed closeFunc={handleClose} />}
			</ModalFormTemplate>
		</>
	);
};

export default CarBookingForm;
