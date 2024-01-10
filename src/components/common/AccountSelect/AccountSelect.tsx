import { useRef, useState, useEffect } from "react";
import { balanceProps } from "../PersonalAccount/PersonalAccountBalance/BalanceMobile";
import Utils from "../../../utils/Utils";
import yandex from "../../../images/personal-account/balance/yandex.png";
import inside from "../../../images/personal-account/balance/logo.svg";
import city from "../../../images/personal-account/balance/city.png";
import "../CardSelect/CardSelect.scss";

interface optionProps {
    name: string,
    icon: string,
    balance: number
}

const getIcon = (type: string) => {
    switch (type) {
        case "inside": return inside;
        case "yandex": return yandex;
        case "citymobil": return city;
        default: return;
    }
}

export const SelectOption: React.FC<{
    value: optionProps,
    onSelect: (arg0: { name: string, icon: string, balance: number }) => void
}> = (props) => {
    const { value, onSelect } = props;

    return (
        <li className="card-select_option account-option" onClick={() => onSelect({ name: value.name, icon: value.icon, balance: value.balance })}>
            <div className="card-select_name">
                <div className="card-select_star">
                    <img src={getIcon(value.icon)} alt={value.name} />
                </div>
                {value.name}
            </div>
            <div className="card-select_number">
                {Utils.formatNumber(value.balance)} ₽
            </div>
        </li>
    )
}

const AccountSelect: React.FC<{
    data: balanceProps,
    placeholder: string,
    onSelect: (value: { name: string, icon: string, balance: number }) => void,
    error: string,
    icon?: string
}> = (props) => {
    const { data, placeholder, onSelect, error, icon } = props;

    const [selected, setSelected] = useState<{
        name: string,
        icon: string,
        balance: number
    } | null>(null);
    const [active, setActive] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const setOption = (value: {
        name: string,
        icon: string,
        balance: number
    }): void => {
        if (value !== null) {
            setSelected(value);
            onSelect(value);
        }
    }

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof Node && !selectRef.current?.contains(e.target))
                setActive(false);
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <div className="card-select" ref={selectRef}>
            <div className={"card-select_head " + (error ? "error" : "")} onClick={() => setActive(prev => !prev)}>
                <span className={"card-select_value account-value " + (selected ? "selected" : "")}>
                    <>
                        {icon &&
                            <>
                                {icon === "income" ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clipPath="url(#clip0_9129_146722)">
                                            <path d="M11 16.4997L5.5 11.1338M11 16.4997L16.5 11.1338M11 16.4997L11 1.83301" stroke="#BABCBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M1.83398 20.167H20.1673" stroke="#BABCBF" strokeWidth="2" strokeLinecap="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_9129_146722">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                        <g clipPath="url(#clip0_9129_146725)">
                                            <path d="M11 1.83333L5.5 7.19919M11 1.83333L16.5 7.19919M11 1.83333L11 16.5" stroke="#BABCBF" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                            <path d="M1.83398 20.167H20.1673" stroke="#BABCBF" strokeWidth="2" strokeLinecap="round" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_9129_146725">
                                                <rect width="22" height="22" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                }
                            </>
                        }
                    </>
                    {error ?
                        <>{error}</>
                        :
                        <>
                            {selected ?
                                <>
                                    <span>
                                        <img src={getIcon(selected.icon)} alt="" />
                                    </span>
                                    <span>{selected.name}</span>
                                    <span>{Utils.formatNumber(selected.balance)}&nbsp;₽</span>
                                </>
                                :
                                <>{placeholder}</>
                            }
                        </>
                    }
                </span>
                <div className={"card-select_icon " + (active ? "active" : "")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M5.5 8.25L11 13.75L16.5 8.25" stroke="#BABCBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
            {
                active &&
                <div className="card-select_dropdown">
                    <ul className="card-select_list">
                        {data.accounts.map((item, index) =>
                        (item.icon !== "deposit" &&
                            <SelectOption key={index} value={item} onSelect={setOption} />
                        )
                        )}
                    </ul>
                </div>
            }
        </div >
    )
}

export default AccountSelect;
