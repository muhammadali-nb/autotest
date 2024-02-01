import { useEffect, useState } from "react";
import { MobileAuthCode } from "./MobileAuthForm";
import { useAuth } from "../../../hooks/useAuth";
import { ModalTemplateInput } from "../ModalFormTemplate";
import Utils from "../../../utils/Utils";
import { Link } from "react-router-dom";
import axios from "axios";

interface EditEmailProps {
    email: string,
    errors: object,
    confirm: boolean
}

const NewEmail: React.FC<{
    data: EditEmailProps,
    setData: (arg0: EditEmailProps) => void,
    submit: () => void
}> = (props) => {
    const { data, setData, submit } = props;
    const [passed, setPassed] = useState(false);

    const send = () => {
        let errors = Utils.validateEmail(data);
        if (Object.keys(errors).length > 0) {
            setData({ ...data, errors: errors });
            setPassed(false);
            return;
        }
        submit();
    }

    const validateEmail = (field: string, value: string) => {
        let errors = data.errors;
        delete errors[field];
        let newData = { ...data, [field]: value, errors: errors };
        setData(newData);
        errors = Utils.validateEmail(data);
        setPassed(Object.keys(errors).length === 0);
    }

    return (
        <div className="mobile-modal_body-auth">
            <div className={"call-content-text font-size-16"}>
                Введите ваш новый e-mail
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
            <div className="mobile-modal_body-action mb-3">
                <button
                    className={"site-btn small " + (!passed ? "dark" : "")}
                    onClick={(e) => {
                        e.preventDefault();
                        send();
                    }}>
                    Далее
                </button>
            </div>
        </div>
    )
}

const MobileEditEmail: React.FC<{
    closeFunc: () => void,
    isActive: boolean
}> = (props) => {
    const { closeFunc, isActive } = props;

    const [step, setStep] = useState("new");
    const [data, setData] = useState({
        email: "",
        errors: {},
        confirm: true
    });
    const [timer, setTimer] = useState(60);
    const { phone } = useAuth();

    const setServerError = (err: string) => {
        let errors = data.errors;

        errors['server'] = err;

        let newData = { ...data, errors: errors };
        setData(newData);
    }

    const sendEmail = () => {
        axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=change-email&email=${data.email}`, { withCredentials: true })
            .then(res => {
                // console.log(res.data)
                // setStep("confirm");
                setStep("success");
            })
            .catch((e) => {
                console.log(e);
                if (e.response.data.message) {
                    setServerError(e.response.data.message);
                }
            });
    }

    const sendCode = async (code: string, setPassed: (arg0: boolean) => void, setError: (arg0: string) => void) => {
        const email = step === "confirm" ? data.email : '';

        axios.get(`https://taxivoshod.ru/api/voshod-auto/?w=change-email&change-${step === "old" ? 'old' : 'new'}-email=1&code=${code}&phone=${email}`, { withCredentials: true })
            .then(res => {
                if (res.data.result === 1) {
                    setPassed(true);
                    if (step === "old") {
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
                    setError(e.response.data.message)
                }
            });
    }

    const oldConfirmationCode = () => {
        axios.get('https://taxivoshod.ru/api/voshod-auto/?w=change-email&change-old-email=1', { withCredentials: true })
            .then(res => {
                if (res.data.reason) {
                    setStep("new");
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        if (step === "old" && isActive) {
            oldConfirmationCode();
        }
        if (!isActive) {
            setStep("new");
        }
    }, [isActive]);

    return (
        <>
            <h1>
                {step === "success" ?
                    <>
                        Ваша почта <br />
                        успешно изменена!
                    </>
                    :
                    <>Изменить e-mail</>
                }
            </h1>
            {step === "old" &&
                <MobileAuthCode
                    data={{
                        phone: phone ? Utils.formatPhone(phone) : "",
                        confirm: true,
                        errors: {}
                    }}
                    setStep={setStep}
                    timer={timer}
                    repeatRequest={oldConfirmationCode}
                    send={sendCode}
                    closeFunc={closeFunc}
                    type={"old"}
                />
            }
            {step === "new" &&
                <NewEmail data={data} setData={setData} submit={sendEmail} />
            }
            {step === "confirm" &&
                <MobileAuthCode
                    data={{
                        phone: phone ? Utils.formatPhone(phone) : "",
                        confirm: true,
                        errors: {}
                    }}
                    setStep={setStep}
                    timer={timer}
                    repeatRequest={sendEmail}
                    send={sendCode}
                    closeFunc={closeFunc}
                    type={"email"}
                />
            }
            {step === "success" &&
                <div className="mobile-modal_body-action mb-3">
                    <button
                        className={"site-btn small"}
                        onClick={(e) => {
                            e.preventDefault();
                            closeFunc();
                        }}>
                        Закрыть
                    </button>
                </div>
            }
            <p className="form-mobile-policy ">
                Нажимая на кнопку, вы соглашаетесь <br /> с{" "}
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
    )
}

export default MobileEditEmail; 