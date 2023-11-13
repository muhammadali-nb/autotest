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
import RentHistoryPage from "../components/pages/RentHistory/RentHistoryPage";
import OfferPage from "../components/pages/OfferPage";
import NotExistsPage from "../components/pages/NotExistsPage";
import App from "../App";

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
				<Route
					path={"car/:carID"}
					element={<RentCarDetail />}
					// loader={carRentDataLoader}
				/>
			</Route>
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
				element={<RentHistoryPage />}
			/>
			<Route path={"offer"} element={<OfferPage />} />
			<Route path={"*"} element={<NotExistsPage />} />
		</Route>
	)
);
