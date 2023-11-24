import React, { FC, useState } from "react";
import { ModalTemplateInput, ModalTemplatePhone } from "../ModalFormTemplate";
import Utils from "../../../utils/Utils";
import { CallRequestData, ErrorResponse } from "../../../Api";
import axios, { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { CarDataInfo } from "../CarCard";
import { CarCatalogDataInfo } from "../../../types/CatalogTypes";

const MobileOrderCallForm: FC<{
	closeFn: () => void;
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
		console.log(111);
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
		<>
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
			</div>

			<p className="form-mobile-policy ">
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
			<div className=" personal-account_footer mobile-modal_body-company  mt-auto">
				ООО ВОСХОДⓒ 2023 год
			</div>
		</>
	);
};

const MobileOrderCallResult: FC<{ closeFn: () => void }> = (props) => {
	return (
		<div>
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
				<button className={"site-btn small"} onClick={() => props.closeFn()}>
					Закрыть
				</button>
			</div>
		</div>
	);
};

const MobileOrderCall: FC<{ closeFunc: () => void }> = (props) => {
	const [sent, setSent] = useState(false);

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);

	return (
		<>
			{!sent ? (
				<MobileOrderCallForm setSent={setSent} closeFn={props.closeFunc} />
			) : (
				<MobileOrderCallResult closeFn={props.closeFunc} />
			)}{" "}
		</>
	);
};
export default MobileOrderCall;