import { Link } from "react-router-dom";
import Utils from "../../../../utils/Utils";
import { detailTransactionProps, transactionsProps } from "../../../pages/Transactions/TransactionsPage";
import depositIcon from "../../../../images/personal-account/balance/deposit.svg";
import logo from "../../../../images/personal-account/balance/logo.svg";
import yandexIcon from "../../../../images/personal-account/balance/yandex.png";
import cityIcon from "../../../../images/personal-account/balance/city.png";
import { useEffect, useRef, useState } from "react";
import Loader from "../../Loader";

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

        let day: string | number = newDate.getDate();
        let month: string | number = newDate.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month
        }

        return `${day}.${month}.${newDate.getFullYear()}`
    }

    return (
        <li className="personal-account_transactions-day">
            <div className="personal-account_transactions-date">
                {formatDate(date)}
            </div>
            <ul className="personal-account_transactions-story">
                {items.map((item, index) =>
                    <li key={index}>
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
    totalPages: number,
    isLoading: boolean
}> = (props) => {
    const { data, page, setPage, totalPages, isLoading } = props;

    const bottomOfList = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isLoading) {
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
    }, [bottomOfList, isLoading, page, setPage]);

    return (
        <>
            {data.length > 0 ?
                <ul className="personal-account_transactions-list">
                    {data && data.map((item, index) =>
                        <TransactionsDayItem date={item.date} key={index} items={item.transactions} />
                    )}
                </ul>
                :
                <>
                    {!isLoading &&
                        <h2>
                            Ничего не найдено
                        </h2>
                    }
                </>
            }

            {page < totalPages &&
                <div ref={bottomOfList}></div>
            }
            {(isLoading && page > 1) &&
                <Loader />
            }
        </>
    )
}

export default TransactionsList;