import { useEffect, useState } from "react";
import Utils from "../../../../../utils/Utils";
import { cardsData } from "../../PersonalAccountWithdraw/mobile/PersonalAccountWithdraw";
import { MobileModal } from "../../../MobileModal/MobileModal";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import CardSelect from "../../../CardSelect/CardSelect";
import { HeaderLogoImage } from "../../../../layout/Header";
import back from "../../../../../images/common/back-dark.svg";
import call from "../../../../../images/common/Phone-header-dark.svg";
import sbp from "../../../../../images/personal-account/transactions/sbp.png";
import AccountSelect from "../../../AccountSelect/AccountSelect";
import { useQuery } from "@tanstack/react-query";
import balanceService from "../../../../../api-functions/balance/balance-service";

const ReplenishMobile: React.FC<{
    active: boolean,
    setActive: (e: { opened: boolean, type: string }) => void,
    setCallActive: (e: boolean) => void,
}> = (props) => {
    const { active, setActive, setCallActive } = props;

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
    const [confirmModalOpened, setConfirmModalOpened] = useState(false);

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
                        <img src={call} alt="" onClick={() => {
                            setActive({ opened: false, type: "replenish" });
                            setCallActive(true);
                        }} />
                    </div>
                </div>
                <div className="balance-mobile_body">
                    <div className="call-content-text-header mb-px-8 font-size-24">
                        Пополнить СЧЁТ
                    </div>
                    <p className="font-size-12 mb-px-32">
                        Выберите способ оплаты и&nbsp;счёт,<br />
                        и&nbsp;введите необходимую сумму для пополнения
                    </p>
                    <div>
                        <div className="mb-px-25">
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
                            <div className="mb-px-12">
                                <CardSelect cards={cardsData.cards} accounts={cardsData.accounts} onSelect={setFromValue} error={payload.errors["from"]} placeholder="Выбрать другую карту или счёт" />
                            </div>
                        }
                        <div className="mb-px-12">
                            <AccountSelect data={data && data.accounts} error={payload.errors["to"]} placeholder="Выберите счёт" onSelect={setToValue} />
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
                        {(payload.sum > 0 && payload.sum) &&
                            <span className="font-size-12 font-weight-semibold">
                                К оплате: {Utils.formatNumber(payload.sum)} ₽
                            </span>
                        }
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
            <MobileModal active={confirmModalOpened} setActive={setConfirmModalOpened} type="replenishConfirm" />
        </>
    )
}

export default ReplenishMobile;