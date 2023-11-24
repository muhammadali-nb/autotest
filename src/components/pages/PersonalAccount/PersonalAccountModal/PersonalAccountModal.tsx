import { Modal } from "react-bootstrap";
import { ModalTemplateContent, ModalTemplateInput, ModalTemplatePhone } from "../../../common/ModalFormTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import "./PersonalAccountModal.scss";
import Utils from "../../../../utils/Utils";
import { useAuth } from "../../../../hooks/useAuth";

const CodeConfirmForm: React.FC<{
    setStep: (arg0: string) => void,
    newPhone?: string,
    currentPhone?: string,
    repeatRequest: () => void
}> = (props) => {
    const { setStep, newPhone, repeatRequest, currentPhone } = props;
    const { phone } = useAuth();

    const [passed, setPassed] = useState(false);
    const [code, setCode] = useState("      ");
    const [error, setError] = useState("");
    const [idPrefix] = useState(Utils.randomString());
    const { register, error_message } = useAuth();
    const [timer, setTimer] = useState(0);

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

    }

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
                    onClick={() => setStep("new")}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    &nbsp;&nbsp;ВЕРНУТЬСЯ
                </button>
            </div>
            <div className="mb-px-60">
                <div
                    className={
                        "call-content-text-header font-size-40 mb-px-10 line-height-130 fw-semibold"
                    }>
                    {newPhone ?
                        <>
                            Изменить
                            <br />
                            номер телефона
                        </>
                        :
                        <>
                            Изменить E-mail
                        </>
                    }
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
                            onClick={repeatRequest}>
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
                <button
                    className={
                        "default-link text-decoration-none default-transition text-gray-color text-hover-default"
                    }
                    onClick={() => setStep("new")}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                    &nbsp;&nbsp;&nbsp;{newPhone ? <>Изменить номер</> : <>Изменить почту</>}
                </button>
            </div>
        </>
    );
}

const EditPhoneForm: React.FC<{
    onHide: () => void,
    getCode: () => void,
    step: string,
    setStep: (arg0: string) => void
}> = (props) => {
    const { onHide, getCode, step, setStep } = props;
    // const [passed, setPassed] = useState(false);
    const [data, setData] = useState({
        phone: "",
        errors: {},
        confirm: true
    });

    const validatePhone = (field: string, value: string) => {
        let errors = data.errors;
        delete errors[field];
        let newData = { ...data, [field]: value, errors: errors };
        setData(newData);
        errors = Utils.validateConfirmPhone(newData);
        // setPassed(Object.keys(errors).length === 0);
        Utils.validatePhone(data.phone);
    }

    const sendPhone = () => {
        let errors = Utils.validateConfirmPhone(data);
        if (Object.keys(errors).length > 0) {
            setData({ ...data, errors: errors });
            // setPassed(false);
            return;
        }
        getCode();
    }

    return (
        <>
            {step === "new" &&
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
                            onClick={sendPhone}>
                            Далее
                        </button>
                    </div>
                </>
            }
            {step === "confirm" &&
                <CodeConfirmForm
                    newPhone={data.phone}
                    setStep={setStep}
                    repeatRequest={getCode}
                />
            }
        </>
    )
}

const EditEmailForm: React.FC<{
    onHide: () => void,
    getCode: () => void,
    step: string,
    setStep: (arg0: string) => void,
    currentPhone: string
}> = (props) => {
    const { onHide, getCode, step, setStep, currentPhone } = props;

    const [data, setData] = useState({
        email: "",
        errors: {},
        confirm: true
    });

    const validateEmail = (field: string, value: string) => {
        let errors = data.errors;
        delete errors[field];
        let newData = { ...data, [field]: value, errors: errors };
        setData(newData);
        errors = Utils.validateEmail(data);
        // setPassed(Object.keys(errors).length === 0);
    }

    const sendEmail = () => {
        let errors = Utils.validateEmail(data);
        if (Object.keys(errors).length > 0) {
            setData({ ...data, errors: errors });
            // setPassed(false);
            return;
        }
        getCode();
    }

    return (
        <>
            {step === "new" &&
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
                            onClick={sendEmail}>
                            Далее
                        </button>
                    </div>
                </>
            }
            {step === "confirm" &&
                <CodeConfirmForm
                    setStep={setStep}
                    repeatRequest={getCode}
                    currentPhone={currentPhone}
                />
            }
        </>
    )
}

const PersonalAccountModal: React.FC<{
    show: boolean,
    onHide: () => void,
    type: string,
    currentPhone: string
}> = (props) => {
    const { type, onHide, currentPhone } = props;

    const [step, setStep] = useState("new");

    const getCode = () => {
        setStep("confirm");
    }

    const handleClose = () => {
        onHide();
        setStep("new");
    }

    useEffect(() => {
        setStep("new");
    }, [type]);

    return (
        <Modal {...props} centered>
            <div className={"modal-template personal-account_modal"}>
                <ModalTemplateContent>
                    {type === "phone" &&
                        <EditPhoneForm step={step} setStep={setStep} onHide={handleClose} getCode={getCode} />
                    }
                    {type === "email" &&
                        <EditEmailForm step={step} setStep={setStep} onHide={handleClose} getCode={getCode} currentPhone={currentPhone} />
                    }
                </ModalTemplateContent>
            </div>
        </Modal>
    );
}

export default PersonalAccountModal;