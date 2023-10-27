import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setFilter } from "../../../store/reducers/filterSlice";
import { ButtonFilterData } from "../../../store/reducers/baseDataSlice";
import filterIcon from "../../../img/common/filter-icon.svg";
import { RentFilterDateValue } from "../RentPage";

export const ButtonSet: React.FC<{ data: ButtonFilterData }> = (props) => {
	const filter = useAppSelector((state) => state.filter);
	const dispatch = useAppDispatch();
	const updateFilter = (block: string, value) => {
		dispatch(setFilter({ ...filter, [block]: value }));
	};
	return (
		<div
			className={
				"d-flex mb-3 mb-md-0 gap-2 py-1 justify-content-start flex-wrap"
			}>
			<button
				onClick={() => updateFilter("new", 0)}
				className={
					"catalog__filter-btn " + (filter.new === 0 ? " selected" : "")
				}>
				Все
			</button>
			{props.data.values?.map((i, index) => (
				<button
					key={i.id}
					onClick={() => updateFilter("new", i.id)}
					className={
						"catalog__filter-btn " + (filter.new === i.id ? " selected" : "")
					}>
					{i.name}
				</button>
			))}
		</div>
	);
};
const FilterButtons: React.FC<{
	mode?: "book" | "rent";
	isShowMobileFiler: (e: boolean) => void;
	rentFilterData?: {
		free: RentFilterDateValue;
		tarif: RentFilterDateValue;
	} | null;
}> = ({ mode = "book", isShowMobileFiler, rentFilterData }) => {
	const [selectedState, setSelectedState] = useState("all");
	const [selectedClass, setSelectedClass] = useState("all");

	const filterList = useAppSelector((state) => state.baseData.top);
	const filter = useAppSelector((state) => state.filter);
	const dispatch = useAppDispatch();
	const updateFilter = (block: string, value) => {
		dispatch(setFilter({ ...filter, [block]: value }));
	};

	useEffect(() => {
		console.log(filter);
	}, [filter]);
	return (
		<div
			className={"d-lg-flex gap-3 justify-content-between mb-px-25 flex-wrap"}>
			{mode === "book" && (filterList?.new.values?.length ?? 0) > 0 && (
				<div className="d-flex justify-content-between align-items-center  mb-3 mb-md-0">
					<div className={"d-flex  gap-2 py-1 justify-content-start flex-wrap"}>
						<button
							onClick={() => updateFilter("new", 0)}
							className={
								"catalog__filter-btn " + (filter.new === 0 ? " selected" : "")
							}>
							Все
						</button>
						{filterList?.new.values?.map((i, index) => (
							<button
								key={i.id}
								onClick={() => updateFilter("new", i.id)}
								className={
									"catalog__filter-btn " +
									(filter.new === i.id ? " selected" : "")
								}>
								{i.name}
							</button>
						))}
					</div>
					{/* <FontAwesomeIcon
						className="d-block d-lg-none "
						onClick={() => isShowMobileFiler(true)}
						style={{ width: "20px", height: "26px" }}
						icon={faFilter}
					/> */}

					<div
						className="d-block d-lg-none "
						onClick={() => isShowMobileFiler(true)}>
						<img src={filterIcon} alt="" />
					</div>
				</div>
			)}
			{mode === "book" && (filterList?.special.values?.length ?? 0) > 0 && (
				<div
					className={
						"d-none d-lg-flex gap-2 py-1 justify-content-start flex-wrap"
					}>
					<button
						onClick={() => updateFilter("special", 0)}
						className={
							"catalog__filter-btn " +
							(filter.special === "" ? " selected" : "")
						}>
						Все
					</button>
					{filterList?.special.values?.map((i, index) => (
						<button
							key={i.id}
							onClick={() => updateFilter("special", i.id)}
							className={
								"catalog__filter-btn " +
								(filter.special === i.id ? " selected" : "")
							}>
							{i.name}
						</button>
					))}
				</div>
			)}

			{mode === "rent" && (filterList?.new.values?.length ?? 0) > 0 && (
				<div className="d-flex justify-content-between align-items-center  mb-3 mb-md-0">
					<div
						className={
							//mb-0 mb-md-3
							"d-flex  gap-2 py-1 justify-content-start flex-wrap"
						}>
						<button
							onClick={() => updateFilter("tarif", null)}
							className={
								"catalog__filter-btn " +
								(filter.tarif === null ? " selected" : "")
							}>
							Все
						</button>
						{rentFilterData?.tarif?.values?.map((i, index) => (
							<button
								key={i.id}
								onClick={() => updateFilter("tarif", i.id)}
								className={
									"catalog__filter-btn " +
									(filter.tarif === i.id ? " selected" : "")
								}>
								{i.name}
							</button>
						))}
					</div>
					<div
						className="d-block d-lg-none "
						onClick={() => isShowMobileFiler(true)}>
						<img src={filterIcon} alt="" />
					</div>
				</div>
			)}
			{mode === "rent" && (
				<div
					className={
						"catalog__filter-container d-none d-lg-flex gap-2 py-1 justify-content-start flex-wrap"
					}>
					<button
						onClick={() => updateFilter("tarif", null)}
						className={
							"catalog__filter-btn " +
							(filter.special === null ? " selected" : "")
						}>
						Все
					</button>

					{rentFilterData?.free?.values?.map((i, index) => (
						<button
							key={i.id}
							onClick={() => updateFilter("special", i.id)}
							className={
								"catalog__filter-btn " +
								(filter.special === i.id ? " selected" : "")
							}>
							{i.name}
						</button>
					))}
					{/* <button
						onClick={() => updateFilter("available", true)}
						className={
							"catalog__filter-btn " +
							(filter.available === true ? " selected" : "")
						}>
						Свободна
					</button>
					<button
						onClick={() => updateFilter("available", false)}
						className={
							"catalog__filter-btn " +
							(filter.available === false ? " selected" : "")
						}>
						Занята
					</button> */}
				</div>
			)}
		</div>
	);
};

export default FilterButtons;
