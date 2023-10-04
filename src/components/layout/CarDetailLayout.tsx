import React, { useEffect } from "react";
import DocumentMeta from "react-document-meta";
import { BaseLayoutProps } from "./BaseLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Api from "../../Api";
import { setBaseState } from "../../store/reducers/baseDataSlice";
import Footer, { SmallFooter } from "./Footer";
import Scroller from "../common/Scroller";
import ToggleSentUserData from "../common/ToggleSentUserData";
import Cookies from "../common/Cookies";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import CarDetailHeader from "./CarDetailHeader";
import { Container } from "react-bootstrap";

export const CarDetailLayout = (props: BaseLayoutProps) => {
	const bState: any = useAppSelector((state) => state.baseData);
	const dispatch = useAppDispatch();
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
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		if (!bState.loaded) {
			const loader = async () => {
				let data = await Api.baseData();
				if (Api.isError(data)) {
					//TODO:Error check!
					return;
				}
				dispatch(setBaseState(data));
			};
			loader();
		}
	});

	return (
		<DocumentMeta {...meta}>
			<div className={"site"}>
				{!props.noTopPadding && <div className="no-top-padding" />}
				<CarDetailHeader
					image={props.headerImage}
					type={props.headerType ?? "white"}
					selectedLink={props.headerSelectedLink ?? "/"}
				/>
				<main>{bState.loaded && props.children}</main>

				<Container fluid={"xxl"}>
					<SmallFooter />
				</Container>

				{/* <Scroller />
				<ToggleSentUserData /> */}
				<Cookies />
			</div>
		</DocumentMeta>
	);
};
