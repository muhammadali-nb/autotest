import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setFilter } from "../../../store/reducers/filterSlice";
import { ButtonFilterData } from "../../../store/reducers/baseDataSlice";
import filterIcon from "../../../images/common/filter-icon.svg";
import { FilterTopValues } from "../RentPage";
import { setCatalogFilter } from "../../../store/reducers/catalogFilterSlice";

export const ButtonSet: React.FC<{ data: ButtonFilterData }> = (props) => {
	const filter = useAppSelector((state) => state.filter);
	const dispatch = useAppDispatch();
	const updateRentFilter = (block: string, value) => {
		dispatch(setFilter({ ...filter, [block]: value }));
	};
	return (
		<div
			className={
				"d-flex mb-3 mb-md-0 gap-2 py-1 justify-content-start flex-wrap"
			}>
			<button
				onClick={() => updateRentFilter("new", 0)}
				className={
					"catalog__filter-btn " + (filter.new === 0 ? " selected" : "")
				}>
				Все
			</button>
			{props.data.values?.map((i, index) => (
				<button
					key={i.id}
					onClick={() => updateRentFilter("new", i.id)}
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
		free: FilterTopValues;
		tarif: FilterTopValues;
	} | null;
	catalogData?: {
		tags: FilterTopValues;
		new: FilterTopValues;
	} | null;
}> = ({ mode = "book", isShowMobileFiler, rentFilterData, catalogData }) => {
	const rentFilter = useAppSelector((state) => state.filter);
	const catalogFilter = useAppSelector((state) => state.catalogFilter);
	const dispatch = useAppDispatch();
	const updateRentFilter = (block: string, value) => {
		dispatch(setFilter({ ...rentFilter, [block]: value }));
	};

	const updateCatalogFilter = (block: string, value) => {
		dispatch(setCatalogFilter({ ...catalogFilter, [block]: value }));
	};

	return (
		<div
			className={"d-lg-flex gap-3 justify-content-between mb-px-25 flex-wrap"}>
			{mode === "book" && (
				<div className="d-flex justify-content-between align-items-center  mb-3 mb-md-0">
					<div className={"d-flex  gap-2 py-1 justify-content-start flex-wrap"}>
						<button
							onClick={() => updateCatalogFilter("condition", null)}
							className={
								"catalog__filter-btn " +
								(catalogFilter.condition === null ? " selected" : "")
							}>
							Все
						</button>
						{catalogData?.new?.values?.map((i, index) => (
							<button
								key={i.id}
								onClick={() => updateCatalogFilter("condition", i.id)}
								className={
									"catalog__filter-btn " +
									(catalogFilter.condition === i.id ? " selected" : "")
								}>
								{i.name}
							</button>
						))}
					</div>

					<div
						className="d-block d-lg-none mb-px-5 "
						onClick={() => isShowMobileFiler(true)}>
						<img src={filterIcon} alt="" />
					</div>
				</div>
			)}
			{mode === "book" && (catalogData?.tags?.values.length ?? 0) > 0 && (
				<div
					className={
						"d-none d-lg-flex gap-2 py-1 justify-content-start flex-wrap"
					}>
					<button
						onClick={() => updateCatalogFilter("tags", null)}
						className={
							"catalog__filter-btn " +
							(catalogFilter.tags === null ? " selected" : "")
						}>
						Все
					</button>
					{catalogData?.tags.values?.map((i, index) => (
						<button
							key={i.id}
							onClick={() => updateCatalogFilter("tags", i.id)}
							className={
								"catalog__filter-btn " +
								(catalogFilter.tags === i.id ? " selected" : "")
							}>
							{i.name}
						</button>
					))}
				</div>
			)}

			{mode === "rent" && (
				<div className="d-flex justify-content-between align-items-center  mb-3 mb-md-0">
					<div
						className={
							//mb-0 mb-md-3
							"d-flex  gap-2 py-1 justify-content-start flex-wrap"
						}>
						<button
							onClick={() => updateRentFilter("tarif", null)}
							className={
								"catalog__filter-btn " +
								(rentFilter.tarif === null ? " selected" : "")
							}>
							Все
						</button>
						{rentFilterData?.tarif?.values?.map((i) => (
							<button
								key={i.id}
								onClick={() => updateRentFilter("tarif", i.id)}
								className={
									"catalog__filter-btn " +
									(rentFilter.tarif === i.id ? " selected" : "")
								}>
								{i.name}
							</button>
						))}
					</div>
					<div
						className="d-block d-lg-none mb-px-5"
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
						onClick={() => updateRentFilter("special", null)}
						className={
							"catalog__filter-btn " +
							(rentFilter.special === null ? " selected" : "")
						}>
						Все
					</button>

					{rentFilterData?.free?.values?.map((i) => (
						<button
							key={i.id}
							onClick={() => updateRentFilter("special", i.id)}
							className={
								"catalog__filter-btn " +
								(rentFilter.special === i.id ? " selected" : "")
							}>
							{i.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default FilterButtons;
