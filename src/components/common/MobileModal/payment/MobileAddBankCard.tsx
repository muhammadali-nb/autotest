import React, { FC, useEffect, useState } from "react";
import {
	ModalTemplateInput,
	ModalTemplatePhone,
} from "../../ModalFormTemplate";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CallRequestData, ErrorResponse } from "../../../../Api";
import Utils from "../../../../utils/Utils";
import { FormCheck } from "react-bootstrap";

const MobileAddBankCard: FC<{
	closeFn: () => void;
}> = (props) => {
	const [data, setData] = useState({
		number: "",
		name: "",
		main: false,
		errors: {},
		confirm: true,
	});

	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const [passed, setPassed] = useState(false);
	
	const send = async () => {
		let errors = Utils.validateAddBankCard(data);
		if (Object.keys(errors).length > 0) {
			setData({ ...data, errors: errors });
			setPassed(false);
			return;
		}

		try {
			const res = await axios.post("https://taxivoshod.ru/api/voshod-auto/", {
				withCredentials: true,
				body: JSON.stringify({}),
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
		errors = Utils.validateAddBankCard(newData);
		setPassed(Object.keys(errors).length === 0);
	};
	return (
		<div className="d-flex flex-column h-100">
			<div>
				<h1>Добавить карту</h1>
				<p>
					Оставьте свой номер телефона <br /> и мы перезвоним вам в ближайшее
					время
				</p>
			</div>
			<div>
				<div>
					<ModalTemplateInput
						placeholder="Номер карты"
						value={data.number}
						error={data.errors["number"]}
						small={true}
						onChange={(e) => update("number", e.target.value)}
						onInput={(e) => update("number", e.target.value)}
					/>
					<ModalTemplateInput
						placeholder="Назовите карту (необязательно)"
						value={data.name}
						error={data.errors["name"]}
						small={true}
						onChange={(e) => update("name", e.target.value)}
						onInput={(e) => update("name", e.target.value)}
					/>
					<FormCheck
						checked={data.main}
						onChange={(e) => update("confirm", e.target.checked)}
						label={
							<span style={{ fontWeight: "500", fontSize: "12px" }}>
								Сделать основной
							</span>
						}
					/>
				</div>
				<div className={"my-2 text-red-color font-size-12"}>
					{errorMessage || <>&nbsp;</>}
				</div>
			</div>
			<div className="mt-px-50">
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

export default MobileAddBankCard;
