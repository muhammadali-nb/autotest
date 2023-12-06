import date from "../../../../images/personal-account/fines/date.svg";
import "./PersonalAccountFines.scss";
import arrow from "../../../../images/personal-account/fines/arrow.svg";
import doubleArrow from "../../../../images/personal-account/fines/double-arrow.svg";
import { useState } from "react";

const FinesHead: React.FC = () => {
    const [payed, setPayed] = useState(true);

    return (
        <div className="personal-account_fines-head">
            <div className="personal-account_fines-datefilter">
                <img src={date} alt="Дата" />
                <span className="personal-account_fines-prevDate">
                    <img src={arrow} alt="Предыдущая дата" />
                </span>
                <div className="psonal-account_fines-dateValue">
                    00.00.0000
                </div>
                <span className="personal-account_fines-nextDate">
                    <img src={arrow} alt="Следующая дата" />
                </span>
            </div>
            <div className="personal-account_fines-payed">
                <span>Оплачены</span>
                <div className={!payed ? "not-payed" : ""} onClick={() => setPayed(prev => !prev)}>

                </div>
                <span>Не оплачены</span>
            </div>
            <div className="personal-account_fines-pages">
                <div className="personal-account_fines-prevPage">
                    <img src={arrow} alt="Предыдущая страница" />
                </div>

                <div className="personal-account_fines-page active">
                    1
                </div>
                <div className="personal-account_fines-page">
                    2
                </div>
                <div className="personal-account_fines-page">
                    3
                </div>
                <div className="personal-account_fines-nextPage">
                    <img src={arrow} alt="Следующая страница" />
                </div>
                <div className="personal-account_fines-nextPages">
                    <img src={doubleArrow} alt="След. 3 страницы" />
                </div>
                <div className="personal-account_fines-page">
                    5
                </div>
            </div>
        </div>
    )
}

export default FinesHead;