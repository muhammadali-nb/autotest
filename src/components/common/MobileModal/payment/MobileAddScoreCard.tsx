import React, { FC, useState } from "react";
import {
	ModalTemplateInput,
	ModalTemplatePhone,
} from "../../ModalFormTemplate";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CallRequestData, ErrorResponse } from "../../../../Api";
import Utils from "../../../../utils/Utils";
import { FormCheck } from "react-bootstrap";

const MobileAddScoreCard: FC<{
	closeFn: () => void;
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
		<div className="d-flex flex-column h-100">
			<div>
				<h1>Добавить Счёт</h1>
				<p>
					Оставьте свой номер телефона <br /> и мы перезвоним вам в ближайшее
					время
				</p>
			</div>
			<div>
				<div>
					<ModalTemplateInput
						placeholder="Назовите карту (необязательно)"
						value={data.lastName}
						error={data.errors["lastName"]}
						small={true}
						onChange={(e) => update("lastName", e.target.value)}
						onInput={(e) => update("lastName", e.target.value)}
					/>
					<ModalTemplateInput
						placeholder="БИК"
						value={data.name}
						error={data.errors["name"]}
						small={true}
						onChange={(e) => update("name", e.target.value)}
						onInput={(e) => update("name", e.target.value)}
					/>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							columnGap: "20px",
						}}>
						<ModalTemplateInput
							placeholder="Р/С"
							value={data.name}
							error={data.errors["name"]}
							small={true}
							onChange={(e) => update("name", e.target.value)}
							onInput={(e) => update("name", e.target.value)}
						/>
						<ModalTemplateInput
							placeholder="К/С"
							value={data.name}
							error={data.errors["name"]}
							small={true}
							onChange={(e) => update("name", e.target.value)}
							onInput={(e) => update("name", e.target.value)}
						/>
						<ModalTemplateInput
							placeholder="ИНН"
							value={data.name}
							error={data.errors["name"]}
							small={true}
							onChange={(e) => update("name", e.target.value)}
							onInput={(e) => update("name", e.target.value)}
						/>
						<ModalTemplateInput
							placeholder="КПП"
							value={data.name}
							error={data.errors["name"]}
							small={true}
							onChange={(e) => update("name", e.target.value)}
							onInput={(e) => update("name", e.target.value)}
						/>
					</div>
					<ModalTemplateInput
						placeholder="Название банка"
						value={data.name}
						error={data.errors["name"]}
						small={true}
						onChange={(e) => update("name", e.target.value)}
						onInput={(e) => update("name", e.target.value)}
					/>
					<div className="d-flex align-items-center">
						<FormCheck
							className="me-px-15"
							label={
								<span style={{ fontWeight: "500", fontSize: "12px" }}>НДС</span>
							}
						/>
						<FormCheck
							label={
								<span style={{ fontWeight: "500", fontSize: "12px" }}>
									Сделать основной
								</span>
							}
						/>
					</div>
				</div>
				<div className={"my-2 text-red-color font-size-12"}>
					{errorMessage || <>&nbsp;</>}
				</div>
			</div>
			<div className="mt-px-5">
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={send}>
					Далее
				</button>
				<p className="form-mobile-policy mt-px-15">
					Нажимая на кнопку “Далее”, вы соглашаетесь <br /> с{" "}
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

export default MobileAddScoreCard;
