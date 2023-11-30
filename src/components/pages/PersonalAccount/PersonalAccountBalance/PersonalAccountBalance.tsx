import { useEffect, useRef, useState } from "react";
import "./PersonalAccountBalance.scss";
import logo from "../../../../images/personal-account/balance/logo.svg";
import deposit from "../../../../images/personal-account/balance/deposit.svg";
import BalanceMobile from "../../../common/PersonalAccount/PersonalAccountBalance/BalanceMobile";
import Utils from "../../../../utils/Utils";
import PersonalAccountModal from "../PersonalAccountModal/PersonalAccountModal";
import { useAuth } from "../../../../hooks/useAuth";

export interface accountsProps {
    name: string,
    icon: string,
    balance: number
}

export interface balanceProps {
    total: number,
    accounts: accountsProps[]
}

const balanceData: balanceProps = {
    total: 9900,
    accounts: [
        {
            name: 'Внутренний',
            icon: logo,
            balance: 4000
        },
        {
            name: "Депозит",
            icon: deposit,
            balance: 7000
        }
    ]
};

export const BalanceItem: React.FC<accountsProps> = (props) => {
    const { name, icon, balance } = props;

    return (
        <li className={"personal-account_balance-item " + (name === "Депозит" ? "deposit " : " ") + (balance < 0 ? "negative" : "")}>
            <div className="personal-account_balance-icon">
                <img src={icon} alt={name} />
                {(name === "Депозит" && window.innerWidth > 767) &&
                    <div className="personal-account_balance-tooltip">
                        &laquo;Депозит&raquo;&nbsp;&mdash; это сумма, которая блокируется на&nbsp;кредитной карте и&nbsp;определяет пределы ответственности клиента за&nbsp;арендованный автомобиль.
                    </div>
                }
            </div>
            <div className="font-size-16">
                {name}
            </div>
            <div className="personal-account_balance-value font-size-16">
                {Utils.formatNumber(balance)} ₽
            </div>
        </li>
    )
}

const PersonalAccountBalance: React.FC = () => {
    const [active, setActive] = useState(false);
    const [withdrawOpened, setWithdrawOpened] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { phone } = useAuth();

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof Node && !dropdownRef.current?.contains(e.target))
                setActive(false);
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <div className="personal-account_balance" ref={dropdownRef}>
            <div className={"personal-account_balance-head " + (active ? "active " : " ") + (balanceData.total < 0 ? "negative" : "")} onClick={() => setActive(prev => !prev)}>
                Баланс: <span>{Utils.formatNumber(balanceData.total)} ₽</span>
                {window.innerWidth > 767 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M10.5572 13.5734C10.8018 13.8093 11.1982 13.8093 11.4428 13.5734L14.9403 10.1984C15.3348 9.8178 15.0554 9.16699 14.4976 9.16699H7.50241C6.94457 9.16699 6.66519 9.8178 7.05965 10.1984L10.5572 13.5734Z" fill="#222222" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                        <path d="M7.08398 12.75L11.334 8.5L7.08399 4.25" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                }
            </div>
            {window.innerWidth > 767 ?
                <>
                    <div className={"personal-account_balance-dropdown " + (active ? "active" : "")}>
                        <div className={"personal-account_balance-title " + (balanceData.total < 0 ? "negative" : "")}>
                            <div className="font-size-20">
                                Баланс
                            </div>
                            <div className="font-size-16">
                                {Utils.formatNumber(balanceData.total)} ₽
                            </div>
                        </div>
                        <ul className="personal-account_balance-list">
                            {balanceData.accounts && balanceData.accounts.map((item, index) =>
                                <BalanceItem name={item.name} icon={item.icon} balance={item.balance} key={index} />
                            )}
                        </ul>
                        {balanceData.total > 0 &&
                            <div className="personal-account_balance-action">
                                <button className="site-btn dark big" onClick={() => {
                                    setActive(false);
                                    setWithdrawOpened(true);
                                }}>
                                    Вывести
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
                                        <path d="M9.5 1.5L5 5.89024M9.5 1.5L14 5.89024M9.5 1.5L9.5 13.5" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 16.5H17" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                    <PersonalAccountModal type="withdraw" show={withdrawOpened} onHide={() => setWithdrawOpened(false)} currentPhone={phone} balance={balanceData.total} />
                </>
                :
                <BalanceMobile active={active} setActive={setActive} />
            }
        </div>
    )
}

export default PersonalAccountBalance;