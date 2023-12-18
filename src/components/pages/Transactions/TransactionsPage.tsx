import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import TransactionsBalance from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsBalance";
import TransactionsList from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsList";
import PersonalAccountTransactionsLayout from "../../layout/PersonalAccountLayout/PersonalAccountTransactionsLayout";

import logo from "../../../images/logo.png";
import { useEffect, useState } from "react";
import { accountsProps } from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import { useQuery } from "@tanstack/react-query";
import transactionsService from "../../../api-functions/transactions-page/transactions-service";

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
    transactions: transactionsProps[],
    balance?: accountsProps[]
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

    const { data, isLoading } = useQuery({
        queryKey: ["transactions"],
        queryFn: () => transactionsService.getTransactions(page, filters)
    });

    console.log(data)

    const updateFilters = (field: string, value: string) => {
        let newArray: string[] = [];
        const item = filters[field].find(item => item === value);

        if (item) {
            newArray = filters[field].filter(item => item !== value);
        } else {
            newArray = [...filters[field], value];
        }

        const newFilters = { ...filters, [field]: newArray };
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
                    {!isLoading &&
                        <div className="personal-account_transactions">
                            <div className="personal-account_transactions-items">
                                <div className="personal-account_transactions-item">
                                    <TransactionsBalance totalIncome={data.totalIncome} totalOutcome={data.totalOutcome} totalTransactions={data.totalTransactions} filters={filters} updateFilters={updateFilters} balance={data.balance} cars={data.cars} deductions={data.deductions} />
                                </div>
                                <div className="personal-account_transactions-item">
                                    <TransactionsList data={data.transactions} page={page} setPage={() => setPage(prev => prev + 1)} totalPages={data.pages} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
                :
                <div className="d-block d-md-none">
                    <PersonalAccountHeaderMobile>
                        <h2>Транзакции</h2>
                        <h2></h2>
                    </PersonalAccountHeaderMobile>
                    <div className="personal-account_transactions">
                        {!isLoading &&
                            <div className="personal-account_transactions-items">
                                <div className="personal-account_transactions-item">
                                    <TransactionsBalance totalIncome={data.totalIncome} totalOutcome={data.totalOutcome} totalTransactions={data.totalTransactions} filters={filters} updateFilters={updateFilters} balance={data.balance} cars={data.cars} deductions={data.deductions} />
                                </div>
                                <div className="personal-account_transactions-item">
                                    <TransactionsList data={data.transactions} page={page} setPage={() => setPage(prev => prev + 1)} totalPages={data.pages} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </PersonalAccountTransactionsLayout>
    )
}

export default TransactionsPage;
