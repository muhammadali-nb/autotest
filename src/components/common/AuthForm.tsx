import { useEffect, useState } from "react"
import ModalFormTemplate, { ModalTemplateConfirm, ModalTemplateContent, ModalTemplateInput, ModalTemplatePhone } from "./ModalFormTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Utils from "../../Utils";
import Api, { CallRequestData } from "../../Api";

const AuthFormContent: React.FC<{
    closeFunc: () => void,
    setStep: (arg0: string) => void,
    data: CallRequestData,
    setData: (arg0: CallRequestData) => void
}> = (props) => {
    const [passed, setPassed] = useState(false);

    const send = () => {
		let errors = Utils.validateForm(props.data);
		if (Object.keys(errors).length > 0) {
			props.setData({ ...props.data, errors: errors });
			setPassed(false);
			return;
		}
		Api.carRentCodeRequest(props.data).then((resp) => {
			if (Api.isError(resp)) {
				props.setData({
					...props.data,
					errors: { server: "Ошибка соединения с сервером!" },
				});
				return;
			}

			if (resp.success) {
				props.setStep("confirm");
				setPassed(true);
			} else {
				props.setData({ ...props.data, errors: resp.fields ?? {} });
				setPassed(false);
			}
		});
	};

    const update = (field: string, value: any) => {
        let errors = props.data.errors;
        delete errors[field];
        let newData = { ...props.data, [field]: value, errors: errors };
        props.setData(newData);
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
                    <ModalTemplateInput
                        error={props.data.errors["name"]}
                        onInput={(e: any) => update("name", e.target.value)}
                        placeholder={"Имя"}
                        small={false}
                    />
                    <ModalTemplateInput
                        error={props.data.errors["lastName"]}
                        onInput={(e: any) => update("lastName", e.target.value)}
                        placeholder={"Фамилия"}
                        small={false}
                    />
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
					className={"site-btn small"}
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

const AuthForm: React.FC = () => {
    const [show, setShow] = useState(false);
    const [step, setStep] = useState('auth');
    const [data, setData] = useState<CallRequestData>({
        name: "",
        lastName: "",
        phone: "",
        confirm: false,
        errors: {},
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setShow(true)
    });

    return (
        <>
            <ModalFormTemplate show={show} onHide={handleClose} centered size={"xl"}>
                {step === 'auth' &&
                    <AuthFormContent
                        closeFunc={handleClose}
                        setStep={setStep}
                        data={data}
                        setData={setData}
                    />
                }
            </ModalFormTemplate>
        </>
    )
}

export default AuthForm