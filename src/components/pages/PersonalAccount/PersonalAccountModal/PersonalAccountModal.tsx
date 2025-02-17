import { Modal } from "react-bootstrap";
import {
	ModalTemplateContent,
	ModalTemplateInput,
	ModalTemplatePhone,
} from "../../../common/ModalFormTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./PersonalAccountModal.scss";
import Utils from "../../../../utils/Utils";
import { useAuth } from "../../../../hooks/useAuth";
import WithdrawDesktop from "../../../common/PersonalAccount/PersonalAccountWithdraw/desktop/PersonalAccountWithdraw";
import axios from "axios";
import PersonalAccountReplenish from "../../../common/PersonalAccount/PersonalAccountReplenish/desktop/PersonalAccountReplenish";
import PersonalAccountTransaction from "../../../common/PersonalAccount/PersonalAccountTransaction/desktop/PersonalAccountTransaction";

const SuccessStep: React.FC<{
	type: string;
	onHide: () => void;
}> = (props) => {
	const { type, onHide } = props;

	return (
		<>
			<div className="mb-px-90 mt-px-30">
				<div
					className={
						"call-content-text-header font-size-40 mb-px-10 line-height-130 fw-semibold"
					}>
					{type === "phone" && (
						<>
							Ваш телефон <br />
							успешно изменён!
						</>
					)}
					{type === "email" && (
						<>
							Ваша почта <br />
							успешно изменена!
						</>
					)}
				</div>
			</div>
			<div className="mt-auto">
				<button
					className={"site-btn small dark"}
					onClick={(e) => {
						e.preventDefault();
						onHide();
					}}>
					Закрыть
				</button>
			</div>
		</>
	);
};

