import { HeaderLogoImage } from "../../../../layout/Header";
import back from "../../../../../images/common/back-dark.svg";
import call from "../../../../../images/common/Phone-header-dark.svg";
import { useState } from "react";
import "../../PersonalAccountBalance/BalanceMobile.scss";
import Utils from "../../../../../utils/Utils";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import CardSelect from "../../../CardSelect/CardSelect";
import { MobileModal } from "../../../MobileModal/MobileModal";

export const cardsData = {
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
        },
        {
            name: "7",
            number: "**** 0044",
            favourite: false
        }
    ]
}

const WithdrawMobile: React.FC<{
    active: boolean,
    setActive: (e: { opened: boolean, type: string }) => void,
    setCallActive: (e: boolean) => void,
    balance: number
}> = (props) => {
    const { active, setActive, setCallActive, balance } = props;

    const [data, setData] = useState({
        card: {
            name: "",
            number: ""
        },
        amount: 0,
        errors: {}
    });
    const [confirmModalOpened, setConfirmModalOpened] = useState(false);

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
                            setActive({ opened: false, type: "withdraw" });
                            setCallActive(true);
                        }} />
                    </div>
                </div>
                <div className="balance-mobile_body">
                    <div className="call-content-text-header mb-px-8 font-size-24">
                        Вывести деньги
                    </div>
                    <p className="font-size-12 mb-px-32">
                        Выберите карту или счёт <br />
                        и введите необходимую сумму для вывода
                    </p>
                    {(balance !== undefined && balance >= 0) &&
                        <div>
                            <p className="font-size-12 font-weight-medium">
                                Доступный баланс: {Utils.formatNumber(balance)} ₽
                            </p>
                        </div>
                    }
                    <div>
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
                        <CardSelect cards={cardsData.cards} accounts={cardsData.accounts} placeholder="Выберите карту или счёт" onSelect={setValue} error={data.errors["card"]} />
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
            <MobileModal active={confirmModalOpened} setActive={setConfirmModalOpened} type="withdrawConfirm" />
        </>
    )
}

export default WithdrawMobile;