import React, { useState } from "react";
import {
	ModalTemplateConfirm,
	ModalTemplateContent,
	ModalTemplateInput,
	ModalTemplatePhone,
} from "../../../common/ModalFormTemplate";
import { FormCheck, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { spawn } from "child_process";
import Utils from "../../../../utils/Utils";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "../../../../Api";
interface IProps {
	show: boolean;
	onHide: () => void;
	type: "bank" | "score";
}

const PaymentBankCardAddModal = (props: { onHide: () => void }) => {
	const { onHide } = props;
	const [data, setData] = useState({
		number: "",
		name: "",
		main: false,
		errors: {},
		confirm: false,
	});

	const [errorMessage, setErrorMessage] = useState<null | string>();

	const [passed, setPassed] = useState(false);

	const send = async () => {
		let errors = Utils.validateAddBankCard(data);
		if (Object.keys(errors).length > 0) {
			setData({ ...data, errors: errors });
			setPassed(false);
			return;
		}

		try {
			const res = await api.post("/voshod-auto/", {
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
		<>
			<div className={"mb-px-60"}>
				<button
					className={
						"default-link font-size-18 font-weight-semibold text-hover-default"
					}
					onClick={onHide}>
					<FontAwesomeIcon icon={faAngleLeft} />
					&nbsp;&nbsp;ВЕРНУТЬСЯ
				</button>
			</div>
			<div className="mb-px-60">
				<div
					className={
						"call-content-text-header font-size-40 mb-px-10 line-height-130 fw-semibold"
					}>
					Добавить карту
				</div>
				<div className={"call-content-text font-size-16 fw-medium"}>
					Оставьте свой номер телефона, <br /> для регистрации и оплаты
					бронирования
				</div>
			</div>
			<div className="mb-px-100">
				<ModalTemplateInput
					placeholder="Номер карты"
					error={data.errors["number"]}
					onInput={(e: any) => update("phone", e.target.value)}
					onChange={(e: any) => update("phone", e.target.value)}
					small={false}
				/>
				<ModalTemplateInput
					placeholder="Назовите карту (необязательно)"
					error={data.errors["name"]}
					onInput={(e: any) => update("name", e.target.value)}
					onChange={(e: any) => update("name", e.target.value)}
					small={false}
				/>
				<FormCheck
					checked={data.main}
					onChange={(e) => update("main", e.target.value)}
					label={
						<span style={{ fontWeight: "500", fontSize: "16px" }}>
							Сделать основной
						</span>
					}
				/>
				{errorMessage && (
					<div className={"my-2 text-red-color font-size-12"}>
						{errorMessage}
					</div>
				)}
			</div>
			<div className="mt-auto">
				<button className={"site-btn small dark"} onClick={send}>
					Далее
				</button>
				<ModalTemplateConfirm
					confirmed={data.confirm}
					error={data.errors["confirm"]}
					onChange={(e: any) => update("confirm", e.target.value)}
					className="font-size-12"
					small={true}
				/>
			</div>
		</>
	);
};

const PaymentScoreCardAdd = (props: { onHide: () => void }) => {
	const { onHide } = props;

	return (
		<>
			<div className={"mb-px-60"}>
				<button
					className={
						"default-link font-size-18 font-weight-semibold text-hover-default"
					}
					onClick={onHide}>
					<FontAwesomeIcon icon={faAngleLeft} />
					&nbsp;&nbsp;ВЕРНУТЬСЯ
				</button>
			</div>
			<div className="mb-px-60">
				<div
					className={
						"call-content-text-header font-size-40 mb-px-10 line-height-130 fw-semibold"
					}>
					Добавить Счёт
				</div>
				<div className={"call-content-text font-size-16 fw-medium"}>
					Оставьте свой номер телефона, <br /> для регистрации и оплаты
					бронирования
				</div>
			</div>
			<div className="mb-px-100">
				<ModalTemplateInput
					placeholder="Название (необязательно)"
					// // error={data.errors["phone"]}
					// onInput={(e: any) => validatePhone("phone", e.target.value)}
					// onChange={(e: any) => validatePhone("phone", e.target.value)}
					small={false}
				/>
				<ModalTemplateInput
					placeholder="БИК"
					// // error={data.errors["phone"]}
					// onInput={(e: any) => validatePhone("phone", e.target.value)}
					// onChange={(e: any) => validatePhone("phone", e.target.value)}
					small={false}
				/>
				<ModalTemplateInput
					placeholder="Р/С"
					// // error={data.errors["phone"]}
					// onInput={(e: any) => validatePhone("phone", e.target.value)}
					// onChange={(e: any) => validatePhone("phone", e.target.value)}
					small={false}
				/>
				<ModalTemplateInput
					placeholder="К/С"
					// // error={data.errors["phone"]}
					// onInput={(e: any) => validatePhone("phone", e.target.value)}
					// onChange={(e: any) => validatePhone("phone", e.target.value)}
					small={false}
				/>
				<div
					className="d-grid"
					style={{ gridTemplateColumns: "1fr 1fr", columnGap: "15px" }}>
					<ModalTemplateInput
						placeholder="ИНН"
						// // error={data.errors["phone"]}
						// onInput={(e: any) => validatePhone("phone", e.target.value)}
						// onChange={(e: any) => validatePhone("phone", e.target.value)}
						small={false}
					/>
					<ModalTemplateInput
						placeholder="КПП"
						// // error={data.errors["phone"]}
						// onInput={(e: any) => validatePhone("phone", e.target.value)}
						// onChange={(e: any) => validatePhone("phone", e.target.value)}
						small={false}
					/>
				</div>
				<ModalTemplateInput
					placeholder="Название банка"
					// // error={data.errors["phone"]}
					// onInput={(e: any) => validatePhone("phone", e.target.value)}
					// onChange={(e: any) => validatePhone("phone", e.target.value)}
					small={false}
				/>
				<FormCheck
					className="m-0"
					label={
						<span style={{ fontWeight: "500", fontSize: "16px" }}>НДС</span>
					}
				/>
				<FormCheck
					className="mt-px-20"
					label={
						<span style={{ fontWeight: "500", fontSize: "16px" }}>
							Сделать основной
						</span>
					}
				/>
				{/* {data.errors["server"] && (
							<div className={"my-2 text-red-color font-size-12"}>
								{data.errors["server"]}
							</div>
						)} */}
			</div>
			<div className="mt-auto">
				<button
					className={"site-btn small dark"}
					onClick={(e) => {
						e.preventDefault();
						// sendPhone();
					}}>
					Далее
				</button>
				<ModalTemplateConfirm className="font-size-12" small={true} />
			</div>
		</>
	);
};

const PaymentCardAddModal = (props: IProps) => {
	const { show, onHide, type } = props;
	return (
		<Modal {...props} centered>
			<div className={"modal-template personal-account_modal"}>
				<ModalTemplateContent>
					{type === "bank" ? (
						<PaymentBankCardAddModal onHide={onHide} />
					) : (
						<PaymentScoreCardAdd onHide={onHide} />
					)}
				</ModalTemplateContent>
			</div>
		</Modal>
	);
};

export default PaymentCardAddModal;
