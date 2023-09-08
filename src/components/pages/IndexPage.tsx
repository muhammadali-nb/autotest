import React from "react";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import IndexLogo from "./Index/IndexLogo";
import IndexSteps from "./Index/IndexSteps";
import IndexAbout from "./Index/IndexAbout";
import IndexOffers from "./Index/IndexOffers";
import Api from "../../Api";
import IndexGreatDeals from "./Index/IndexGreatDeals";

const IndexPage = () => {
	// const d = useLoaderData();
	// console.log('from index', d);
	const title = process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: process.env.REACT_APP_WEBSITE_NAME,
		keywords: "leasing,rent,аренда,авто,автомобиль,лизинг,бронирование",
	};
	return (
		<BaseLayout
			title={title}
			meta={meta}
			headerType={"transparent"}
			noTopPadding={true}>
			<IndexLogo bgNoCar={false} />
			<IndexSteps />
			<IndexAbout />
			<IndexGreatDeals/>
			<IndexOffers />
		</BaseLayout>
	);
};

const indexLoader = async ({ request, params }) => {
	return Api.recommend(); // d.json();
};
export { indexLoader };
export default IndexPage;
