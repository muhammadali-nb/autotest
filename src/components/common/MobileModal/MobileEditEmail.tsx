import { useState } from "react";
import { MobileAuthCode } from "./MobileAuthForm";
import { useAuth } from "../../../hooks/useAuth";
import { ModalTemplateInput } from "../ModalFormTemplate";
import Utils from "../../../utils/Utils";
import { Link } from "react-router-dom";

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
            // setPassed(false);
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
    closeFunc: () => void
}> = (props) => {
    const { closeFunc } = props;

    const [step, setStep] = useState("email");
    const [data, setData] = useState({
        email: "",
        errors: {},
        confirm: true
    });
    const [timer, setTimer] = useState(0);
    const { phone } = useAuth();

    const sendEmail = () => {
        setStep("confirm");
    }

    const sendCode = async (code: string, setPassed: (arg0: boolean) => void, setError: (arg0: string) => void) => {

    }

    return (
        <>
            <h1>
                Изменить e-mail
            </h1>
            {step === "email" &&
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
    )
}

export default MobileEditEmail; 