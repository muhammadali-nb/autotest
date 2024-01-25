import { ModalTemplateInput } from "../../../ModalFormTemplate";
import { useAuth } from "../../../../../hooks/useAuth";
import Utils from "../../../../../utils/Utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReplenishConfirmPhone: React.FC<{
    closeFunc: () => void
}> = (props) => {
    const { closeFunc } = props;

    const { phone } = useAuth();

    const [passed, setPassed] = useState(false);
    const [code, setCode] = useState("      ");
    const [error, setError] = useState("");
    const [idPrefix] = useState(Utils.randomString());
    const { error_message } = useAuth();
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let id = "confirm" + idPrefix + "-0";
        let item = document.getElementById(id) as HTMLInputElement;
        item?.focus();
        item?.setSelectionRange(0, 1);
        setTimer(59);
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
            <h1>
                Пополнить СЧЁТ
            </h1>
            <div className={"call-content-text font-size-16"}>
                <span className={"text-default"}>Мы отправили вам код</span>
                <br />
                на номер {Utils.formatPhone(phone ?? "")}
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

            <div className={"d-flex justify-content-between mobile-modal_body-action mb-3"}>
                <button
                    className={"site-btn small " + (!passed ? "dark" : "")}
                // onClick={() => props.send(code, setPassed, setError)}
                >
                    Пополнить
                </button>
            </div>
            <p className="form-mobile-policy ">
                Нажимая на кнопку "Пополнить", вы соглашаетесь с{" "}
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
        </div>
    )
}

export default ReplenishConfirmPhone;