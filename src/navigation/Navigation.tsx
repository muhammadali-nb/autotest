import {
	Route,
	Router,
	Routes,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import IndexPage, { indexLoader } from "../components/pages/IndexPage";
import CatalogPage from "../components/pages/CatalogPage";
import CarPage, { carDataLoader } from "../components/pages/CarPage";
import RentPage from "../components/pages/RentPage";
import RentCarDetail, {
	carRentDataLoader,
} from "../components/pages/Rent/RentCarDetail";
import ProgramsPage, {
	faqProgramsLoader,
} from "../components/pages/ProgramsPage";
import FaqPage, { faqLoader } from "../components/pages/FaqPage";
import ContactsPage from "../components/pages/ContactsPage";
import PolicyPage from "../components/pages/PolicyPage";
import UserAgreementPage from "../components/pages/UserAgreementPage";
import PersonalAccountPage from "../components/pages/PersonalAccount/PersonalAccountPage";
import OfferPage from "../components/pages/OfferPage";
import NotExistsPage from "../components/pages/NotExistsPage";
import App from "../App";
import Payment from "../components/pages/Payment";
import PersonalAccountRentHistoryPage from "../components/pages/PersonalAccountRentHistory/PersonalAccountRentHistoryPage";
import PersonalAccountLeasingPage from "../components/pages/PersonalAccountLeasing/PersonalAccountLeasingPage";
import TransactionsPage from "../components/pages/Transactions/TransactionsPage";
import FinesPage from "../components/pages/Fines/FinesPage";
import { PaymentsPage } from "../components/pages/Payments/PaymentsPage";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="*" element={<App />}>
			<Route index element={<IndexPage />} loader={indexLoader} />
			<Route path={"catalog"} element={<CatalogPage />} />
			<Route
				path={"catalog/:id"}
				element={<CarPage />}
				loader={carDataLoader}
			/>
			<Route path="rent/page/:id">
				<Route index element={<RentPage />} />
				<Route path={"car/:carID"} element={<RentCarDetail />} />
			</Route>
			<Route path="payment/confirm/car/:id/pid/:pid" element={<Payment />} />
			<Route
				path={"programs"}
				element={<ProgramsPage />}
				loader={faqProgramsLoader}
			/>
			<Route path={"faq"} element={<FaqPage />} loader={faqLoader} />
			<Route path={"contacts"} element={<ContactsPage />} />
			<Route path={"policy"} element={<PolicyPage />} />
			<Route path={"userAgreement"} element={<UserAgreementPage />} />
			<Route path="personal-account" element={<PersonalAccountPage />} />
			<Route
				path="personal-account/rent-history"
				element={<PersonalAccountRentHistoryPage />}
			/>	
			<Route
				path="personal-account/leasing"
				element={<PersonalAccountLeasingPage />}
			/>
			<Route path="personal-account/payment" element={<PaymentsPage />} />
			<Route path="personal-account/transactions" element={<TransactionsPage />} />
			<Route path="personal-account/fines" element={<FinesPage />} />
			<Route path={"offer"} element={<OfferPage />} />
			<Route path={"*"} element={<NotExistsPage />} />
		</Route>
	)
);
