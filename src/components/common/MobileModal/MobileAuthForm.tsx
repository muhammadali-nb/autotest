import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ConfirmPhone, ErrorResponse } from "../../../Api";
import Utils from "../../../utils/Utils";
import { useAuth } from "../../../hooks/useAuth";
import { ModalTemplatePhone, ModalTemplateConfirm, ModalTemplateInput, ModalTemplateContent } from "../ModalFormTemplate";
import FileInput from "../FileInput";
import { RentCreateAccountForm } from "../../../types/RentTypes";
import { Link } from "react-router-dom";

const MobileAuthPhone: React.FC<{
    data: ConfirmPhone,
    setData: (atg0: ConfirmPhone) => void,
    submit: () => void
}> = (props) => {
    const [passed, setPassed] = useState(false);

    const phoneSend = () => {
        let errors = Utils.validateConfirmPhone(props.data);
        if (Object.keys(errors).length > 0) {
            props.setData({ ...props.data, errors: errors });
            setPassed(false);
            return;
        }
        props.submit();
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
        <div className="mobile-modal_body-auth">
            <p>
                Войдите в личный кабинет, чтобы бронировать
                и арендовать автомобили стало быстрее и удобнее
            </p>
            <div>
                <ModalTemplatePhone
                    error={props.data.errors["phone"]}
                    onInput={(e: any) => update("phone", e.target.value)}
                    onChange={(e: any) => update("phone", e.target.value)}
                    small={false}
                />
                {props.data.errors["server"] && (
                    <div className={"my-2 text-red-color font-size-12"}>
                        {props.data.errors["server"]}
                    </div>
                )}
            </div>
            <div className="mobile-modal_body-action mb-3">
                <button
                    className={"site-btn small " + (!passed ? "dark" : "")}
                    onClick={() => phoneSend()}>
                    Отправить код
                </button>
            </div>
        </div>
    )
}

export const MobileAuthCode: React.FC<{
    data: ConfirmPhone,
    setStep: (arg0: string) => void,
    timer: number,
    repeatRequest: () => void,
    closeFunc: () => void,
    send: (code: string, setPassed: (arg0: boolean) => void, setError: (arg0: string) => void) => Promise<void>,
    type?: string,
}> = (props) => {
    const [passed, setPassed] = useState(false);
    const [code, setCode] = useState("      ");
    const [error, setError] = useState("");
    const [idPrefix] = useState(Utils.randomString());
    const { error_message } = useAuth();
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
        <div className="mobile-modal_body-auth">
            <div className={"call-content-text font-size-16"}>
                <span className={"text-default"}>Мы отправили вам код</span>
                <br />
                на номер {props.data.phone}
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

            <div className={"d-flex justify-content-between mobile-modal_body-action mb-3"}>
                <button
                    className={"site-btn small " + (!passed ? "dark" : "")}
                    onClick={(e) => {
                        e.preventDefault();
                        props.send(code, setPassed, setError);
                    }}>
                    Подтвердить код
                </button>
                {(!props.type || props.type !== "old") &&
                    <button
                        className={
                            "default-link text-uppercase text-decoration-none default-transition text-gray-color text-hover-default font-size-12 "
                        }
                        onClick={() => {
                            if (props.type) {
                                props.setStep("new");
                            } else {
                                props.setStep("auth");
                            }
                        }}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                        &nbsp;&nbsp;&nbsp;{props.type && props.type === "email" ? <>Изменить почту</> : <>Изменить номер</>}
                    </button>
                }

            </div>
        </div>
    )
}

