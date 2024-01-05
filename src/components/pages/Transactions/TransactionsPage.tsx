import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import TransactionsBalance from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsBalance";
import TransactionsList from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsList";
import PersonalAccountTransactionsLayout from "../../layout/PersonalAccountLayout/PersonalAccountTransactionsLayout";

import logo from "../../../images/logo.png";
import { useEffect, useState } from "react";
import { accountsProps, balanceProps } from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import { useQuery } from "@tanstack/react-query";
import transactionsService from "../../../api-functions/transactions-page/transactions-service";
import BalanceLoader from "../../common/PersonalAccount/PersonalAccountTransactions/BalanceLoader";
import TransactionsLoader from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsLoader";
// import Loader from "../../common/Loader";

export interface detailTransactionProps {
    id: string,
    type: string,
    time: string,
    icons: string[],
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
    transactions?: transactionsProps[],
    balance: balanceProps
}

const TransactionsPage: React.FC = () => {
    const [size, setSize] = useState("desk");
    const [filters, setFilters] = useState({
        balance: [],
        operation: [],
        car: [],
        deduction: []
    });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [transactions, setTransactions] = useState<transactionsProps[]>([]);
    const [balanceData, setBalanceData] = useState<transactionsDataProps>({
        totalIncome: 0,
        totalOutcome: 0,
        totalTransactions: 0,
        cars: [],
        deductions: [],
        balance: {
            total: 0,
            accounts: []
        }
    });

    const { data, isLoading } = useQuery({
        queryKey: ["transactions", page, filters],
        queryFn: () => transactionsService.getTransactions(page, filters)
    });

    // console.log(data)

    const updateFilters = (field: string, value: string) => {
        let newArray: string[] = [];
        const item = filters[field].find(item => item === value);

        if (item) {
            newArray = filters[field].filter(item => item !== value);
        } else {
            newArray = [...filters[field], value];
        }

        const newFilters = { ...filters, [field]: newArray };
        setPage(1);
        setTransactions([]);
        setFilters(newFilters);
    }

    useEffect(() => {
        if (!data) return;
        if (transactions !== data.transactions && !isLoading) {
            setTransactions(prev => prev.concat(...data.transactions));
        }

        setBalanceData({
            totalIncome: data.totalIncome,
            totalOutcome: data.totalOutcome,
            totalTransactions: data.totalTransactions,
            cars: data.cars,
            deductions: data.deductions,
            balance: data.balance
        });

        if (totalPages !== data.pages) {
            setTotalPages(data.pages);
        }
    }, [data]);

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth > 1024) {
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
                <div>
                    <PersonalAccountHeader>
                        <h1 className="personal-account-header_title">транзакции</h1>
                    </PersonalAccountHeader>
                    <div className="personal-account_transactions">
                        <div className="personal-account_transactions-items">
                            <div className="personal-account_transactions-item">
                                {(isLoading && page === 1) ?
                                    <BalanceLoader />
                                    :
                                    <TransactionsBalance data={balanceData} filters={filters} updateFilters={updateFilters} />
                                }
                            </div>
                            <div className="personal-account_transactions-item">
                                {(isLoading && page === 1) ?
                                    <TransactionsLoader />
                                    :
                                    <TransactionsList data={transactions} page={page} setPage={() => setPage(prev => prev + 1)} totalPages={totalPages} isLoading={isLoading} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>
                    <PersonalAccountHeaderMobile>
                        <h2>Транзакции</h2>
                        <h2></h2>
                    </PersonalAccountHeaderMobile>
                    <div className="personal-account_transactions">
                        <div className="personal-account_transactions-items">
                            <div className="personal-account_transactions-item">
                                {(isLoading && page === 1) ?
                                    <BalanceLoader />
                                    :
                                    <TransactionsBalance data={balanceData} filters={filters} updateFilters={updateFilters} />
                                }
                            </div>
                            <div className="personal-account_transactions-item">
                                {(isLoading && page === 1) ?
                                    <TransactionsLoader />
                                    :
                                    <TransactionsList data={transactions} page={page} setPage={() => setPage(prev => prev + 1)} totalPages={totalPages} isLoading={isLoading} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </PersonalAccountTransactionsLayout>
    )
}

export default TransactionsPage;
