import { HeaderLogoImage } from "../../../layout/Header";
import call from "../../../../images/common/Phone-header-dark.svg";
import back from "../../../../images/common/back-dark.svg";
import logo from "../../../../images/personal-account/balance/logo.svg";
import deposit from "../../../../images/personal-account/balance/deposit.svg";
import { BalanceItem } from "../../../pages/PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import "./BalanceMobile.scss";
import Utils from "../../../../utils/Utils";
import { Link } from "react-router-dom";
import { MobileModal } from "../../MobileModal/MobileModal";
import { useState } from "react";

interface accountsProps {
    name: string,
    icon: string,
    balance: number
}

export interface balanceProps {
    total: number,
    accounts: accountsProps[]
}

const balanceData = {
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

const BalanceMobile: React.FC<{
    active: boolean,
    setActive: (e: boolean) => void
}> = (props) => {
    const { active, setActive } = props;

    const [mobileModalOpened, setMobileModalOpened] = useState(false);

    return (
        <div className={`balance-mobile  ${active && "active"}`}>
            <div className="balance-mobile_head">
                <div className="mobile-modal_header-top">
                    <img src={back} onClick={() => setActive(false)} alt="" />
                    <HeaderLogoImage width={"100px"} height={"24px"} image="dark" />
                    <img src={call} alt="" onClick={() => setMobileModalOpened(prev => !prev)} />
                </div>
            </div>
            <div className="balance-mobile_body">
                <div className={"personal-account_balance-title " + (balanceData.total < 0 ? "negative" : "")}>
                    <div className="font-size-20">
                        Баланс
                    </div>
                    <div className="font-size-16">
                        {Utils.formatNumber(balanceData.total)} ₽
                    </div>
                </div>
                <ul className="personal-account_balance-list">
                    {balanceData.accounts && balanceData.accounts.map((item, index) =>
                        <BalanceItem name={item.name} icon={item.icon} balance={item.balance} key={index} />
                    )}
                </ul>
                <div className="balance-mobile_deposit">
                    &laquo;Депозит&raquo;&nbsp;&mdash; это сумма, которая блокируется на&nbsp;кредитной карте и&nbsp;определяет пределы ответственности клиента
                    за&nbsp;арендованный автомобиль.
                </div>
                <Link to={"/personal-account/transactions"} className="site-btn dark big balance-mobile_btn">
                    Перейти в Транзакции
                    <img src={back} alt="Перейти в Транзакции" />
                </Link>
                {balanceData.total > 0 &&
                    <div className="personal-account_balance-action">
                        <button className="site-btn big">
                            Вывести
                        </button>
                    </div>
                }
            </div>
            <MobileModal
				active={mobileModalOpened}
				type={"orderCall"}
				setActive={setMobileModalOpened}
			/>
        </div>
    )
}

export default BalanceMobile;