import React, { useEffect, useState } from "react";
import CarCard from "../../common/CarCard";
import { useAppSelector } from "../../../store/hooks";
import Loader from "../../common/Loader";
import LoadError from "../../common/LoadError";
import Paginator from "../../common/Paginator";
import { BottomMessage, BottomMessageMobile } from "../CatalogPage";
import CarRequestForm from "../../common/CarRequestForm";
import { useQuery } from "@tanstack/react-query";
import catalogService from "../../../api-functions/catalog-page/catalog-service";
import { MobileModal } from "../../common/MobileModal/MobileModal";

const CarGrid: React.FC<{ loader?: () => void }> = (props) => {
	const [activePage, setActivePage] = useState("1");
	const [carFormModalMobile, setCarFormModalMobile] = useState(false);
	const filter = useAppSelector((state) => state.catalogFilter);
	const { data, error, isLoading } = useQuery({
		queryKey: ["rent-cars", { activePage, ...filter }],
		queryFn: () => catalogService.getCars(activePage, filter),
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
		<>
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

				<BottomMessageMobile
					text1={"Не нашли ничего подходящего?"}
					text2={"Предложите свой вариант!"}
					onClick={() => setCarFormModalMobile(true)}
				/>
				<div className={"catalog__grid-paginator"}>
					<Paginator setActive={setActivePage} data={data} />
				</div>
			</div>
			<MobileModal
				active={carFormModalMobile}
				setActive={setCarFormModalMobile}
			/>
		</>
	);
};

export default CarGrid;
