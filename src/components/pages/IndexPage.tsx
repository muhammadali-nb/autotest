import React, { useEffect, useState } from "react";
import BaseLayout, { MetaTags } from "../layout/BaseLayout";
import IndexLogo from "./Index/IndexLogo";
import IndexSteps from "./Index/IndexSteps";
import IndexAbout from "./Index/IndexAbout";
import IndexOffers from "./Index/IndexOffers";
import Api from "../../Api";
import IndexGreatDeals from "./Index/IndexGreatDeals";
import MetaDecorator from "../layout/MetaDecorator";

const IndexPage = () => {
	const title = process.env.REACT_APP_WEBSITE_NAME;
	const meta: MetaTags = {
		description: process.env.REACT_APP_WEBSITE_NAME,
		keywords: "leasing,rent,аренда,авто,автомобиль,лизинг,бронирование",
	};
	const [whiteMenu, setWhiteMenu] = useState(false); // этот стейт отвечает за цвет menu для первой секций

	useEffect(() => {
		console.log(process.env.REACT_PUBLIC_API_BASE);
	}, []);

	return (
		<>
			<MetaDecorator title={title ?? "Компания Восход"} />
			<BaseLayout
				whiteMenu={whiteMenu}
				title={title}
				meta={meta}
				headerType={"transparent"}
				headerSelectedLink={"/"}
				noTopPadding={true}>
				<IndexLogo
					sectionId="index__logo"
					setDarkMenu={setWhiteMenu}
					bgNoCar={false}
				/>
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
