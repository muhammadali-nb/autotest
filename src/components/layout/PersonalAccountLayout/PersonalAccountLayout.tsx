import React, { ReactNode, useEffect, useState } from "react";
import Header, { HeaderImage, HeaderType } from "../Header";
import Scroller from "../../common/Scroller";
import Api from "../../../Api";
import DocumentMeta from "react-document-meta";
import Cookies from "../../common/Cookies";
import { useOutside } from "../../../hooks/useOutside";
import PersonalAccountMenuMobile from "../../pages/PersonalAccount/PersonalAccountMenuMobile";
import PersonalAccountMenuBurger from "../../common/PersonalAccount/PersonalAccountMenuBurger/PersonalAccountMenuBurger";

export type MetaTags = {
	description?: string;
	keywords?: string;
};
export type CatalogLayoutProps = {
	children?: ReactNode;
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
	mainMobileMenu: (arg: boolean) => void;
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
	// for menu personal account
	const { ref, isShow, setIsShow } = useOutside(false);

	return (
		<>
			<DocumentMeta {...meta}>
				<div className={"site"}>
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
					<PersonalAccountMenuBurger onClick={() => setIsShow(!isShow)} />
					<Scroller />
					<Cookies />
				</div>
			</DocumentMeta>
			<PersonalAccountMenuMobile
				menuIsOpen={isShow}
				setMenuIsOpen={setIsShow}
				menuRef={ref}
				setMainMenu={props.mainMobileMenu}
			/>
		</>
	);
};

export default PersonalAccountLayout;
