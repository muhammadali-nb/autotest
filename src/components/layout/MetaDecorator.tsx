import React from "react";
import { Helmet } from "react-helmet";
import Logo from "../../images/logo.png";
const MetaDecorator = ({
	title,
	image,
	url,
}: {
	title: string;
	image?: string;
	url?: string;
}) => {
	const logo = process.env.REACT_APP_API_HOST + "/logo192.png";

	return (
		<Helmet>
			<meta property="og:title" content={title} />
			<meta property="og:image" content={image ? image : logo} />
			<meta
				property="og:url"
				content={process.env.REACT_APP_API_HOST + (url ?? "")}
			/>
		</Helmet>
	);
};

export default MetaDecorator;
