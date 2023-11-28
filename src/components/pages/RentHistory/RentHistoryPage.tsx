import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountCarCard from "../../common/PersonalAccount/PersonalAccountCarCard/PersonalAccountCarCard";
import PersonalAccountRentLayout from "../../layout/PersonalAccountLayout/PersonalAccountRentLayout";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";

const RentHistoryPage = () => {
	return (
		<>
			<PersonalAccountRentLayout>
				<div className="d-none d-md-block">
					<PersonalAccountHeader />
					<div className="personal-account_page-rent_cars">
						<PersonalAccountCarCard />
						<PersonalAccountCarCard />
						<PersonalAccountCarCard />
					</div>
				</div>
				<div className="d-block d-md-none">
					<PersonalAccountHeaderMobile />
					<div className="personal-account_page-rent_cars">
						<PersonalAccountCarCard />
						<PersonalAccountCarCard />
						<PersonalAccountCarCard />
					</div>
				</div>
			</PersonalAccountRentLayout>
		</>
	);
};

export default RentHistoryPage;
