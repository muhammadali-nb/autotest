import React from "react";
import { StatBlock, StatBlockItem } from "../../common/CarCard";
import { Container } from "react-bootstrap";

export interface CarStatBlockProps {
	column1Width?: number | string;
	column2Width?: number | string;
	dotted?: boolean;
	data: Array<StatBlock>;
}

export const CarStatBlockItem: React.FC<{
	settings: CarStatBlockProps;
	data: StatBlockItem;
}> = ({ settings, data }) => {
	return (
		<>
			<div className={"car-stat-block-item-name"}>
				<div>{data.name}</div>
				<div
					className={
						"car-stat-block-item-filler" + (settings.dotted ? " dotted" : "")
					}></div>
			</div>
			<div className={"car-stat-block-item-value"}>{data.value}</div>
		</>
	);
};

export const CarStatBlockItemMob = ({
	data,
	id,
}: {
	id: number;
	data: StatBlockItem;
}) => {
	return (
		<div
			className={"car-stat-block-item_mobile " + (id % 2 === 0 ? "gray" : "")}>
			<div>{data.name}</div>
			<div>{data.value}</div>
		</div>
	);
};

export const CarStatBlockEntry: React.FC<{
	settings: CarStatBlockProps;
	block?: StatBlock;
	children?: any;
}> = ({ settings, block, children }) => {
	const style: React.CSSProperties = {
		gridTemplateColumns:
			(settings.column1Width ?? "2fr") + " " + (settings.column2Width ?? "1fr"),
	};
	return (
		<>
			<div className={"d-none d-md-block car-stat-block"}>
				{block && <div className={"car-stat-block-header"}>{block.name}</div>}
				<div className={"car-stat-block-list"} style={style}>
					{block?.list.map((item, index) => (
						<CarStatBlockItem key={index} data={item} settings={settings} />
					))}
					{!block && children}
				</div>
			</div>
			<div className={"d-block d-md-none mb-px-15 car-stat-block_mobile"}>
				{block && <div className={"car-stat-block-header"}>{block.name}</div>}
				<div className={"car-stat-block-list_mobile"}>
					{block?.list.map((item, index) => (
						<CarStatBlockItemMob id={index + 1} key={index} data={item} />
					))}
					{!block && children}
				</div>
			</div>
		</>
	);
};

export const CarStatBlock: React.FC<CarStatBlockProps> = (props) => {
	return (
		<div className={"car-stat-block-container"}>
			{props.data.map((block, index) => (
				<CarStatBlockEntry key={index} settings={props} block={block} />
			))}
		</div>
	);
};

export default CarStatBlock;
