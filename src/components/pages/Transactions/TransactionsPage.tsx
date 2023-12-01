import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import TransactionsBalance from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsBalance";
import TransactionsList from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsList";
import PersonalAccountTransactionsLayout from "../../layout/PersonalAccountLayout/PersonalAccountTransactionsLayout";

import logo from "../../../images/logo.png";
import { useEffect, useState } from "react";

export interface detailTransactionProps {
    id: string,
    type: string,
    time: string,
    icons: { url: string }[],
    name: string,
    amount: number
}

export interface transactionsProps {
    id: string,
    date: string,
    transactions: detailTransactionProps[]
}

export interface transactionsDataProps {
    totalIncome: number,
    totalOutcome: number,
    totalTransactions: number,
    transactions: transactionsProps[]
}

const transactionsData: transactionsDataProps = {
    totalIncome: 8500,
    totalOutcome: 5000,
    totalTransactions: 15499,
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
                    name: "Перевод: Внутренний - Яндекс",
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
                    name: "Депозит от Kia K5 М766КС 198",
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
                    name: "Перевод: Внутренний - Яндекс",
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
                    name: "Депозит от Kia K5 М766КС 198",
                    amount: 10000,
                }
            ]
        }
    ]
}

const TransactionsPage: React.FC = () => {
    const [size, setSize] = useState("desk");

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
                                <TransactionsBalance totalIncome={transactionsData.totalIncome} totalOutcome={transactionsData.totalOutcome} totalTransactions={transactionsData.totalTransactions} />
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
                                <TransactionsBalance totalIncome={transactionsData.totalIncome} totalOutcome={transactionsData.totalOutcome} totalTransactions={transactionsData.totalTransactions} />
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
