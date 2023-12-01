import { balanceProps } from "../PersonalAccountBalance/BalanceMobile";
import logo from "../../../../images/personal-account/balance/logo.svg";
import deposit from "../../../../images/personal-account/balance/deposit.svg";
import "./PersonalAccountTransactions.scss";
import Utils from "../../../../utils/Utils";

const balanceData: balanceProps = {
    total: 9900,
    accounts: [
        {
            name: 'Внутренний',
            icon: logo,
            balance: 4000
        },
        {
            name: "Депозит",
            icon: deposit,
            balance: 7000
        }
    ]
};

const TransactionsBalance: React.FC = () => {
    return (
        <>
            <div className="personal-account_transactions-balance">
                <div className="personal-account_transactions-title font-size-20 font-weight-semibold">
                    Баланс
                    <span>
                        {Utils.formatNumber(balanceData.total)} ₽
                    </span>
                </div>
                <ul className="personal-account_transactions-balanceList">
                    {balanceData.accounts.map((item, index) =>
                        <li key={index} className={"personal-account_transactions-balanceItem " + (item.name === "Депозит" ? "deposit" : "")}>
                            <img src={item.icon} alt={item.name} />
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
        </>
    )
}

export default TransactionsBalance;