import React, { useEffect } from "react";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import IndexLogo from "./Index/IndexLogo";
import IndexSteps from "./Index/IndexSteps";
import IndexAbout from "./Index/IndexAbout";
import IndexOffers from "./Index/IndexOffers";
import Api from "../../Api";
import IndexGreatDeals from "./Index/IndexGreatDeals";
import { Helmet } from "react-helmet";
import Logo from "../../images/logo.png";

const IndexPage = () => {
	const title = process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: process.env.REACT_APP_WEBSITE_NAME,
		keywords: "leasing,rent,аренда,авто,автомобиль,лизинг,бронирование",
	};
	return (
		<>
			<Helmet>
				<meta property="og:title" content={title} />
				<meta
					property="og:image"
					content={"https://test.voshod-auto.ru/" + Logo}
				/>
				<meta property="og:url" content={process.env.REACT_APP_API_HOST} />
			</Helmet>
			<BaseLayout
				title={title}
				meta={meta}
				headerType={"transparent"}
				headerSelectedLink={"/"}
				noTopPadding={true}>
				<IndexLogo bgNoCar={false} />
				<IndexSteps />
				<IndexAbout />
				<IndexGreatDeals />
				<IndexOffers />
			</BaseLayout>
		</>
	);
};

const indexLoader = async ({ request, params }) => {
	return Api.recommend(); // d.json();
};
export { indexLoader };
export default IndexPage;
