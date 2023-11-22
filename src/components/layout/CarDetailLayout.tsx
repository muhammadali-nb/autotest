import React, { useEffect } from "react";
import DocumentMeta from "react-document-meta";
import { BaseLayoutProps } from "./BaseLayout";
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Api from "../../Api";
import { setBaseState } from "../../store/reducers/baseDataSlice";
import Footer, { SmallFooter } from "./Footer";
=======
import  { SmallFooter } from "./Footer";
>>>>>>> mobile-version
import Cookies from "../common/Cookies";
import CarDetailHeader from "./CarDetailHeader";
import { Container } from "react-bootstrap";

export const CarDetailLayout = (props: BaseLayoutProps) => {
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
					type={props.headerType ?? "white"}
					selectedLink={props.headerSelectedLink ?? "/"}
				/>
				<main>{ props.children}</main>

				<Container fluid={"xxl"}>
					<SmallFooter />
					{/* className="mb-px-70" */}
				</Container>

				{/* <Scroller />
				<ToggleSentUserData /> */}
				<Cookies />
			</div>
		</DocumentMeta>
	);
};
