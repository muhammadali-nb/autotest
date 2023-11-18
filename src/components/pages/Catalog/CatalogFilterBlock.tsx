import React, { ChangeEvent, useEffect, useState } from "react";
import DoubleSlider from "../../common/DoubleSlider";
import { Collapse, FormCheck } from "react-bootstrap";
import caretUp from "./../../../images/common/caret-up-gray.png";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
	BaseState,
	CheckboxFilterData,
	FilterSharesData,
	IdValued,
	ModelCheckboxFilterData,
	SliderFilterData,
} from "../../../store/reducers/baseDataSlice";
import caret from "./../../../images/common/caret-right.png";
import Utils from "../../../utils/Utils";
import { setCatalogFilter } from "../../../store/reducers/catalogFilterSlice";

const Filter: React.FC<{
	header: string;
	children?: any;
	small?: boolean;
	open?: boolean;
	showCaret?: boolean;
}> = (props) => {
	const [open, setOpen] = useState<boolean>(props.open ?? false);
	return (
		<div className={"filter__block " + (props.small ? "small" : "")}>
			<button
				className={"filter__block-header " + (open ? "open" : "")}
				onClick={() => setOpen(!open)}>
				{props.header}
				{(props.showCaret ?? true) && (
					<img src={caretUp} alt={""} className={"arrow"} />
				)}
			</button>
			<Collapse in={open}>
				<div>{props.children ?? ""}</div>
			</Collapse>
		</div>
	);
};

const FilterRange: React.FC<{
	header: string;
	data: SliderFilterData;
	field: string;
	min: number;
	max: number;
	// values: number[];
	// setValues: (e: number[]) => void;
	// onChange: any;
}> = (props) => {
	const [values, setValues] = useState([props.min, props.max]);
	const dispatch = useAppDispatch();
	const filter = useAppSelector((state) => state.catalogFilter);
	const updateFilter = (arg: Array<number>) => {
		setValues(arg);
		dispatch(
			setCatalogFilter({
				...filter,
				[props.field]: { from: arg[0], to: arg[1] },
			})
		);
	};

	return (
		<Filter header={props.header} open={props.data.open ?? false}>
			<div className={"d-flex justify-content-between mb-2 gap-3 pt-px-20"}>
				<input
					className={
						"contacts__form-input small bg-transparent filter-block-input"
					}
					value={values[0]}
					min={props.min}
					max={props.max ?? props.max}
					name="min"
					onChange={(e) =>
						setValues([Number.parseInt(e.target.value), values[1]])
					}
					type={"number"}
				/>
				<input
					className={
						"contacts__form-input small bg-transparent filter-block-input"
					}
					value={values[1]}
					min={props.min}
					max={props.max}
					name="max"
					onChange={(e) =>
						// updateFilter(values[0], Number.parseInt(e.target.value))
						setValues([values[0], Number.parseInt(e.target.value)])
					}
					type={"number"}
				/>
			</div>
			<DoubleSlider
				min={props.min}
				max={props.max}
				pearling
				onChange={setValues}
				value={values}
				onAfterChange={updateFilter}
				// onSliderClick={updateFilter}
				// onChangeonBeforeChange={(e) => updateFilter(values[0], values[1])}
			/>
			{/* <div className={"d-flex justify-content-between mb-2 gap-3 pt-px-20"}>
				<input
					className={
						"contacts__form-input small bg-transparent filter-block-input"
					}
					value={props.value1 ?? props.min}
					min={props.min}
					max={props.value2 ?? props.max}
					onChange={(e) => {
						props.onChange([Number.parseInt(e.target.value), props.value2]);
					}}
					type={"number"}
				/>
				<input
					className={
						"contacts__form-input small bg-transparent filter-block-input"
					}
					value={props.value2 ?? props.max}
					min={props.value1 ?? props.min}
					max={props.max}
					onChange={(e) => {
						props.onChange([props.value1, Number.parseInt(e.target.value)]);
					}}
					type={"number"}
				/>
			</div>
			<DoubleSlider
				min={props.min}
				max={props.max}
				pearling
				onChange={(values) => props.onChange(values)}
				defaultValue={[props.value1 ?? props.min, props.value2 ?? props.max]}
			/> */}
		</Filter>
	);
};

