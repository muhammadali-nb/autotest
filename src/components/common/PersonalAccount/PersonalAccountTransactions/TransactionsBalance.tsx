import { balanceProps } from "../PersonalAccountBalance/BalanceMobile";
import logo from "../../../../images/personal-account/balance/logo.svg";
import depositIcon from "../../../../images/personal-account/balance/deposit.svg";
import yandexIcon from "../../../../images/personal-account/balance/yandex.png";
import cityIcon from "../../../../images/personal-account/balance/city.png";
import income from "../../../../images/personal-account/transactions/income.svg";
import outcome from "../../../../images/personal-account/transactions/outcome.svg";
import transaction from "../../../../images/personal-account/transactions/transaction.svg";
import "./PersonalAccountTransactions.scss";
import Utils from "../../../../utils/Utils";
import { useEffect, useState } from "react";
import { carsProps, deductionsProps } from "../../../pages/Transactions/TransactionsPage";

// const balanceData: balanceProps = {
//     total: 9900,
//     accounts: [
//         {
//             name: 'Внутренний',
//             icon: logo,
//             balance: 4000
//         },
//         {
//             name: "Депозит",
//             icon: deposit,
//             balance: 7000
//         }
//     ]
// };

const MobileFilter: React.FC<{
    title: string,
    children: React.ReactNode
}> = (props) => {
    const { title, children } = props;

    const [active, setActive] = useState(true);

    return (
        <div className="personal-account_transactions-balance">
            <div className={"personal-account_transactions-title font-size-20 font-weight-semibold " + (!active ? "hidden" : "")} onClick={() => setActive(prev => !prev)}>
                {title}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 10L8 6L12 10" stroke="#222222" stroke-width="1.5" stroke-linecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {active &&
                <ul className="personal-account_transactions-balanceList">
                    {children}
                </ul>
            }
        </div>
    )
}

