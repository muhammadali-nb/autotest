import { Link } from "react-router-dom";
import Utils from "../../../../utils/Utils";
import { detailTransactionProps, transactionsProps } from "../../../pages/Transactions/TransactionsPage";
import depositIcon from "../../../../images/personal-account/balance/deposit.svg";
import logo from "../../../../images/personal-account/balance/logo.svg";
import yandexIcon from "../../../../images/personal-account/balance/yandex.png";
import cityIcon from "../../../../images/personal-account/balance/city.png";
import { useEffect, useRef, useState } from "react";

const TransactionsDayItem: React.FC<{
    date: string,
    items: detailTransactionProps[]
}> = (props) => {
    const { date, items } = props;

    const formatDate = (date: string) => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const receivedDate = new Date(date);

        if (today.toDateString() === receivedDate.toDateString()) {
            return "Сегодня";
        } else if (yesterday.toDateString() === receivedDate.toDateString()) {
            return "Вчера";
        } else {
            let month: number | string = receivedDate.getMonth() + 1;

            if (month < 10) {
                month = "0" + month;
            }

            return `${receivedDate.getDate()}.${month}`;
        }
    }

    const getType = (type: string) => {
        if (type === "transaction") {
            return "Перевод";
        } else if (type === "income") {
            return "Приход";
        } else if (type === "outcome") {
            return "Расход";
        } else {
            return "";
        }
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "deposit": return depositIcon;
            case "inside": return logo;
            case "yandex": return yandexIcon;
            case "citymobil": return cityIcon;
            default: return;
        }
    }

    const getDate = (date: string) => {
        const newDate = new Date(date);

        return `${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`
    }

    return (
        <li className="personal-account_transactions-day">
            <div className="personal-account_transactions-date">
                {formatDate(date)}
            </div>
            <ul className="personal-account_transactions-story">
                {items.map(item =>
                    <li key={item.id}>
                        <div className={"personal-account_transactions-icons " + (item.type === "transaction" ? "transaction" : "")}>
                            {item.icons.map(icon =>
                                <img src={getIcon(icon)} alt={icon} />
                            )}
                        </div>
                        <div className="personal-account_transactions-time">
                            <div>
                                {getDate(date)}
                            </div>
                            <div>
                                {item.time}
                            </div>
                        </div>
                        <div className="personal-account_transactions-name">
                            <div>
                                {item.name.map(el =>
                                    <>
                                        {el.link ?
                                            <Link to={el.link}>{el.name}</Link>
                                            :
                                            el.name
                                        }
                                        &nbsp;
                                    </>
                                )}
                            </div>
                            <div className={(item.type === "transaction" ? "transaction" : (item.type === "income" ? "income" : "outcome"))}>
                                {getType(item.type)}
                            </div>
                        </div>
                        <div className="personal-account_transactions-amount">
                            <div>
                                {item.type === "income" && "+"}{item.type === "outcome" && "-"}&nbsp;{Utils.formatNumber(item.amount)}&nbsp;₽
                            </div>
                            <div>
                                {item.time}
                            </div>
                        </div>
                    </li>
                )}
            </ul>
        </li>
    )
}

const TransactionsList: React.FC<{
    data: transactionsProps[],
    page: number,
    setPage: () => void,
    totalPages: number
}> = (props) => {
    const { data, page, setPage, totalPages } = props;
    const [transactions, setTransactions] = useState<transactionsProps[]>([]);

    const bottomOfList = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTransactions(prev => prev.concat(...data));

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && page < 2) {
                setPage();
            }
        }, {
            rootMargin: '10px'
        });

        if (bottomOfList.current) {
            observer.observe(bottomOfList.current);
        }

        return () => {
            if (bottomOfList.current) {
                observer.unobserve(bottomOfList.current);
            }
        }
    }, [data, bottomOfList]);

    return (
        <>
            <ul className="personal-account_transactions-list">
                {transactions && transactions.map(item =>
                    <TransactionsDayItem date={item.date} key={item.id} items={item.transactions} />
                )}
            </ul>
            {(page < totalPages) &&
                <div ref={bottomOfList}></div>
            }
        </>
    )
}

export default TransactionsList;