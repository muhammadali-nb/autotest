import React, { FC, useEffect, useState } from "react";
import { ModalTemplateInput, ModalTemplatePhone } from "../ModalFormTemplate";
import Utils from "../../../utils/Utils";
import { CallRequestData, ErrorResponse } from "../../../Api";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";

const MobileOrderCallForm: FC<{
	closeFn: () => void;
	setSent: (boolean) => void;
}> = (props) => {
	const [data, setData] = useState<CallRequestData>({
		name: "",
		lastName: "",
		phone: "",
		confirm: true,
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
			const res = await axios.post("https://taxivoshod.ru/api/voshod-auto/", {
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
		<div className={"mobile-modal_body-ordercall"}>
			<div>
				<h1>
					запрос <br />
					<span>на бронирование автомобиля</span>
				</h1>
				<p>
					Оставьте свой номер телефона и мы перезвоним вам в ближайшее время
				</p>
			</div>
			<div>
				<div>
					<ModalTemplateInput
						placeholder="Фамилия"
						value={data.lastName}
						error={data.errors["lastName"]}
						small={true}
						onChange={(e) => update("lastName", e.target.value)}
						onInput={(e) => update("lastName", e.target.value)}
					/>
					<ModalTemplateInput
						placeholder="Имя"
						value={data.name}
						error={data.errors["name"]}
						small={true}
						onChange={(e) => update("name", e.target.value)}
						onInput={(e) => update("name", e.target.value)}
					/>
					<ModalTemplatePhone
						error={data.errors["phone"]}
						small={true}
						onInput={(e: any) => update("phone", e.target.value)}
						onChange={(e: any) => update("phone", e.target.value)}
					/>
					<ModalTemplateInput
						error={data.errors["email"]}
						small={true}
						onChange={(e: any) => update("email", e.target.value)}
						onInput={(e: any) => update("email", e.target.value)}
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
				<p className="form-mobile-policy mt-px-15">
					Нажимая на кнопку “Забронировать”, вы соглашаетесь с{" "}
					<Link
						to={"/policy"}
						target={"_blank"}
						className={"default-link dark underlined form-mobile-policy-link "}>
						Условиями обработки персональных данных
					</Link>
				</p>
			</div>

			<div className=" personal-account_footer mobile-modal_body-company mt-auto">
				ООО ВОСХОДⓒ 2023 год
			</div>
		</div>
	);
};

const MobileOrderCallResult: FC<{ closeFn: () => void }> = (props) => {
	return (
		<div>
			<div style={{ marginTop: "60px" }}>
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
				<button className={"site-btn small"} onClick={() => props.closeFn()}>
					Закрыть
				</button>
			</div>
		</div>
	);
};

const MobileOrderCall: FC<{ closeFunc: () => void }> = (props) => {
	const [sent, setSent] = useState(false);
	return (
		<>
			{!sent ? (
				<MobileOrderCallForm setSent={setSent} closeFn={props.closeFunc} />
			) : (
				<MobileOrderCallResult closeFn={props.closeFunc} />
			)}
		</>
	);
};
export default MobileOrderCall;
