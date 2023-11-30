import React, { useEffect, useState } from "react";
import Header, { HeaderImage, HeaderType } from "../Header";

import { setBaseState } from "../../../store/reducers/baseDataSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Scroller from "../../common/Scroller";
import Api from "../../../Api";
import DocumentMeta from "react-document-meta";
import Cookies from "../../common/Cookies";
import MobileMenu from "../MobileMenu";
import { useOutside } from "../../../hooks/useOutside";
import ToggleSentUserData from "../../common/ToggleSentUserData";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";
import PersonalAccountMenu from "../../pages/PersonalAccount/PersonalAccountMenu";
import PersonalAccountMenuMobile from "../../pages/PersonalAccount/PersonalAccountMenuMobile";
import BaseLayout from "../BaseLayout";

export type MetaTags = {
	description?: string;
	keywords?: string;
};
export type CatalogLayoutProps = {
	children?: any;
	headerType?: HeaderType;
	headerSelectedLink?: string;
	headerImage?: HeaderImage;
	footerNoForm?: boolean;
	footerNoContacts?: boolean;
	footerSmall?: boolean;
	title?: string;
	meta?: MetaTags;
	noTopPadding?: boolean;
	[x: string]: any;
};
const PersonalAccountLayout: React.FunctionComponent<CatalogLayoutProps> = (
	props: CatalogLayoutProps
) => {
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
	// useEffect(() => {
	// 	window.scrollTo({ top: 0, behavior: "smooth" });
	// 	if (!bState.loaded) {
	// 		const loader = async () => {
	// 			let data = await Api.baseData();
	// 			if (Api.isError(data)) {
	// 				//TODO:Error check!
	// 				return;
	// 			}
	// 			dispatch(setBaseState(data));
	// 		};
	// 		loader();
	// 	}
	// });
	const { ref, isShow, setIsShow } = useOutside(false);

	return (
		<DocumentMeta {...meta}>
			<div className={"site"}>
				<MobileMenu
					menuRef={ref}
					setMenuIsOpen={setIsShow}
					menuIsOpen={isShow}
				/>
				{!props.noTopPadding && <div className="no-top-padding" />}
				<Header
					burgerMenuIsShow={isShow}
					setBurgerMenuIsShow={setIsShow}
					image={props.headerImage}
					type={props.headerType ?? "white"}
					selectedLink={props.headerSelectedLink ?? "/"}
					mobileModalType="orderCall"
				/>
				<main>{props.children}</main>
				<Scroller />
				<Cookies />
			</div>
		</DocumentMeta>
	);
};

export default PersonalAccountLayout;
