import React, { ReactNode, useState } from "react";
import { Collapse } from "react-bootstrap";
import circle from "./../../img/rent/circle-arrow.svg";
import circleUp from "./../../img/rent/circle-down.svg";

const FoldableQuestion: React.FC<{
	header: string | ReactNode;
	children: any;
	small?: boolean;
}> = (props) => {
	const [open, setOpen] = useState(false);
	return (
		<div className={"foldable " + (props.small ? "foldable-small" : "")}>
			<button className={"foldable-header"} onClick={() => setOpen(!open)}>
				<span>{props.header}</span>
				<div style={{ width: "18px", height: "18px" }}>
					<img
						src={open ? circleUp : circle}
						className={
							"foldable-header-image " +
							(open ? "turned " : "") +
							(props.small ? "foldable-header-image-small" : "")
						}
						style={{
							width: "100%",
							height: "100%",
						}}
						alt={""}
					/>
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
