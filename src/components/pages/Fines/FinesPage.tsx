import PersonalAccountFinesLayout from "../../layout/PersonalAccountLayout/PersonalAccountFinesLayout";
import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import FinesHead from "../../common/PersonalAccount/PersonalAccountFines/FinesHead";
import FinesTable from "../../common/PersonalAccount/PersonalAccountFines/FinesTable";

const FinesPage: React.FC = () => {
    return (
        <PersonalAccountFinesLayout>
            <div className="d-none d-md-block">
                <PersonalAccountHeader>
                    <h1 className="personal-account-header_title">Штрафы</h1>
                    <PersonalAccountBalance />
                </PersonalAccountHeader>
                <div className="personal-account_fines">
                    <FinesHead />
                    <FinesTable />
                </div>
            </div>
        </PersonalAccountFinesLayout>
    )
}

export default FinesPage;