export const CodeConfirmForm: React.FC<{
	step: string;
	setStep: (arg0: string) => void;
	newPhone: string;
	type: string;
	currentPhone: string;
	repeatRequest: (item: string, setError: (err: string) => void) => void;
	onHide: () => void;
	newEmail?: string;
}> = (props) => {
	const {
		step,
		setStep,
		newPhone,
		repeatRequest,
		currentPhone,
		type,
		onHide,
		newEmail,
	} = props;
	const { phone } = useAuth();

	const [passed, setPassed] = useState(false);
	const [code, setCode] = useState("      ");
	const [error, setError] = useState("");
	const [idPrefix] = useState(Utils.randomString());
	const { register, error_message } = useAuth();
	const [timer, setTimer] = useState(60);

	useEffect(() => {
		let id = "confirm" + idPrefix + "-0";
		let item = document.getElementById(id) as HTMLInputElement;
		item?.focus();
		item?.setSelectionRange(0, 1);
		setTimer(timer);
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

	const senCode = () => {
		if (code.replace(/\D+/g, "").length < 5) {
			setPassed(false);
			setError("Укажите код подтверждения!");
			return;
		}
		setError("");

		if (type === "phone") {
			const phone = step === "confirm" ? newPhone : "";

			axios
				.get(
					`/voshod-auto/?w=change-phone&change-${
						step === "confirmOld" ? "old" : "new"
					}-phone=1&code=${code}&phone=${phone}`,
					{ withCredentials: true }
				)
				.then((res) => {
					if (res.data.result === 1) {
						setPassed(true);
						if (step === "confirmOld") {
							setStep("new");
						} else {
							setStep("success");
							// console.log(res.data)
						}
					} else {
						setPassed(false);
						setError(res.data.message);
					}
				})
				.catch((e) => {
					setPassed(false);
					console.log(e);
					if (e.response.data.message) {
						setError(e.response.data.message);
					}
				});
		} else if (type === "email") {
			const email = step === "confirm" ? newEmail : "";

			axios
				.get(
					`/voshod-auto/?w=change-email&change-${
						step === "confirmOld" ? "old" : "new"
					}-email=1&code=${code}&email=${email}`,
					{ withCredentials: true }
				)
				.then((res) => {
					if (res.data.result === 1) {
						setPassed(true);
						if (step === "confirmOld") {
							setStep("new");
						} else {
							setStep("success");
							// console.log(res.data)
						}
					} else {
						setPassed(false);
						setError(res.data.message);
					}
				})
				.catch((e) => {
					setPassed(false);
					console.log(e);
					if (e.response.data.message) {
						setError(e.response.data.message);
					}
				});
		}
	};

	const update = (index: number, value: string) => {
		if (!value.replace(/\D/, "")) {
			setPassed(false);
			return;
		}
		let output = code.substring(0, index) + value + code.substring(index + 1);
		setCode(output);

		console.log("update code: " + output);
		let id = "confirm" + idPrefix + "-" + (index + 1);
		if (index < 5) {
			let item = document.getElementById(id) as HTMLInputElement;
			item?.focus();
			item?.setSelectionRange(0, 1);
		}

		let passed = output.replace(/\D+/g, "").length >= 5;
		setPassed(passed);
		console.log("passed: " + passed);
	};

	return (
		<>
			<div className={"mb-px-60"}>
				<button
					className={
						"default-link font-size-18 font-weight-semibold text-hover-default"
					}
					onClick={() => {
						if (step === "confirmOld") {
							onHide();
						} else {
							setStep("new");
						}
					}}>
					<FontAwesomeIcon icon={faAngleLeft} />
					&nbsp;&nbsp;ВЕРНУТЬСЯ
				</button>
			</div>
			<div className="mb-px-60">
				<div
					className={
						"call-content-text-header font-size-40 mb-px-10 line-height-130 fw-semibold"
					}>
					{type === "phone" && (
						<>
							Изменить
							<br />
							номер телефона
						</>
					)}
					{type === "email" && <>Изменить E-mail</>}
					{type === "withdraw" && <>Вывести деньги</>}
					{type === "replenish" && <>Пополнить СЧЁТ</>}
					{type === "transaction" && <>Перевести деньги</>}
				</div>
				<div className={"call-content-text font-size-16 fw-medium"}>
					<span className={"text-default"}>Мы отправили вам код</span>
					<br />
					на номер {newPhone ? newPhone : currentPhone}
				</div>
			</div>
			<div>
				<div className={"d-flex justify-content-between"}>
					<ModalTemplateInput
						id={"confirm" + idPrefix + "-0"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						small={false}
						onInput={(e: any) => update(0, e.target.value)}
					/>
					<ModalTemplateInput
						id={"confirm" + idPrefix + "-1"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						small={false}
						onInput={(e: any) => update(1, e.target.value)}
					/>
					<ModalTemplateInput
						small={false}
						id={"confirm" + idPrefix + "-2"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						onInput={(e: any) => update(2, e.target.value)}
					/>
					<ModalTemplateInput
						small={false}
						id={"confirm" + idPrefix + "-3"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						onInput={(e: any) => update(3, e.target.value)}
					/>
					<ModalTemplateInput
						small={false}
						id={"confirm" + idPrefix + "-4"}
						container_style={{ maxWidth: "40px" }}
						maxLength={1}
						onInput={(e: any) => update(4, e.target.value)}
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
							onClick={() =>
								repeatRequest(newPhone ? newPhone : currentPhone, setError)
							}>
							Отправить СМС ещё раз
						</button>
					</div>
				)}
				{error.length > 0 && (
					<div className={"my-2 text-red-color font-size-14"}>{error}</div>
				)}
				{error_message && (
					<div className={"my-2 text-red-color font-size-14"}>
						{error_message}
					</div>
				)}
			</div>

			<div className={"d-flex justify-content-between mt-auto"}>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={senCode}>
					Подтвердить код
				</button>
				{step !== "confirmOld" && (
					<button
						className={
							"default-link text-decoration-none default-transition text-gray-color text-hover-default"
						}
						onClick={() => setStep("new")}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;&nbsp;
						{type === "phone" && step === "confirm" && <>Изменить номер</>}
						{type === "email" && <>Изменить почту</>}
						{(type === "withdraw" ||
							type === "replenish" ||
							type === "transaction") && <>Вернуться</>}
					</button>
				)}
			</div>
		</>
	);
};

const EditPhoneForm: React.FC<{
	onHide: () => void;
	getCode: (item: string, setError: (err: string) => void) => void;
	step: string;
	setStep: (arg0: string) => void;
	currentPhone: string;
}> = (props) => {
	const { onHide, getCode, step, setStep, currentPhone } = props;
	// const [passed, setPassed] = useState(false);
	const [oldConfirmation, setOldConfirmation] = useState(false);
	const [data, setData] = useState({
		phone: "",
		errors: {},
		confirm: true,
	});

	const validatePhone = (field: string, value: string) => {
		let errors = data.errors;
		delete errors[field];
		let newData = { ...data, [field]: value, errors: errors };
		setData(newData);
		errors = Utils.validateConfirmPhone(newData);
		// setPassed(Object.keys(errors).length === 0);
		Utils.validatePhone(data.phone);
	};

	const setServerError = (err: string) => {
		let errors = data.errors;

		errors["server"] = err;

		let newData = { ...data, errors: errors };
		setData(newData);
	};

	const sendPhone = () => {
		let errors = Utils.validateConfirmPhone(data);
		if (Object.keys(errors).length > 0) {
			setData({ ...data, errors: errors });
			// setPassed(false);
			return;
		}
		getCode(data.phone, setServerError);
	};

	const oldConfirmationCode = () => {
		if (oldConfirmation) return;
		axios
			.get("/voshod-auto/?w=change-phone&change-old-phone=1", {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res.data);
				setOldConfirmation(false);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		if (step !== "confirmOld" || oldConfirmation) return;
		setOldConfirmation(true);
		oldConfirmationCode();
	}, []);

	return (
		<>
			{step === "confirmOld" && (
				<CodeConfirmForm
					step={step}
					setStep={setStep}
					repeatRequest={oldConfirmationCode}
					type={"phone"}
					newPhone={""}
					currentPhone={currentPhone}
					onHide={onHide}
				/>
			)}
			{step === "new" && (
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
					<div className="mb-px-90">
						<div
							className={
								"call-content-text-header font-size-40 mb-px-10 line-height-130 fw-semibold"
							}>
							Изменить
							<br />
							номер телефона
						</div>
						<div className={"call-content-text font-size-16 fw-medium"}>
							Введите ваш новый номер телефона
						</div>
					</div>
					<div>
						<ModalTemplatePhone
							error={data.errors["phone"]}
							onInput={(e: any) => validatePhone("phone", e.target.value)}
							onChange={(e: any) => validatePhone("phone", e.target.value)}
							small={false}
						/>
						{data.errors["server"] && (
							<div className={"my-2 text-red-color font-size-12"}>
								{data.errors["server"]}
							</div>
						)}
					</div>
					<div className="mt-auto">
						<button
							className={"site-btn small dark"}
							onClick={(e) => {
								e.preventDefault();
								sendPhone();
							}}>
							Далее
						</button>
					</div>
				</>
			)}
			{step === "confirm" && (
				<CodeConfirmForm
					step={step}
					newPhone={data.phone}
					currentPhone={""}
					setStep={setStep}
					repeatRequest={getCode}
					type={"phone"}
					onHide={onHide}
				/>
			)}
			{step === "success" && <SuccessStep type={"phone"} onHide={onHide} />}
		</>
	);
};

const EditEmailForm: React.FC<{
	onHide: () => void;
	getCode: (item: string, setError: (err: string) => void) => void;
	step: string;
	setStep: (arg0: string) => void;
	currentPhone: string;
}> = (props) => {
	const { onHide, getCode, step, setStep, currentPhone } = props;

	const [oldConfirmation, setOldConfirmation] = useState(false);

	const [data, setData] = useState({
		email: "",
		errors: {},
		confirm: true,
	});

	const validateEmail = (field: string, value: string) => {
		let errors = data.errors;
		delete errors[field];
		let newData = { ...data, [field]: value, errors: errors };
		setData(newData);
		errors = Utils.validateEmail(data);
	};

	const setServerError = (err: string) => {
		let errors = data.errors;

		errors["server"] = err;

		let newData = { ...data, errors: errors };
		setData(newData);
	};

	const sendEmail = () => {
		let errors = Utils.validateEmail(data);
		if (Object.keys(errors).length > 0) {
			setData({ ...data, errors: errors });
			return;
		}
		getCode(data.email, setServerError);
	};

	const oldConfirmationCode = () => {
		if (oldConfirmation) return;

		axios
			.get("/voshod-auto/?w=change-email&change-old-email=1", {
				withCredentials: true,
			})
			.then((res) => {
				if (res.data.reason) {
					setOldConfirmation(false);
					setStep("new");
				}
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		if (step !== "confirmOld" || oldConfirmation) return;
		setOldConfirmation(true);
		oldConfirmationCode();
	}, []);

	return (
		<>
			{step === "confirmOld" && (
				<CodeConfirmForm
					step={step}
					newPhone={""}
					currentPhone={currentPhone}
					setStep={setStep}
					repeatRequest={oldConfirmationCode}
					type={"email"}
					onHide={onHide}
				/>
			)}
			{step === "new" && (
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
					<div className="mb-px-90">
						<div
							className={
								"call-content-text-header font-size-40 mb-px-10 line-height-130 fw-semibold"
							}>
							Изменить E-mail
						</div>
						<div className={"call-content-text font-size-16 fw-medium"}>
							Введите ваш новый e-mail
						</div>
					</div>
					<div>
						<ModalTemplateInput
							error={data.errors["email"]}
							type={"email"}
							small={false}
							placeholder="E-mail"
							onChange={(e: any) => validateEmail("email", e.target.value)}
						/>
						{data.errors["server"] && (
							<div className={"my-2 text-red-color font-size-12"}>
								{data.errors["server"]}
							</div>
						)}
					</div>
					<div className="mt-auto">
						<button
							className={"site-btn small dark"}
							onClick={(e) => {
								e.preventDefault();
								sendEmail();
							}}>
							Далее
						</button>
					</div>
				</>
			)}
			{step === "confirm" && (
				<CodeConfirmForm
					step={step}
					setStep={setStep}
					repeatRequest={getCode}
					newPhone={""}
					currentPhone={currentPhone}
					type={"email"}
					onHide={onHide}
					newEmail={data.email}
				/>
			)}
			{step === "success" && <SuccessStep type={"email"} onHide={onHide} />}
		</>
	);
};

const PersonalAccountModal: React.FC<{
	show: boolean;
	onHide: () => void;
	type: string;
	currentPhone: string;
	balance?: number;
}> = (props) => {
	const { type, onHide, currentPhone, balance } = props;

	const [step, setStep] = useState(type === "phone" ? "confirmOld" : "new");

	const getCode = (item: string, setError: (err: string) => void) => {
		if (type === "phone") {
			axios
				.get(`/voshod-auto/?w=change-phone&change-new-phone=1&phone=${item}`, {
					withCredentials: true,
				})
				.then((res) => {
					// console.log(res.data)
					setStep("confirm");
				})
				.catch((e) => {
					console.log(e);
					if (e.response.data.message) {
						setError(e.response.data.message);
					}
				});
		} else if (type === "email") {
			axios
				.get(`/voshod-auto/?w=change-email&email=${item}`, {
					withCredentials: true,
				})
				.then((res) => {
					// console.log(res.data)
					// setStep("confirm");
					setStep("success");
				})
				.catch((e) => {
					console.log(e);
					if (e.response.data.message) {
						setError(e.response.data.message);
					}
				});
		} else if (type === "withdraw") {
			setStep("confirm");
		} else if (type === "replenish") {
			setStep("confirm");
		} else if (type === "transaction") {
			setStep("confirm");
		}
	};

	const handleClose = () => {
		onHide();
		setStep(type === "phone" ? "confirmOld" : "new");
	};

	useEffect(() => {
		setStep(type === "phone" ? "confirmOld" : "new");
	}, [type]);

	return (
		<Modal {...props} centered>
			<div className={"modal-template personal-account_modal"}>
				<ModalTemplateContent>
					{type === "phone" && (
						<EditPhoneForm
							step={step}
							setStep={setStep}
							onHide={handleClose}
							getCode={getCode}
							currentPhone={currentPhone}
						/>
					)}
					{type === "email" && (
						<EditEmailForm
							step={step}
							setStep={setStep}
							onHide={handleClose}
							getCode={getCode}
							currentPhone={currentPhone}
						/>
					)}
					{type === "withdraw" && (
						<WithdrawDesktop
							step={step}
							setStep={setStep}
							onHide={handleClose}
							getCode={getCode}
							currentPhone={currentPhone}
							balance={balance}
						/>
					)}
					{type === "replenish" && (
						<PersonalAccountReplenish
							step={step}
							setStep={setStep}
							onHide={handleClose}
							getCode={getCode}
							currentPhone={currentPhone}
						/>
					)}
					{type === "transaction" && (
						<PersonalAccountTransaction
							step={step}
							setStep={setStep}
							onHide={handleClose}
							getCode={getCode}
							currentPhone={currentPhone}
						/>
					)}
				</ModalTemplateContent>
			</div>
		</Modal>
	);
};

export default PersonalAccountModal;
