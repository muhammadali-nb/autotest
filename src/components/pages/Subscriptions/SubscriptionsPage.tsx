import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountSubscriptionsItems from "../../common/PersonalAccount/PersonalAccountSubscriptions/PersonalAccountSubscriptionsItems";
import PersonalAccountSubscriptionsLayout from "../../layout/PersonalAccountLayout/PersonalAccountSubscriptionsLayout";
import PersonalAccountData from "../PersonalAccount/PersonalAccountData";
import { userData } from "../PersonalAccount/PersonalAccountPage";

const SubscriptionsPage: React.FC = () => {
    return (
        <PersonalAccountSubscriptionsLayout>
            <div>
                <PersonalAccountHeader>
                    <PersonalAccountData data={userData} />
                </PersonalAccountHeader>
                <div className="personal-account_subscriptions">
                    <PersonalAccountSubscriptionsItems />
                </div>
            </div>
        </PersonalAccountSubscriptionsLayout>
    )
};

export default SubscriptionsPage;