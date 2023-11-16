import React, { useEffect, useState } from "react";
import CarCard from "../../common/CarCard";
import { useAppSelector } from "../../../store/hooks";
import Api, { CatalogResponse, ErrorResponse } from "../../../Api";
import { useSearchParams } from "react-router-dom";
import Loader from "../../common/Loader";
import LoadError from "../../common/LoadError";
import Paginator from "../../common/Paginator";
import { BottomMessage } from "../CatalogPage";
import CarRequestForm from "../../common/CarRequestForm";
import chevron from "../../../img/common/footer/chevron-for-bottom.svg";
import { useQuery } from "@tanstack/react-query";
import catalogService from "../../../api-functions/catalog-page/catalog-service";

const CarGrid: React.FC<{ loader?: () => void }> = (props) => {
	const [cars, setCars] = useState<CatalogResponse | ErrorResponse | undefined>(
		undefined
	);
	const [activePage, setActivePage] = useState("1");
	const filter = useAppSelector((state) => state.filter);

	const { data, error, isLoading } = useQuery({
		queryKey: ["rent-cars", { activePage, ...filter }],
		queryFn: () => catalogService.getCars(activePage, filter),
	});

	const [query, setQuery] = useSearchParams();
	const [timer, setTimer] = useState<NodeJS.Timeout>();
	useEffect(() => {
		const fetchCarData = async () => {
			setCars(undefined);
			console.log("fetching cars...");
			let carData = await Api.catalog(filter, query);
			setCars(carData);
		};
		if (!cars) fetchCarData();
		else {
			clearTimeout(timer);
			setTimer(setTimeout(fetchCarData, 1000));
		}
	}, [filter, query]);

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
						<CarCard responsive={true} car={i} key={index} />
					))}
			</div>
			<BottomMessage
				className="bottom-message-desc"
				button={<CarRequestForm text={"Оставить заявку"} light />}
				text1={"Не нашли ничего подходящего?"}
				text2={"Предложите свой вариант!"}
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
				text1={"Не нашли ничего подходящего?"}
				text2={"Предложите свой вариант!"}
			/>

			<div className={"catalog__grid-paginator"}>
				<Paginator setActive={setActivePage} data={data} />
			</div>
		</div>
	);
};

export default CarGrid;
