import React from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import IndexPage, { indexLoader } from "./components/pages/IndexPage";
import CatalogPage from "./components/pages/CatalogPage";
import NotExistsPage from "./components/pages/NotExistsPage";
import PolicyPage from "./components/pages/PolicyPage";
import FaqPage, { faqLoader } from "./components/pages/FaqPage";
import ContactsPage from "./components/pages/ContactsPage";
import ProgramsPage, {
	faqProgramsLoader,
} from "./components/pages/ProgramsPage";
import { YMaps } from "@pbe/react-yandex-maps";
import UserAgreementPage from "./components/pages/UserAgreementPage";
import OfferPage from "./components/pages/OfferPage";
import CarPage, { carDataLoader } from "./components/pages/CarPage";
import RentPage from "./components/pages/RentPage";
import PersonalAccountPage from "./components/pages/PersonalAccount/PersonalAccountPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<IndexPage />} loader={indexLoader} />
			<Route path={"catalog"} element={<CatalogPage />} />
			<Route
				path={"catalog/:id"}
				element={<CarPage />}
				loader={carDataLoader}
			/>
			<Route path={"rent"} element={<RentPage />} />
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
			<Route path={"offer"} element={<OfferPage />} />
			<Route path={"*"} element={<NotExistsPage />} />
		</Route>
	)
);

const App = () => (
	<YMaps>
		<RouterProvider router={router} />
	</YMaps>
);

export default App;
