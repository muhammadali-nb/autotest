import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import CardSelect from "../../../CardSelect/CardSelect";
import { CodeConfirmForm } from "../../../../pages/PersonalAccount/PersonalAccountModal/PersonalAccountModal";
import Utils from "../../../../../utils/Utils";

interface cardProps {
    name: string,
    number: string,
    favourite: boolean
}

interface cardsDataProps {
    cards: cardProps[],
    accounts: cardProps[]
}

const cardsData: cardsDataProps = {
    cards: [
        {
            name: "1",
            number: "**** 0044",
            favourite: true
        },
        {
            name: "2",
            number: "**** 0044",
            favourite: false
        },
        {
            name: "3",
            number: "**** 0044",
            favourite: false
        }
    ],
    accounts: [
        {
            name: "4",
            number: "**** 0044",
            favourite: true
        },
        {
            name: "5",
            number: "**** 0044",
            favourite: false
        },
        {
            name: "6",
            number: "**** 0044",
            favourite: false
        }
    ]
}

const WithdrawDesktop: React.FC<{
    onHide: () => void,
    getCode: () => void,
    step: string,
    setStep: (arg0: string) => void,
    currentPhone: string,
    balance?: number
}> = (props) => {
    const { onHide, getCode, step, setStep, currentPhone, balance } = props;

    const [data, setData] = useState({
        card: {
            name: "",
            number: ""
        },
        amount: 0,
        errors: {}
    });

    const validateData = (field: string, value: string) => {
        let errors = data.errors;
        delete errors[field];
        let newData = { ...data, [field]: value, errors: errors };
        setData(newData);
        errors = Utils.validateWithdraw(data, balance);
    }

    const setValue = (value: { name: string, number: string }) => {
        let errors = data.errors;
        delete errors["card"];
        let newData = {
            ...data, card: {
                name: value.name,
                number: value.number
            }, errors: errors
        };
        setData(newData);
        errors = Utils.validateWithdraw(data, balance);
    }

    const send = () => {
        let errors = Utils.validateWithdraw(data, balance);
        if (Object.keys(errors).length > 0) {
            setData({ ...data, errors: errors });
            return;
        }
        getCode();
    }

    return (
        <>
            {step === "new" &&
                <>
                    <div className={"mb-px-80"}>
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
                                "call-content-text-header font-size-40 mb-px-10 line-height-130 font-weight-semibold"
                            }>
                            Вывести деньги
                        </div>
                        <div className={"call-content-text font-size-16 fw-medium"}>
                            Выберите карту или счёт и введите необходимую <br /> сумму для вывода
                        </div>
                    </div>
                    <div className="mb-px-20">
                        <CardSelect cards={cardsData.cards} accounts={cardsData.accounts} placeholder="Выберите карту или счёт" onSelect={setValue} error={data.errors["card"]} />
                        <ModalTemplateInput
                            error={data.errors["amount"]}
                            type={"number"}
                            small={false}
                            placeholder="Введите сумму"
                            onChange={(e: any) => validateData("amount", e.target.value)}
                        />
                        {data.errors["server"] && (
                            <div className={"my-2 text-red-color font-size-12"}>
                                {data.errors["server"]}
                            </div>
                        )}
                    </div>
                    {balance &&
                        <div>
                            <p className="font-size-16 font-weight-semibold">
                                Доступный баланс: {Utils.formatNumber(balance)} ₽
                            </p>
                        </div>
                    }
                    <div className="mt-auto">
                        <button
                            className={"site-btn small dark"}
                            onClick={(e) => {
                                e.preventDefault();
                                send();
                            }}>
                            Далее
                        </button>
                    </div>
                </>
            }
            {step === "confirm" &&
                <CodeConfirmForm
                    step={step}
                    setStep={setStep}
                    repeatRequest={getCode}
                    newPhone={''}
                    currentPhone={Utils.formatPhone(currentPhone)}
                    type={"withdraw"}
                    onHide={onHide}
                />
            }
        </>
    )
}

export default WithdrawDesktop;