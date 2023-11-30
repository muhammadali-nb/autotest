import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import TransactionsBalance from "../../common/PersonalAccount/PersonalAccountTransactions/TransactionsBalance";
import PersonalAccountTransactionsLayout from "../../layout/PersonalAccountLayout/PersonalAccountTransactionsLayout";

const TransactionsPage: React.FC = () => {
    return (
        <PersonalAccountTransactionsLayout>
            <div className="d-none d-md-block">
                <PersonalAccountHeader>
                    <h1 className="personal-account-header_title">транзакции</h1>
                </PersonalAccountHeader>
                <div className="personal-account_transactions">
                    <div className="personal-account_transactions-items">
                        <div className="personal-account_transactions-item">
                            <TransactionsBalance />
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-block d-md-none">
                {/* <PersonalAccountHeaderMobile /> */}
            </div>
        </PersonalAccountTransactionsLayout>
    )
}

export default TransactionsPage;
