import React, { useEffect, useState } from "react";
import CatalogCarDetailBaseTable from "./CatalogCarDetailBaseTable/CatalogCarDetailBaseTable";

const CatalogCarDetailBase = () => {
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
					? [...new Array(4)].map((_item) => <CatalogCarDetailBaseTable />)
					: [...new Array(5)].map((_item) => <CatalogCarDetailBaseTable />)}
			</div>
		</div>
	);
};

export default CatalogCarDetailBase;
