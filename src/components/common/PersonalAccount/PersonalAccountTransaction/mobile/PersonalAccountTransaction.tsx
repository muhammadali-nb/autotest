import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import balanceService from "../../../../../api-functions/balance/balance-service";
import { MobileModal } from "../../../MobileModal/MobileModal";
import Utils from "../../../../../utils/Utils";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import { HeaderLogoImage } from "../../../../layout/Header";
import AccountSelect from "../../../AccountSelect/AccountSelect";
import back from "../../../../../images/common/back-dark.svg";
import call from "../../../../../images/common/Phone-header-dark.svg";

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
    active: boolean,
    setActive: (e: { opened: boolean, type: string }) => void,
    setCallActive: (e: boolean) => void,
}> = (props) => {
    const { active, setActive, setCallActive } = props;

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
    const [confirmModalOpened, setConfirmModalOpened] = useState(false);

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
        // errors = Utils.validateWithdraw(payload, data);
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
        // errors = Utils.validateWithdraw(data, balance);
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

    const send = () => {
        // let errors = Utils.validateWithdraw(data, balance);
        // if (Object.keys(errors).length > 0) {
        //     setData({ ...data, errors: errors });
        //     return;
        // }
        setConfirmModalOpened(true);
    }

    return (
        <>
            <div className={`balance-mobile  ${active && "active"}`}>
                <div className="balance-mobile_head">
                    <div className="mobile-modal_header-top">
                        <img src={back} onClick={() => setActive({ opened: false, type: "" })} alt="" />
                        <HeaderLogoImage width={"100px"} height={"24px"} image="dark" />
                        <img src={call} alt="" onClick={() => setCallActive(true)} />
                    </div>
                </div>
                <div className="balance-mobile_body">
                    <div className="call-content-text-header mb-px-8 font-size-24">
                        Перевести деньги
                    </div>
                    <p className="font-size-12 mb-px-32">
                        Выберите счета и сумму перевода
                    </p>
                    <div>
                        <div>
                            <AccountSelect data={data && data.accounts} icon="outcome" error={payload.errors["from"]} placeholder="Выберите счёт" onSelect={setFromValue} />
                        </div>
                        <div className="mb-px-25">
                            <AccountSelect data={data && data.accounts} icon="income" error={payload.errors["to"]} placeholder="Выберите счёт" onSelect={setToValue} />
                        </div>
                        <div className="mb-px-25">
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
                    </div>
                    <div className="mt-auto">
                        <button
                            className={"site-btn big d-flex align-items-center justify-content-center"}
                            onClick={(e) => {
                                e.preventDefault();
                                send();
                            }}>
                            Далее
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                <path d="M7.16602 12.5L11.166 8.5L7.16602 4.5" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <MobileModal active={confirmModalOpened} setActive={setConfirmModalOpened} type="transactionConfirm" />
        </>
    )
}

export default PersonalAccountTransaction;