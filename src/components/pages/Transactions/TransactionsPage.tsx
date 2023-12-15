import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import TransactionsBalance from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsBalance";
import TransactionsList from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsList";
import PersonalAccountTransactionsLayout from "../../layout/PersonalAccountLayout/PersonalAccountTransactionsLayout";

import logo from "../../../images/logo.png";
import { useEffect, useState } from "react";
import { accountsProps } from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";

export interface detailTransactionProps {
    id: string,
    type: string,
    time: string,
    icons: { url: string }[],
    name: {
        name: string,
        link: string
    }[],
    amount: number
}

export interface transactionsProps {
    id: string,
    date: string,
    transactions: detailTransactionProps[]
}

export interface carsProps {
    id: string,
    model: string,
    number: string,
    region: string,
    amount: number
}

export interface deductionsProps {
    id: string,
    name: string,
    total: number,
    payed: number,
    perDay: number
}

export interface transactionsDataProps {
    totalIncome: number,
    totalOutcome: number,
    totalTransactions: number,
    cars: carsProps[],
    deductions: deductionsProps[],
    transactions: transactionsProps[],
    balance?: accountsProps[]
}

const transactionsData: transactionsDataProps = {
    totalIncome: 8500,
    totalOutcome: 5000,
    totalTransactions: 15499,
    cars: [
        {
            id: "1",
            model: "Kia K5",
            number: "М766КС",
            region: "198",
            amount: 9999
        },
        {
            id: "2",
            model: "Kia K5",
            number: "М766КС",
            region: "198",
            amount: 9998
        },
        {
            id: "3",
            model: "Kia K5",
            number: "М766КС",
            region: "198",
            amount: 9997
        }
    ],
    deductions: [
        {
            id: "1",
            name: "Депозит",
            total: 50000,
            payed: 5000,
            perDay: 5000,
        },
        {
            id: "2",
            name: "Первый взнос",
            total: 50000,
            payed: 5000,
            perDay: 5000,
        },
        {
            id: "3",
            name: "Штраф",
            total: 50000,
            payed: 5000,
            perDay: 5000,
        }
    ],
    transactions: [
        {
            id: "1",
            date: "2023-12-01",
            transactions: [
                {
                    id: "11",
                    type: "transaction",
                    time: "00:00",
                    icons: [
                        {
                            url: logo
                        },
                        {
                            url: logo
                        }
                    ],
                    name: [
                        { name: "Перевод: Внутренний - Яндекс", link: ""}
                    ],
                    amount: 9999,
                },
                {
                    id: "12",
                    type: "income",
                    time: "00:00",
                    icons: [
                        {
                            url: logo
                        }
                    ],
                    name: [
                        {
                            name: "Депозит от",
                            link: ""
                        },
                        {
                            name: "Kia K5 М766КС 198",
                            link: "#"
                        }
                    ],
                    amount: 10000,
                }
            ]
        },
        {
            id: "2",
            date: "2023-9-29",
            transactions: [
                {
                    id: "21",
                    type: "transaction",
                    time: "00:00",
                    icons: [
                        {
                            url: logo
                        },
                        {
                            url: logo
                        }
                    ],
                    name: [
                        { name: "Перевод: Внутренний - Яндекс", link: ""}
                    ],
                    amount: 9999,
                },
                {
                    id: "22",
                    type: "outcome",
                    time: "00:00",
                    icons: [
                        {
                            url: logo
                        }
                    ],
                    name: [
                        {
                            name: "Депозит от",
                            link: ""
                        },
                        {
                            name: "Kia K5 М766КС 198",
                            link: "#"
                        }
                    ],
                    amount: 10000,
                }
            ]
        }
    ]
}

const TransactionsPage: React.FC = () => {
    const [size, setSize] = useState("desk");
    const [filters, setFilters] = useState({
        balance: [],
        operation: [],
        car: [],
        deduction: []
    });

    const updateFilters = (field: string, value: string) => {
        let newArray: string[] = [];
        const item = filters[field].find(item => item === value);

        if (item) {
            newArray = filters[field].filter(item => item !== value);
        } else {
            newArray = [...filters[field], value];
        }
        
        const newFilters = {...filters, [field]: newArray };
        setFilters(newFilters);
    }

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

    return (
        <PersonalAccountTransactionsLayout>
            {size === "desk" ?
                <div className="d-none d-md-block">
                    <PersonalAccountHeader>
                        <h1 className="personal-account-header_title">транзакции</h1>
                    </PersonalAccountHeader>
                    <div className="personal-account_transactions">
                        <div className="personal-account_transactions-items">
                            <div className="personal-account_transactions-item">
                                <TransactionsBalance totalIncome={transactionsData.totalIncome} totalOutcome={transactionsData.totalOutcome} totalTransactions={transactionsData.totalTransactions} filters={filters} updateFilters={updateFilters} />
                            </div>
                            <div className="personal-account_transactions-item">
                                <TransactionsList data={transactionsData.transactions} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="d-block d-md-none">
                    <PersonalAccountHeaderMobile>
                        <h2>Транзакции</h2>
                        <h2></h2>
                    </PersonalAccountHeaderMobile>
                    <div className="personal-account_transactions">
                        <div className="personal-account_transactions-items">
                            <div className="personal-account_transactions-item">
                                <TransactionsBalance totalIncome={transactionsData.totalIncome} totalOutcome={transactionsData.totalOutcome} totalTransactions={transactionsData.totalTransactions} filters={filters} updateFilters={updateFilters} />
                            </div>
                            <div className="personal-account_transactions-item">
                                <TransactionsList data={transactionsData.transactions} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </PersonalAccountTransactionsLayout>
    )
}

export default TransactionsPage;