const TransactionsBalance: React.FC<{
    totalIncome: number,
    totalOutcome: number,
    totalTransactions: number,
    filters: {
        balance: string[],
        operation: string[],
        car: string[],
        deduction: string[]
    }
    updateFilters: (field: string, value: string) => void,
    balance: balanceProps,
    cars: carsProps[],
    deductions: deductionsProps[]
}> = (props) => {
    const { totalIncome, totalOutcome, totalTransactions, filters, updateFilters, balance, cars, deductions } = props;

    const [size, setSize] = useState("desk");
    const [mobFilterOpened, setMobFilterOpened] = useState(false);

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth > 767) {
                setSize("desk");
            } else {
                setSize("mobile");
            }
        }
        window.addEventListener('resize', checkSize);

        checkSize();

        return () => {
            window.removeEventListener('resize', checkSize);
        }
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case "deposit": return depositIcon;
            case "inside": return logo;
            case "yandex": return yandexIcon;
            case "citymobil": return cityIcon;
            default: return;
        }
    }

    return (
        <>
            <div className="personal-account_transactions-balance">
                <div className="personal-account_transactions-title font-size-20 font-weight-semibold">
                    Баланс
                    <span>
                        {Utils.formatNumber(balance.total)} ₽
                    </span>
                </div>
                <ul className="personal-account_transactions-balanceList">
                    {balance.accounts.map((item, index) =>
                        <li
                            key={item.name}
                            className={"personal-account_transactions-balanceItem " + (item.name === "Депозит" ? "deposit " : " ") + (filters['balance'].find(filter => filter === item.name) ? "active" : "")}
                            onClick={() => updateFilters('balance', item.name)}
                        >
                            <img src={getIcon(item.icon)} alt={item.icon} />
                            <span>
                                {item.name}
                            </span>
                            <span>
                                {Utils.formatNumber(item.balance)} ₽
                            </span>
                        </li>
                    )}
                </ul>
            </div>
            {size === "desk" ?
                <>
                    <div className="personal-account_transactions-balance">
                        <div className="personal-account_transactions-title font-size-20 font-weight-semibold">
                            Категории
                        </div>
                        <ul className="personal-account_transactions-balanceList">
                            <li className={"personal-account_transactions-balanceItem " + (filters['operation'].find(filter => filter === "Приход") ? "active" : "")} onClick={() => updateFilters('operation', 'Приход')}>
                                <img src={income} alt="Приход" />
                                <span>
                                    Приход
                                </span>
                                <span>
                                    {Utils.formatNumber(totalIncome)} ₽
                                </span>
                            </li>
                            <li className={"personal-account_transactions-balanceItem " + (filters['operation'].find(filter => filter === "Расход") ? "active" : "")} onClick={() => updateFilters('operation', 'Расход')}>
                                <img src={outcome} alt="Расход" />
                                <span>
                                    Расход
                                </span>
                                <span>
                                    {Utils.formatNumber(totalOutcome)} ₽
                                </span>
                            </li>
                            <li className={"personal-account_transactions-balanceItem " + (filters['operation'].find(filter => filter === "Перевод") ? "active" : "")} onClick={() => updateFilters('operation', 'Перевод')}>
                                <img src={transaction} alt="Перевод" />
                                <span>
                                    Перевод
                                </span>
                                <span>
                                    {Utils.formatNumber(totalTransactions)} ₽
                                </span>
                            </li>
                        </ul>
                    </div>
                    {cars.length &&
                        <div className="personal-account_transactions-balance">
                            <div className="personal-account_transactions-title font-size-20 font-weight-semibold">
                                Автомобили
                            </div>
                            <ul className="personal-account_transactions-balanceList">
                                {cars.map(car =>
                                    <li key={car.id} className={"personal-account_transactions-balanceItem additional " + (filters['car'].find(filter => filter === car.id) ? "active" : "")} onClick={() => updateFilters('car', car.id)}>
                                        <span>
                                            {car.model} <br />
                                            <span>
                                                {car.number}&nbsp;{car.region}
                                            </span>
                                        </span>
                                        <span>
                                            {Utils.formatNumber(car.amount)} ₽
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                    {deductions.length &&
                        <div className="personal-account_transactions-balance">
                            <div className="personal-account_transactions-title font-size-20 font-weight-semibold">
                                Списания
                            </div>
                            <ul className="personal-account_transactions-balanceList">
                                {deductions.map(item =>
                                    <li key={item.id} className={"personal-account_transactions-balanceItem additional " + (filters['deduction'].find(filter => filter === item.id) ? "active" : "")} onClick={() => updateFilters('deduction', item.id)}>
                                        <span>
                                            {item.name} <br />
                                            <span>
                                                {Utils.formatNumber(item.payed)}&nbsp;/&nbsp;{Utils.formatNumber(item.total)}
                                            </span>
                                        </span>
                                        <span>
                                            {Utils.formatNumber(item.perDay)}&nbsp;₽&nbsp;/&nbsp;день
                                        </span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                </>
                :
                <div className="personal-account_transactions-filters">
                    <div className={"personal-account_transactions-filtersHead " + (mobFilterOpened ? "active" : "")} onClick={() => setMobFilterOpened(prev => !prev)}>
                        Другие категории
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="#222222" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {mobFilterOpened &&
                        <>
                            <MobileFilter title={"Операции"}>
                                <li className={"personal-account_transactions-balanceItem " + (filters['operation'].find(filter => filter === "Приход") ? "active" : "")} onClick={() => updateFilters('operation', 'Приход')}>
                                    <img src={income} alt="Приход" />
                                    <span>
                                        Приход
                                    </span>
                                    <span>
                                        {Utils.formatNumber(totalIncome)} ₽
                                    </span>
                                </li>
                                <li className={"personal-account_transactions-balanceItem " + (filters['operation'].find(filter => filter === "Расход") ? "active" : "")} onClick={() => updateFilters('operation', 'Расход')}>
                                    <img src={outcome} alt="Расход" />
                                    <span>
                                        Расход
                                    </span>
                                    <span>
                                        {Utils.formatNumber(totalOutcome)} ₽
                                    </span>
                                </li>
                                <li className={"personal-account_transactions-balanceItem " + (filters['operation'].find(filter => filter === "Перевод") ? "active" : "")} onClick={() => updateFilters('operation', 'Перевод')}>
                                    <img src={transaction} alt="Перевод" />
                                    <span>
                                        Перевод
                                    </span>
                                    <span>
                                        {Utils.formatNumber(totalTransactions)} ₽
                                    </span>
                                </li>
                            </MobileFilter>
                            {cars.length &&
                                <MobileFilter title={"Автомобили"}>
                                    {cars.map(car =>
                                        <li key={car.id} className={"personal-account_transactions-balanceItem additional " + (filters['car'].find(filter => filter === car.id) ? "active" : "")} onClick={() => updateFilters('car', car.id)}>
                                            <span>
                                                {car.model} <br />
                                                <span>
                                                    {car.number}&nbsp;{car.region}
                                                </span>
                                            </span>
                                            <span>
                                                {Utils.formatNumber(car.amount)} ₽
                                            </span>
                                        </li>
                                    )}
                                </MobileFilter>
                            }
                            {deductions.length &&
                                <MobileFilter title={"Списания"}>
                                    {deductions.map(item =>
                                        <li key={item.id} className={"personal-account_transactions-balanceItem additional " + (filters['deduction'].find(filter => filter === item.id) ? "active" : "")} onClick={() => updateFilters('deduction', item.id)}>
                                            <span>
                                                {item.name} <br />
                                                <span>
                                                    {Utils.formatNumber(item.payed)}&nbsp;/&nbsp;{Utils.formatNumber(item.total)}
                                                </span>
                                            </span>
                                            <span>
                                                {Utils.formatNumber(item.perDay)}&nbsp;₽&nbsp;/&nbsp;день
                                            </span>
                                        </li>
                                    )}
                                </MobileFilter>
                            }
                        </>
                    }
                </div>
            }

        </>
    )
}

export default TransactionsBalance;