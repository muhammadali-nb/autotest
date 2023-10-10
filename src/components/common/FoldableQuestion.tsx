import React, { ReactNode, useState } from "react";
import { Collapse } from "react-bootstrap";
import circleDown from "./../../img/rent/circle-down.svg";
import circleUp from "./../../img/rent/circle-up.svg";

const FoldableQuestion: React.FC<{
	header: string | ReactNode;
	children: any;
	small?: boolean;
	mobile?: boolean;
}> = (props) => {
	const [open, setOpen] = useState(false);
	return (
		<div
			className={
				"foldable " +
				(props.small ? "foldable-small" : "") +
				(props.mobile ? "foldable-mobile" : "")
			}>
			<button className={"foldable-header"} onClick={() => setOpen(!open)}>
				<span>{props.header}</span>
				<div>
					{props.mobile ? (
						<svg
							// width="17"
							// height="17"
							viewBox="0 0 17 17"
							fill="none"
							className={
								"foldable-header-image_mobile " + (open ? "turned " : "")
							}
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M4.25 6.375L8.5 10.625L12.75 6.375"
								stroke="#222222"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : (
						<>
							{" "}
							<img
								src={open ? circleDown : circleUp}
								className={
									"d-none d-md-block " +
									"foldable-header-image " +
									(open ? "turned " : "") +
									(props.small ? "foldable-header-image-small" : "")
								}
								// style={{
								// 	width: "100%",
								// 	height: "100%",
								// }}
								alt={""}
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								className={
									"d-block d-md-none " +
									"foldable-header-image_mobile " +
									(open ? "turned " : "")
								}>
								<path
									d="M4.25 6.375L8.5 10.625L12.75 6.375"
									stroke="#222222"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</>
					)}
				</div>
			</button>
			<Collapse in={open}>
				<div>
					<div
						className={
							"foldable-content " + (props.small ? "" : "text-gray-color")
						}>
						{props.children}
					</div>
				</div>
			</Collapse>
		</div>
	);
};

export default FoldableQuestion;
