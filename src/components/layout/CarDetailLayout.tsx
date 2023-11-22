import DocumentMeta from "react-document-meta";
import { BaseLayoutProps } from "./BaseLayout";
import { SmallFooter } from "./Footer";
import Cookies from "../common/Cookies";
import CarDetailHeader from "./CarDetailHeader";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export const CarDetailLayout = (props: BaseLayoutProps) => {
	const { id } = useParams();
	const meta = {
		title: props.title ?? process.env.REACT_APP_WEBSITE_NAME,
		description:
			props.meta?.description ?? process.env.REACT_APP_WEBSITE_DESCRIPTION,
		canonical: window.location.href,
		meta: {
			charset: "utf-8",
			name: {
				keywords:
					process.env.REACT_APP_WEBSITE_DESCRIPTION +
					"," +
					(props.meta?.keywords ?? ""),
			},
		},
	};

	return (
		<DocumentMeta {...meta}>
			<div className={"site"}>
				{!props.noTopPadding && <div className="no-top-padding" />}
				<CarDetailHeader
					image={props.headerImage}
					backLink={`/rent/page/${id}`}
					type={props.headerType ?? "white"}
					selectedLink={props.headerSelectedLink ?? "/"}
				/>
				<main>{props.children}</main>

				<Container fluid={"xxl"}>
					<SmallFooter className="mb-px-70" />
				</Container>

				<Cookies />
			</div>
		</DocumentMeta>
	);
};
