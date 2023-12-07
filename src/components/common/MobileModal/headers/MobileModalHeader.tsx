import React, { Dispatch } from "react";
import { HeaderLogoImage } from "../../../layout/Header";

interface IProps {
	scheme?: "light" | "dark";
	setClose: Dispatch<boolean>;
}

const MobileModalHeader = (props: IProps) => {
	const { scheme, setClose } = props;

	return (
		<div className="mobile-modal_header-top">
			<button onClick={() => setClose(false)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none">
					<path
						d="M2.5 10L7.15447 5M2.5 10L7.15447 15M2.5 10H17.5"
						stroke="#222222"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<HeaderLogoImage
				width={"100px"}
				height={"24px"}
				image={scheme ?? "dark"}
			/>
			<button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none">
					<path
						d="M6.42228 1.73458C6.42228 1.73458 2.62874 1.31825 1.78573 2.56726C0.774119 8.89566 6.42228 14.0861 9.37281 15.8902C11.9018 17.278 16.9599 19.3875 17.6343 17.7221C18.4773 15.6404 18.4773 14.2249 18.0558 13.3922C17.7186 12.726 14.8524 11.588 13.5879 11.3105L11.9019 13.1424C9.87863 12.8093 7.26529 9.78387 6.42228 8.39606L8.1083 6.73069C8.1083 4.39917 6.98428 2.42848 6.42228 1.73458Z"
						fill="#222222"
					/>
					<path
						d="M14.8269 7.98351C14.6227 7.2798 14.2374 6.64236 13.7096 6.13526C13.1819 5.62817 12.5303 5.26928 11.8203 5.09468M18.3332 6.49972C18.0423 5.22554 17.361 4.07456 16.3849 3.20809C15.4087 2.34161 14.1866 1.80308 12.8898 1.66797"
						stroke="#222222"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</div>
	);
};

export default MobileModalHeader;