const FilterCheckbox: React.FC<{
	field: string;
	data: CheckboxFilterData;
	onChange: any;
}> = ({ field, data, onChange }) => {
	const filter = useAppSelector((state) => state.catalogFilter);
	const dispatch = useAppDispatch();
	const setCatalogFilterValue = (value: number) => {
		let data = [...filter[field]];
		var index = data.indexOf(value);
		if (index !== -1) {
			data.splice(index, 1);
		} else {
			data.push(value);
		}
		dispatch(setCatalogFilter({ ...filter, [field]: data }));
	};
	const clear = () => {
		dispatch(setCatalogFilter({ ...filter, [field]: [] }));
	};
	return (
		<Filter header={data.name} open={data.open ?? false}>
			<div>
				<FormCheck
					label={"Все"}
					className={" font-size-14 font-weight-semibold"}
					checked={filter[field]?.length === 0}
					onChange={(e) => clear()}
				/>
				{data.values?.map((i: any, index) => (
					<FormCheck
						key={i.id}
						label={i.name}
						className={"font-size-14 text-default font-weight-semibold"}
						onChange={(e) => setCatalogFilterValue(i.id)}
						checked={filter[field]?.includes(i.id)}
					/>
				))}
			</div>
		</Filter>
	);
};

const FilterModelSet: React.FC<{
	field: string;
	brand: IdValued | any;
	data: ModelCheckboxFilterData;
}> = ({ field, data, brand }) => {
	const filter: any = useAppSelector((state) => state.catalogFilter);

	const [models, setModels] = useState<any>(
		data.values?.filter((i) => i.brand === brand.brand) ?? []
	);

	function sortIntoArrays(arr): any {
		const sortedObj = arr.reduce((acc, curr) => {
			if (!acc[curr.brand]) {
				acc[curr.brand] = [];
			}
			acc[curr.brand].push(curr);
			return acc;
		}, {});
		return Object.values(sortedObj);
	}

	const [showAmount, setShowAmount] = useState(5);
	const dispatch = useAppDispatch();
	const setCatalogFilterValue = (value: number) => {
		let data = [...filter[field]];
		var index = data.indexOf(value);
		if (index !== -1) {
			data.splice(index, 1);
		} else {
			data.push(value);
		}
		dispatch(setCatalogFilter({ ...filter, [field]: data }));
	};

	return (
		<>
			<p>{"hello world"}</p>
			{/* {sortIntoArrays(data.values).map((_item) => (
				// <p>{_item[0].name}</p>
				<Filter
					header={_item[0].brand}
					small={true}
					open={false}
					showCaret={false}>
					<div>
						{_item.slice(0, showAmount).map((i, index) => (
							<FormCheck
								key={index}
								label={i.name}
								className={" font-size-14 font-weight-semibold"}
								// onChange={(e) => setCatalogFilterValue(i.id)}
								// checked={filter[field]?.includes(i.id)}
							/>
						))}
						{showAmount < _item.length && (
							<button
								className={"small-black-btn"}
								onClick={() => setShowAmount(showAmount + 10)}>
								Ещё{" "}
								{Utils.textFromCount(
									_item.length - showAmount,
									["результат", "результата", "результатов"],
									true
								)}
							</button>
						)}
					</div>
				</Filter>
			))} */}
			{/* <Filter header={brand.brand} small={true} open={true} showCaret={false}>
				<div>
					{models.slice(0, showAmount).map((i, index) => (
						<FormCheck
							key={index}
							label={i.name}
							className={" font-size-14 font-weight-semibold"}
							onChange={(e) => setCatalogFilterValue(i.id)}
							checked={filter[field]?.includes(i.id)}
						/>
					))}
					{showAmount < models.length && (
						<button
							className={"small-black-btn"}
							onClick={() => setShowAmount(showAmount + 10)}>
							Ещё{" "}
							{Utils.textFromCount(
								models.length - showAmount,
								["результат", "результата", "результатов"],
								true
							)}
						</button>
					)}
				</div>
			</Filter> */}
		</>
	);
};

