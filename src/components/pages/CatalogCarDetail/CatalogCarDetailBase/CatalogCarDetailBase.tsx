import React, { useEffect, useState } from "react";
import CatalogCarDetailBaseTable from "./CatalogCarDetailBaseTable/CatalogCarDetailBaseTable";

type ICatalogCarEquipment = {
	id: number;
	header: string;
	list: Array<{ name: string; value?: string; id: number }>;
};

interface IProps {
	technical_equipments: ICatalogCarEquipment[];
	standart_equipments: ICatalogCarEquipment[];
}

const CatalogCarDetailBase = ({
	technical_equipments,
	standart_equipments,
}: IProps) => {
	const [page, setPage] = useState<"technical" | "standart">("technical");

	return (
		<div className="car_detail-base">
			<div className="car_detail-base_header">
				{window.innerWidth > 767 ? (
					<>
						<h3
							className={page === "technical" ? "active" : ""}
							onClick={() => setPage("technical")}>
							Технические характеристики
						</h3>
						<h3
							className={page === "standart" ? "active" : ""}
							onClick={() => setPage("standart")}>
							Стандартное оборудование
						</h3>
					</>
				) : (
					<>
						<h3
							className={page === "technical" ? "active" : ""}
							onClick={() => setPage("technical")}>
							Тех. характеристики
						</h3>
						<h3
							className={page === "standart" ? "active" : ""}
							onClick={() => setPage("standart")}>
							Комплектация
						</h3>
					</>
				)}
			</div>
			<div>
				{page === "technical"
					? technical_equipments.map((_item) => (
							<CatalogCarDetailBaseTable type="tech" data={_item} />
					  ))
					: standart_equipments.map((_item) => (
							<CatalogCarDetailBaseTable type="standart" data={_item} />
					  ))}
			</div>
		</div>
	);
};

export default CatalogCarDetailBase;
