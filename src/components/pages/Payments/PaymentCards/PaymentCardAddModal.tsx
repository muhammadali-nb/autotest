import React from "react";
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
interface IProps {
	show: boolean;
	onHide: () => void;
	type: "bank" | "score";
}

const PaymentBankCardAddModal = (props: { onHide: () => void }) => {
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
					// // error={data.errors["phone"]}
					// onInput={(e: any) => validatePhone("phone", e.target.value)}
					// onChange={(e: any) => validatePhone("phone", e.target.value)}
					small={false}
				/>
				<ModalTemplateInput
					placeholder="Назовите карту (необязательно)"
					// // error={data.errors["phone"]}
					// onInput={(e: any) => validatePhone("phone", e.target.value)}
					// onChange={(e: any) => validatePhone("phone", e.target.value)}
					small={false}
				/>
				<FormCheck
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
