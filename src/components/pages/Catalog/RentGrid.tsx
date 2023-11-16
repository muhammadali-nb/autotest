import React, { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import {
	Link,
	useLocation,
	useNavigate,
	useSearchParams,
} from "react-router-dom";
import { CarRentCard } from "../../common/CarCard";
import Loader from "../../common/Loader";
import LoadError from "../../common/LoadError";
import { BottomMessage } from "../CatalogPage";
import Paginator from "../../common/Paginator";
import CarRequestForm from "../../common/CarRequestForm";
import chevron from "../../../img/common/footer/chevron-for-bottom.svg";
import { useQuery } from "@tanstack/react-query";
import rentService from "../../../api-functions/rent-page/rent-service";
import RentPaginator from "../../common/Rent/RentPaginator";

const RentGrid: React.FC<{
	loader?: () => void;
	activePage: number;
}> = ({ activePage }) => {
	const filter: any = useAppSelector((state) => state.filter);
	const { data, error, isLoading } = useQuery({
		queryKey: ["rent-cars", { activePage, ...filter }],
		queryFn: () => rentService.getCars(activePage, filter),
	});

	if (isLoading) return <Loader />;
	if (error) return <LoadError response={data} />;
	if (data.list.length === 0)
		return (
			<div
				className={"d-flex w-100 text-center text-muted align-items-center"}
				style={{ minHeight: "40vh" }}>
				<em>Поиск по выбранным Вами параметрам не вернул результатов</em>
			</div>
		);
	return (
		<div>
			<div className={"catalog__grid"}>
				{!isLoading &&
					data.list.map((i, index) => (
						<Link
							key={i.id}
							to={`/rent/page/${activePage}/car/${i.id}`}
							style={{ textDecoration: "none" }}>
							<CarRentCard car={i} />
						</Link>
					))}
			</div>
			<BottomMessage
				className="bottom-message-desc"
				button={<CarRequestForm text={"Оставить заявку"} light />}
				text1={"Нужен автомобиль в собственность?"}
				text2={"Подумайте о Лизинге!"}
			/>
			<BottomMessage
				className="bottom-message-mobile"
				button={
					<CarRequestForm
						icon={<img src={chevron} />}
						text={"Оставить заявку"}
						light
					/>
				}
				text1={"Нужен автомобиль в собственность?"}
				text2={"Подумайте о Лизинге!"}
			/>

			<div className={"catalog__grid-paginator"}>
				<RentPaginator activePage={activePage} data={!isLoading && data} />
			</div>
		</div>
	);
};

export default RentGrid;
