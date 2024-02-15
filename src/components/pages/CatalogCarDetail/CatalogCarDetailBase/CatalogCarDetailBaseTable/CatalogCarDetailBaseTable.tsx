import React from "react";

interface IProps {
	type: "tech" | "standart";
	data: {
		header: string;
		list: Array<{
			name: string;
			value?: string;
			id: number;
		}>;
	};
}

const CatalogCarDetailBaseTable = ({ type, data }: IProps) => {
	return (
		<div className="car_detail-base_table">
			<h4 className="car_detail-base_table_header">{data.header}</h4>

			{data.list.map((_item) => (
				<div className="car_detail-base_table_row">
					<div
						className={
							"car_detail-base_table_row-left " +
							(type === "standart" ? "standart" : "")
						}>
						{_item?.name}
					</div>
					<div className="car_detail-base_table_row-right">{_item?.value}</div>
				</div>
			))}
		</div>
	);
};

export default CatalogCarDetailBaseTable;
