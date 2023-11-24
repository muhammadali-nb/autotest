import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CallRequestData, ErrorResponse } from "../../../Api";
import Utils from "../../../utils/Utils";
import {
	ModalTemplateInput,
	ModalTemplatePhone,
	ModalTemplateTextarea,
} from "../ModalFormTemplate";

const MobileCarRequestForm = () => {
	const [data, setData] = useState<CallRequestData>({
		name: "",
		lastName: "",
		phone: "",
		comment: "",
		confirm: true,
		errors: {},
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
				// props.setSent(true);
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
		<div>
			<h1>
				Заявка <br /> на автомобиль
			</h1>
			<p>Оставьте свой номер телефона и мы перезвоним вам в ближайшее время</p>
			<form>
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
				<ModalTemplateTextarea
					value={data.comment}
					error={data.errors["comment"]}
					small={true}
					placeholder="Комментарий"
					onInput={(e: any) => update("comment", e.target.value)}
					onChange={(e: any) => update("comment", e.target.value)}
				/>
			</form>
			<button className="site-btn dark mb-px-25">перезвоните мне</button>
			<p className="form-mobile-policy mt-auto">
				Нажимая на кнопку “Забронировать”, вы соглашаетесь с{" "}
				<Link
					to={"/policy"}
					target={"_blank"}
					className={
						"default-link dark underlined form-mobile-policy-link "
						// (props.error ? "text-red-color" : "")
					}>
					Условиями обработки персональных данных
				</Link>
			</p>
			<div className=" personal-account_footer mobile-modal_body-company ">
				ООО ВОСХОДⓒ 2023 год
			</div>
		</div>
	);
};

export default MobileCarRequestForm;
