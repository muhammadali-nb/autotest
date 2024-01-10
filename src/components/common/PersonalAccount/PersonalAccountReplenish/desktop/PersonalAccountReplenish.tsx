import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Utils from "../../../../../utils/Utils";
import { CodeConfirmForm } from "../../../../pages/PersonalAccount/PersonalAccountModal/PersonalAccountModal";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import balanceService from "../../../../../api-functions/balance/balance-service";
import sbp from "../../../../../images/personal-account/transactions/sbp.png";
import { cardsData } from "../../PersonalAccountWithdraw/mobile/PersonalAccountWithdraw";
import CardSelect from "../../../CardSelect/CardSelect";
import AccountSelect from "../../../AccountSelect/AccountSelect";

const PersonalAccountReplenish: React.FC<{
    onHide: () => void,
    getCode: (item: string, setError: (err: string) => void) => void,
    step: string,
    setStep: (arg0: string) => void,
    currentPhone: string,
}> = (props) => {
    const { onHide, getCode, step, setStep, currentPhone } = props;

    const [payload, setPayload] = useState({
        sum: 0,
        type: "sbp",
        from: {
            name: cardsData.cards[0].name,
            number: cardsData.cards[0].number
        },
        to: {
            name: "",
            icon: "",
            balance: 0
        },
        errors: {}
    });

    const { data, isLoading } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => balanceService.getBalance()
    });

    const setFromValue = (value: { name: string, number: string }) => {
        let errors = payload.errors;
        delete errors["from"];
        let newData = {
            ...payload, from: {
                name: value.name,
                number: value.number
            }, errors: errors
        };
        setPayload(newData);
        // errors = Utils.validateWithdraw(payload, data);
    }

    const setToValue = (value: { name: string, icon: string, balance: number }) => {
        let newData = {
            ...payload, to: {
                name: value.name,
                icon: value.icon,
                balance: value.balance
            }
        };
        setPayload(newData);
    }

    const validateData = (field: string, value: string) => {
        let errors = payload.errors;
        delete errors[field];
        delete errors["server"];
        let newData = { ...payload, [field]: value, errors: errors };
        setPayload(newData);
        // errors = Utils.validateWithdraw(data, balance);
    }

    const setPaymentType = (type: string) => {
        let errors = payload.errors;
        delete errors["server"];
        setPayload(prev => ({ ...prev, type: type }));
        if (type === "card") {
            setPayload(prev => ({ ...prev, from: cardsData.cards[0], errors: errors }));
        }
        // else {
        //     setPayload(prev => ({
        //         ...prev, from: {
        //             name: "",
        //             number: ""
        //         }
        //     }));
        // }
    }

    const setServerError = (error: string) => {
        let errors = payload.errors;
        delete errors["server"];

        setPayload(prev => ({
            ...prev,
            errors: {
                ...errors,
                server: error
            }
        }));
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
                    <div className="mb-px-40">
                        <div
                            className={
                                "call-content-text-header font-size-40 mb-px-10 line-height-130 font-weight-semibold"
                            }>
                            Пополнить счёт
                        </div>
                        <div className={"call-content-text font-size-16 fw-medium"}>
                            Выберите способ оплаты и&nbsp;счёт,<br />
                            и&nbsp;введите необходимую сумму для пополнения
                        </div>
                    </div>
                    <div className="mb-px-20">
                        <div className="replenish_types">
                            <div className={"replenish_type " + (payload.type === "sbp" ? "active" : "")} onClick={() => setPaymentType("sbp")}>
                                <img src={sbp} alt="СБП" />
                                <span className="font-size-12">
                                    Коммисия: <span>
                                        1%
                                    </span>
                                </span>
                            </div>
                            <div className={"replenish_type " + (payload.type === "card" ? "active" : "")} onClick={() => setPaymentType("card")}>
                                <div className="font-size-14 font-weight-semibold">
                                    {payload.from.name}
                                </div>
                                <div className="font-size-12">
                                    {payload.from.number}
                                </div>
                                <span className="font-size-12">
                                    Коммисия: <span>
                                        3%
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    {payload.type === "card" &&
                        <div>
                            <CardSelect cards={cardsData.cards} accounts={cardsData.accounts} onSelect={setFromValue} error={payload.errors["from"]} placeholder="Выбрать другую карту или счёт" />
                        </div>
                    }
                    <div>
                        <AccountSelect data={data} error={payload.errors["to"]} placeholder="Выберите счёт" onSelect={setToValue} />
                    </div>
                    <div className="mb-px-100">
                        <ModalTemplateInput
                            error={payload.errors["sum"]}
                            type={"number"}
                            small={false}
                            placeholder="Введите сумму"
                            onChange={(e: any) => validateData("sum", e.target.value)}
                        />
                        {payload.errors["server"] && (
                            <div className={"my-2 text-red-color font-size-12"}>
                                {payload.errors["server"]}
                            </div>
                        )}
                    </div>
                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <button
                            className={"site-btn small dark"}
                            onClick={(e) => {
                                e.preventDefault();
                                getCode(`${payload.from.number}-${payload.to.name}-${payload.sum}`, setServerError);
                            }}>
                            Далее
                        </button>
                        {(payload.sum > 0 && payload.sum) &&
                            <span className="font-size-16 font-weight-semibold">
                                К оплате: {Utils.formatNumber(payload.sum)} ₽
                            </span>
                        }
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
                    type={"replenish"}
                    onHide={onHide}
                />
            }
        </>
    )
}

export default PersonalAccountReplenish;