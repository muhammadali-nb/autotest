import React from "react";

const CarDetailToolbar = ({ className }: { className?: string }) => {
	return (
		<div className={"d-flex  " + className}>
			<button className="car_detail-info_btn-like me-px-15">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_8564_147645)">
						<path
							d="M9.7843 1.86106C9.88073 1.6955 10.1199 1.69549 10.2164 1.86106L12.6327 6.00963C12.88 6.43418 13.2943 6.73523 13.7745 6.83921L18.4667 7.85529C18.654 7.89585 18.7279 8.12333 18.6002 8.2662L15.4014 11.8462C15.074 12.2126 14.9158 12.6997 14.9652 13.1885L15.4489 17.9651C15.4682 18.1557 15.2747 18.2963 15.0993 18.219L10.706 16.283L10.4036 16.9694L10.706 16.283C10.2564 16.0849 9.74424 16.0849 9.29464 16.283L4.90133 18.219C4.72599 18.2963 4.53249 18.1557 4.55179 17.9651L5.03541 13.1885C5.0849 12.6997 4.92663 12.2126 4.59927 11.8462L1.40043 8.2662C1.27277 8.12333 1.34668 7.89585 1.53395 7.85529L6.22615 6.83921C6.70634 6.73523 7.1207 6.43418 7.36798 6.00963L9.7843 1.86106Z"
							stroke="#222222"
							strokeWidth="1.5"
						/>
					</g>
					<defs>
						<clipPath id="clip0_8564_147645">
							<rect width="20" height="20" fill="white" />
						</clipPath>
					</defs>
				</svg>
				В Избранное
			</button>
			<button className="car_detail-info_btn-share">
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 2.5L10 12.5M10 2.5L13.3552 5.83333M10 2.5L6.64479 5.83333M2.5 11.9247V15.496C2.5 16.3727 3.207 17.0833 4.07913 17.0833H15.9209C16.793 17.0833 17.5 16.3727 17.5 15.496V11.9247"
						stroke="#222222"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				Поделиться
			</button>
		</div>
	);
};

export default CarDetailToolbar;
