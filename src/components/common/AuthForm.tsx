import React, { useEffect, useState } from "react"
import ModalFormTemplate, { ModalTemplateConfirm, ModalTemplateContent, ModalTemplateInput, ModalTemplatePhone } from "./ModalFormTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Utils from "../../Utils";
import Api, { ConfirmPhone, ErrorResponse } from "../../Api";
import axios, { AxiosError } from 'axios';

const AuthFormContent: React.FC<{
    closeFunc: () => void,
    setStep: (arg0: string) => void,
    data: ConfirmPhone,
    setData: (arg0: ConfirmPhone) => void
}> = (props) => {
    const [passed, setPassed] = useState(false);

    const send = () => {
		let errors = Utils.validateConfirmPhone(props.data);
		if (Object.keys(errors).length > 0) {
			props.setData({ ...props.data, errors: errors });
			setPassed(false);
			return;
		}
        props.setStep('phoneConfirm');
	};

    const update = (field: string, value: any) => {
        let errors = props.data.errors;
        delete errors[field];
        let newData = { ...props.data, [field]: value, errors: errors };
        props.setData(newData);
        errors = Utils.validateConfirmPhone(newData);
        setPassed(Object.keys(errors).length === 0);
        Utils.validatePhone(props.data.phone);
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
                        Вход
                        <br />
                        в личный кабинет
                    </div>
                    <div className={"call-content-text font-size-16"}>
                        Войдите в личный кабинет, чтобы бронировать
                        <br />
                        и арендовать автомобили стало быстрее и удобнее
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <ModalTemplatePhone
                        error={props.data.errors["phone"]}
                        onInput={(e: any) => update("phone", e.target.value)}
                        onChange={(e: any) => update("phone", e.target.value)}
                        small={false}
                    />
                </div>
                {props.data.errors["server"] && (
					<div className={"my-2 text-red-color font-size-12"}>
						{props.data.errors["server"]}
					</div>
				)}
            </div>

            <div>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={() => send()}>
					Отправить код
				</button>
				<ModalTemplateConfirm
					small={false}
					error={props.data.errors["confirm"]}
					confirmed={props.data.confirm}
					onChange={(e) => update("confirm", e.target.checked)}
				/>
			</div>
        </ModalTemplateContent>
    )
}

const AuthPhoneConfirm: React.FC<{
    setStep: (arg0: string) => void,
    timer: number,
    data: ConfirmPhone,
    repeatRequest: () => void
}> = (props) => {
    const [passed, setPassed] = useState(false);
	const [code, setCode] = useState("      ");
	const [error, setError] = useState("");
	const [idPrefix] = useState(Utils.randomString());
	const { register, error_message } = useAuth();
	const [timer, setTimer] = useState(props.timer);

	useEffect(() => {
		let id = "confirm" + idPrefix + "-0";
		let item = document.getElementById(id) as HTMLInputElement;
		item?.focus();
		item?.setSelectionRange(0, 1);
		setTimer(props.timer);
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

	const send = async () => {
		if (code.replace(/\D+/g, "").length < 5) {
			setPassed(false);
			setError("Укажите код подтверждения!");
			return;
		}
		setError("");

		try {
			const res: any = await register(props.data.phone, code);
			if (res.success) {
				props.setStep("create");
				setPassed(true);
			}
		} catch (error) {
			console.log(error);
			setPassed(false);
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
		<ModalTemplateContent>
			<div>
				<div className={"mb-px-90"}>
					<button
						className={
							"default-link font-size-18 font-weight-semibold text-hover-default"
						}
						onClick={() => props.setStep("auth")}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div>
					<div
						className={
							"call-content-text-header font-size-40 line-height-120 mb-px-10"
						}>
						Вход
                        <br />
                        в личный кабинет
					</div>
					<div className={"call-content-text font-size-16"}>
						<span className={"text-default"}>Мы отправили вам код</span>
						<br />
						на номер {props.data.phone}
					</div>
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
							onClick={props.repeatRequest}>
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

			<div className={"d-flex justify-content-between"}>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={() => send()}>
					Подтвердить код
				</button>
				<button
					className={
						"default-link text-decoration-none default-transition text-gray-color text-hover-default"
					}
					onClick={() => props.setStep("auth")}>
					<FontAwesomeIcon icon={faAngleLeft} />
					&nbsp;&nbsp;&nbsp;Изменить номер
				</button>
			</div>
		</ModalTemplateContent>
	);
}

const AuthForm: React.FC<{
    light:boolean
}> = (props) => {
    const [show, setShow] = useState(false);
    const [step, setStep] = useState('auth');

    const { user_status, initialize } = useAuth();
	const [error_message, setErrorMessage] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);

    const [data, setData] = useState<ConfirmPhone>({
        phone: "",
        confirm: false,
        errors: {},
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const confirmPhone = () => {
		if (user_status === "banned") {
			return;
		}
		axios
			.get(
				`https://taxivoshod.ru/api/login.php?auth=1&reg=1&phone=${data.phone}`,
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.success) {
					setStep("confirm");
					setTimer(res.data.timer ?? 59);
				}
			})
			.catch((e) => {
				setErrorMessage(
					(e as AxiosError<ErrorResponse>).response?.data.message ??
						"Возникла ошибка с сервером поробуйте позже"
				);
				console.log(e);
			});
	};

    return (
        <>
            <button className={"user-btn " + (props.light ? "light" : "")} onClick={handleShow}></button>
            <ModalFormTemplate show={show} onHide={handleClose} centered size={"xl"}>
                {step === 'auth' &&
                    <AuthFormContent
                        closeFunc={handleClose}
                        setStep={setStep}
                        data={data}
                        setData={setData}
                    />
                }
                {step === 'phoneConfirm' &&
                    <AuthPhoneConfirm
                        setStep={setStep}
                        timer={timer}
                        repeatRequest={confirmPhone}
                        data={data}
                    />
                }
            </ModalFormTemplate>
        </>
    )
}

export default AuthForm