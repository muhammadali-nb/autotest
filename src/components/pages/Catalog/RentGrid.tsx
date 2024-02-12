import React, { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { Link } from "react-router-dom";
import { CarRentCard } from "../../common/CarCard";
import Loader from "../../common/Loader";
import LoadError from "../../common/LoadError";
import { useQuery } from "@tanstack/react-query";
import rentService from "../../../api-functions/rent-page/rent-service";
import RentPaginator from "../../common/Rent/RentPaginator";
import { MobileModal } from "../../common/MobileModal/MobileModal";
import RentCarCard from "../UpdatedRent/RentCarCard/RentCarCard";

const RentGrid: React.FC<{
	loader?: () => void;
	activePage: number;
}> = ({ activePage }) => {
	const filter: any = useAppSelector((state) => state.filter);
	const [carFormModalMobile, setCarFormModalMobile] = useState(false);
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
				style={{ minHeight: "60vh" }}>
				<em>Поиск по выбранным Вами параметрам не вернул результатов</em>
			</div>
		);
	return (
		<>
			<div>
				<div className={"catalog__grid"}>
					{/* {!isLoading &&
						data.list.map((i) => (
							<Link
								key={i.id}
								to={`/rent/page/${activePage}/car/${i.id}`}
								style={{ textDecoration: "none" }}>
								<CarRentCard car={i} />
							</Link>
						))} */}
					<RentCarCard />
				</div>
				<div className={"catalog__grid-paginator"}>
					<RentPaginator activePage={activePage} data={!isLoading && data} />
				</div>
			</div>
			<MobileModal
				active={carFormModalMobile}
				setActive={setCarFormModalMobile}
			/>
		</>
	);
};

export default RentGrid;
