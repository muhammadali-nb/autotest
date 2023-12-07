import date from "../../../../../images/personal-account/fines/date.svg";
import arrow from "../../../../../images/personal-account/fines/arrow.svg";

const FinesHeadMobile: React.FC = () => {
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
            <div className="personal-account_fines-checkboxes">
                <label className="personal-account_fines-check" htmlFor="payed">
                    Только неоплаченные
                    <input type="checkbox" name="payed" id="payed" />
                    <span></span>
                </label>
            </div>
        </div>
    )
}

export default FinesHeadMobile;