const FilterModels: React.FC<{
	field: string;
	data: ModelCheckboxFilterData;
	onChange: any;
}> = ({ field, data, onChange }) => {
	const filter = useAppSelector((state) => state.catalogFilter);
	const dispatch = useAppDispatch();
	const [showAmount, setShowAmount] = useState(5);

	useEffect(() => {
		console.log(filter);
	}, [filter]);

	const clear = () => {
		dispatch(setCatalogFilter({ ...filter, [field]: [] }));
	};

	const sortIntoArrays = (arr) => {
		const sortedObj = arr.reduce((acc, curr) => {
			if (!acc[curr.brand]) {
				acc[curr.brand] = [];
			}
			acc[curr.brand].push(curr);
			return acc;
		}, {});
		return Object.values(sortedObj);
	};

	const setCatalogFilterValue = (value: number) => {
		let data = [...filter[field]];
		var index = data.indexOf(value);
		if (index !== -1) {
			data.splice(index, 1);
		} else {
			data.push(value);
		}
		dispatch(setCatalogFilter({ ...filter, [field]: data }));
	};

	return (
		<Filter header={data.name} open={data.open ?? false}>
			<div>
				<FormCheck
					label={"Все"}
					checked={filter[field]?.length === 0}
					onChange={(e) => clear()}
					className={"font-size-14 font-weight-semibold"}
				/>
				<>
					{sortIntoArrays(data.values).map((_item: any, index) => (
						<Filter
							header={_item[0].brand}
							small={true}
							open={true}
							showCaret={false}
							key={index}>
							<div>
								{_item.slice(0, showAmount).map((i, index) => (
									<FormCheck
										key={index}
										label={i.name}
										className={" font-size-14 font-weight-semibold"}
										onChange={(e) => setCatalogFilterValue(i.id)}
										checked={filter[field]?.includes(i.id)}
									/>
								))}
								{showAmount < _item.length && (
									<button
										className={"small-black-btn"}
										onClick={() => setShowAmount(showAmount + 10)}>
										Ещё{" "}
										{Utils.textFromCount(
											_item.length - showAmount,
											["результат", "результата", "результатов"],
											true
										)}
									</button>
								)}
							</div>
						</Filter>
					))}
				</>
			</div>
		</Filter>
	);
};

const FilterShares = ({
	data,
	// open,
	name,
	onChange,
}: {
	data: FilterSharesData;
	name: string;

	onChange: (e: any) => void;
}) => {
	const filter = useAppSelector((state) => state.catalogFilter);
	const dispatch = useAppDispatch();
	const updateFilter = (block: string, value) => {
		dispatch(setCatalogFilter({ ...filter, [block]: value }));
	};
	return (
		<Filter header={data.name} open={data.open}>
			<div className={"d-flex  gap-2 pt-px-15 justify-content-start flex-wrap"}>
				<button
					onClick={() => updateFilter("new", 0)}
					className={
						"catalog__filter-btn " +
						(filter.condition === null ? " selected" : "")
					}>
					Все
				</button>
				{data.values?.map((i, index) => (
					<button
						key={i.id}
						onClick={() => updateFilter("new", i.id)}
						className={
							"catalog__filter-btn " +
							(filter.condition === i.id ? " selected" : "")
						}>
						{i.name}
					</button>
				))}
			</div>
		</Filter>
	);
};

export const FilterCommon: React.FC<{
	field: string;
	data:
		| CheckboxFilterData
		| SliderFilterData
		| ModelCheckboxFilterData
		| FilterSharesData;
}> = (props) => {
	const filter = useAppSelector((state) => state.catalogFilter);
	const dispatch = useAppDispatch();
	const setCatalogFilterValue = (key: string, value: any) => {
		dispatch(setCatalogFilter({ ...filter, [key]: value }));
	};
	if (props.data.type === "shares") {
		return (
			<FilterShares
				name={props.data.name}
				data={props.data as FilterSharesData}
				onChange={(v) => {
					setCatalogFilterValue(props.field, v);
				}}
			/>
		);
	}
	if (props.data.type === "slider2") {
		let d = props.data as SliderFilterData;
		return (
			<FilterRange
				header={d.name}
				data={d}
				min={d.from ?? 0}
				max={d.to ?? 100}
				field={props.field}
			/>
		);
	}
	if (props.data.type === "checkbox") {
		return (
			<FilterCheckbox
				field={props.field}
				data={props.data as CheckboxFilterData}
				onChange={(v) => {
					setCatalogFilterValue(props.field, v);
				}}
			/>
		);
	}
	return (
		<FilterModels
			field={props.field}
			data={props.data as ModelCheckboxFilterData}
			onChange={(v) => {
				setCatalogFilterValue(props.field, v);
			}}
		/>
	);
};
export const CatalogFiltersBlock: React.FC<{ filterData?: BaseState }> = ({
	filterData,
}) => {
	const [open, setOpen] = useState(false);

	return (
		<div className={"filters-block" + (open ? " open" : "")}>
			<button
				className={"filters-block-open-btn"}
				onClick={() => setOpen(!open)}>
				<img src={caret} alt={""} />
			</button>
			<div className={"filters-block-content"}>
				{filterData &&
					Object.entries(filterData.left)
						.filter(([key, value]) => value.type !== "shares")
						.map(([key, value]) => (
							<FilterCommon field={key} key={key} data={value} />
						))}
			</div>
		</div>
	);
};

export default CatalogFiltersBlock;