const MobileAuthAccount: React.FC<{
    closeFunc: () => void;
    setStep: (arg0: string) => void;
}> = (props) => {
    const [base64, setBase64] = useState("");
    const [data, setData] = useState<RentCreateAccountForm>({
        name: "",
        lastName: "",
        middleName: "",
        image: "",
        errors: {},
    });
    const [passed, setPassed] = useState(false);

    const createAccount = async () => {
        let errors = Utils.validateRentCreateAccont(data);

        if (Object.keys(errors).length > 0) {
            console.log(errors);
            setData({ ...data, errors: errors });
            setPassed(false);
            return;
        }

        if (data) {
            try {
                const res = await fetch(
                    "https://taxivoshod.ru/api/voshod-auto/?w=update-profile",
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            w: "update-profile",
                            first_name: data.name,
                            last_name: data.lastName,
                            middle_name: data.middleName,
                            license_photo: base64,
                        }),
                    }
                );
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const payload = await res.json();
                if (payload.result === 1) {
                    console.log(payload);
                    window.location.reload();
                    // props.closeFunc();
                    props.setStep('auth');
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const updateForm = (field: string, value: any) => {
        let errors = data.errors;
        delete errors[field];
        let newData = { ...data, [field]: value, errors: errors };
        setData(newData);
        errors = Utils.validateRentCreateAccont(newData);
        setPassed(Object.keys(errors).length === 0);
    };

    return (
        <div className="mobile-modal_body-auth">
            <p>
                Войдите в личный кабинет, чтобы бронировать
                и арендовать автомобили стало быстрее и удобнее
            </p>
            <div className="mb-4">
                <ModalTemplateInput
                    placeholder="Фамилия"
                    value={data.lastName}
                    error={data.errors?.lastName}
                    small={false}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    onInput={(e) => updateForm("lastName", e.target.value)}
                />
                <ModalTemplateInput
                    placeholder="Имя"
                    value={data.name}
                    error={data.errors?.name}
                    small={false}
                    onChange={(e) => updateForm("name", e.target.value)}
                    onInput={(e) => updateForm("name", e.target.value)}
                />
                <ModalTemplateInput
                    placeholder="Отчество"
                    value={data.middleName}
                    error={data.errors?.middleName}
                    small={false}
                    onChange={(e) => updateForm("middleName", e.target.value)}
                    onInput={(e) => updateForm("middleName", e.target.value)}
                />
                <FileInput upload={setBase64} />
            </div>
            <button
                className={"site-btn small mobile-modal_body-action mb-3 " + (!passed ? "dark" : "")}
                onClick={() => createAccount()}>
                Готово
            </button>
        </div>
    )
}

const MobileAuthForm: React.FC<{
    closeFunc: () => void
}> = (props) => {
    const [step, setStep] = useState('auth');
    const [data, setData] = useState<ConfirmPhone>({
        phone: "",
        confirm: true,
        errors: {}
    });
    const [error_message, setErrorMessage] = useState<string | null>(null);
    const [timer, setTimer] = useState(0);

    const { user_status, register } = useAuth();

    const phoneConfirm = () => {
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
                    setStep("phoneConfirm");
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
    }

    const sendCode = async (code: string, setPassed: (arg0: boolean) => void, setError: (arg0: string) => void) => {
        if (code.replace(/\D+/g, "").length < 5) {
            setPassed(false);
            setError("Укажите код подтверждения!");
            return;
        }
        setError("");

        try {
            const res: any = await register(data.phone, code);
            if (res.success) {
                if (!res.has_profile) {
                    setStep("createAccount");
                } else {
                    props.closeFunc();
                    setStep('auth');
                }
                // props.setStep("createAccount");
                setPassed(true);
            }
        } catch (error) {
            console.log(error);
            setPassed(false);
        }
    };

    return (
        <>
            <h1>
                Вход <br />
                <span className="font-size-16">в личный кабинет</span>
            </h1>
            {step === 'auth' &&
                <MobileAuthPhone
                    data={data}
                    setData={setData}
                    submit={phoneConfirm}
                />
            }
            {step === 'phoneConfirm' &&
                <MobileAuthCode
                    data={data}
                    setStep={setStep}
                    timer={timer}
                    repeatRequest={phoneConfirm}
                    closeFunc={props.closeFunc}
                    send={sendCode}
                />
            }
            {step === 'createAccount' &&
                <MobileAuthAccount
                    closeFunc={props.closeFunc}
                    setStep={setStep}
                />
            }
            <p className="form-mobile-policy ">
                Нажимая на кнопку, вы соглашаетесь с{" "}
                <Link
                    to={"/policy"}
                    target={"_blank"}
                    className={
                        "default-link dark underlined form-mobile-policy-link "
                    }>
                    Условиями обработки персональных данных
                </Link>
            </p>
            <div className=" personal-account_footer mobile-modal_body-company ">
                ООО ВОСХОДⓒ 2023 год
            </div>
        </>
    );
}

export default MobileAuthForm;