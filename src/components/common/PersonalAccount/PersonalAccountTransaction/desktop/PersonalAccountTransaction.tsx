import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import balanceService from "../../../../../api-functions/balance/balance-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import AccountSelect from "../../../AccountSelect/AccountSelect";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import { CodeConfirmForm } from "../../../../pages/PersonalAccount/PersonalAccountModal/PersonalAccountModal";
import Utils from "../../../../../utils/Utils";
import { balanceProps } from "../../PersonalAccountBalance/BalanceMobile";

type accountProps = {
    name: string,
    icon: string,
    balance: number,
    deposit: boolean
};

type omittedProps = Omit<accountProps, "deposit">;

type payloadProps = {
    sum: number,
    from: omittedProps,
    to: omittedProps,
    errors: {}
}

const PersonalAccountTransaction: React.FC<{
    onHide: () => void,
    getCode: (item: string, setError: (err: string) => void) => void,
    step: string,
    setStep: (arg0: string) => void,
    currentPhone: string,
}> = (props) => {
    const { onHide, getCode, step, setStep, currentPhone } = props;

    const [payload, setPayload] = useState<payloadProps>({
        sum: 0,
        from: {
            name: "",
            icon: "",
            balance: 0
        },
        to: {
            name: "",
            icon: "",
            balance: 0
        },
        errors: {}
    });

    const { data } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => balanceService.getBalance()
    });
    
    const setFromValue = (value: omittedProps) => {
        let errors = payload.errors;
        delete errors["from"];
        let newData = {
            ...payload, from: {
                name: value.name,
                icon: value.icon,
                balance: value.balance
            }, errors: errors
        };
        setPayload(newData);
    }

    const setToValue = (value: omittedProps) => {
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

    // const getCustomData = (type: string): accountProps[] => {
    //     if (!data) return [];
    //     return data.accounts.filter(item => item.name !== payload[type].name);
    // }

    const send = () => {
        let errors = Utils.validateTransaction(payload);
        if (Object.keys(errors).length > 0) {
            setPayload({ ...payload, errors: errors });
            return;
        }
        getCode(`${payload.from.name}-${payload.to.name}-${payload.sum}`, setServerError);
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
                    <div className="mb-px-40">
                        <div
                            className={
                                "call-content-text-header font-size-40 mb-px-10 line-height-130 font-weight-semibold"
                            }>
                            Перевести деньги
                        </div>
                        <div className={"call-content-text font-size-16 fw-medium"}>
                            Выберите счета и сумму перевода
                        </div>
                    </div>
                    <div>
                        <AccountSelect data={data && data.accounts} icon="outcome" error={payload.errors["from"]} placeholder="Выберите счёт" onSelect={setFromValue} />
                    </div>
                    <div>
                        <AccountSelect data={data && data.accounts} icon="income" error={payload.errors["to"]} placeholder="Выберите счёт" onSelect={setToValue} />
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
                    type={"transaction"}
                    onHide={onHide}
                />
            }
        </>
    )
}

export default PersonalAccountTransaction;