import { Link } from "react-router-dom";
import Utils from "../../../../utils/Utils";
import { detailTransactionProps, transactionsProps } from "../../../pages/Transactions/TransactionsPage";

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
                                <img src={icon.url} alt={icon.url} />
                            )}
                        </div>
                        <div className="personal-account_transactions-time">
                            <div>
                                {date}
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
                                {item.type === "income" && "+"}{item.type === "outcome" && "-"} {Utils.formatNumber(item.amount)} ₽
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
    data: transactionsProps[]
}> = (props) => {
    const { data } = props;

    return (
        <ul className="personal-account_transactions-list">
            {data && data.map(item =>
                <TransactionsDayItem date={item.date} key={item.id} items={item.transactions} />
            )}
        </ul>
    )
}

export default TransactionsList;