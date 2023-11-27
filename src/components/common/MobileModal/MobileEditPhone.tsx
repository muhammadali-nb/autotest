import React, { useState } from "react";
import { ConfirmPhone } from "../../../Api";
import { ModalTemplatePhone } from "../ModalFormTemplate";
import Utils from "../../../utils/Utils";
import { MobileAuthCode } from "./MobileAuthForm";
import { Link } from "react-router-dom";

const NewPhone: React.FC<{
    data: ConfirmPhone,
    setData: (arg0: ConfirmPhone) => void,
    submit: () => void
}> = (props) => {
    const { data, setData, submit } = props;

    const [passed, setPassed] = useState(false);

    const update = (field: string, value: any) => {
        let errors = data.errors;
        delete errors[field];
        let newData = { ...data, [field]: value, errors: errors };
        setData(newData);
        errors = Utils.validateConfirmPhone(newData);
        setPassed(Object.keys(errors).length === 0);
        Utils.validatePhone(props.data.phone);
    };

    const phoneSend = () => {
        let errors = Utils.validateConfirmPhone(props.data);
        if (Object.keys(errors).length > 0) {
            props.setData({ ...props.data, errors: errors });
            setPassed(false);
            return;
        }
        submit();
    }

    return (
        <div className="mobile-modal_body-auth">
            <div className={"call-content-text font-size-16"}>
                Введите ваш новый номер телефона
            </div>
            <div>
                <ModalTemplatePhone
                    error={data.errors["phone"]}
                    onInput={(e: any) => update("phone", e.target.value)}
                    onChange={(e: any) => update("phone", e.target.value)}
                    small={false}
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
                    onClick={() => phoneSend()}>
                    Далее
                </button>
            </div>
        </div>
    )
}

const MobileEditPhone: React.FC<{
    closeFunc: () => void
}> = (props) => {
    const { closeFunc } = props;

    const [step, setStep] = useState('phone');
    const [data, setData] = useState<ConfirmPhone>({
        phone: "",
        confirm: true,
        errors: {}
    });
    const [timer, setTimer] = useState(0);

    const sendPhone = () => {
        setStep("confirm");
    }

    const sendCode = async (code: string, setPassed: (arg0: boolean) => void, setError: (arg0: string) => void) => {

    }

    return (
        <>
            <h1>
                Изменить телефон
            </h1>
            {step === "phone" &&
                <NewPhone data={data} setData={setData} submit={sendPhone} />
            }
            {step === "confirm" &&
                <MobileAuthCode
                    data={data}
                    setStep={setStep}
                    timer={timer}
                    repeatRequest={sendPhone}
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

export default MobileEditPhone;