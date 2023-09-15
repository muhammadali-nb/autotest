import React, { useEffect, useState } from "react";
import IndexCalculatorSlider from "./IndexCalculatorSlider";
import Animator from "../../../Animator";

type IndexCalculatorProps = {
	hidePrice?: boolean;
	noAnim?: boolean;
	price?: number;
	maxPrice?: number;
	minPrice?: number;
	priceStep?: number;
	prepaid?: number;
	maxPrepaid?: number;
	minPrepaid?: number;
	prepaidStep?: number;
	time?: number;
	maxTime?: number;
	minTime?: number;
	daysInMonth?: number;
	fontBold?: boolean;
	smallValue?: boolean;
	wideSpace?: boolean;
	calculateInterestRate?: (values: IndexCalculatorValues) => number;
};

type IndexCalculatorValues = {
	price: number;
	prepaid: number;
	minPrepaid: number;
	maxPrepaid: number;
	localMaxPrepaid: number;
	time: number;
};

function defaultCalculateInterest(values: IndexCalculatorValues) {
	return values.prepaid > 150000 ? 0.013 : 0.011;
}

const IndexCalculatorPeriodIndicator: React.FC<{
	amount: number;
	suffix?: string;
	comment?: string;
	right?: boolean;
	bold?: boolean;
}> = (props) => {
	return (
		<div
			className={
				"indexCalculatorPeriodIndicator" +
				(props.right ? " text-end" : "") +
				(props.bold ? " font-weight-medium" : "")
			}>
			{props.amount.toLocaleString()}
			{props.suffix ?? ""}
			<span
				className={
					"indexCalculatorPeriodIndicatorComment" +
					(props.bold ? " font-weight-medium" : "")
				}>
				{props.comment ?? ""}
			</span>
		</div>
	);
};

const IndexCalculator: React.FC<IndexCalculatorProps> = (props) => {
	const [values, setValues] = useState<IndexCalculatorValues>({
		price: props.price ?? 3000000,
		prepaid: props.prepaid ?? 300000,
		minPrepaid: props.minPrepaid ?? 100000,
		maxPrepaid: props.maxPrepaid ?? 5000000,
		localMaxPrepaid: props.maxPrepaid ?? 10000000,
		time: props.time ?? 24,
	});
	useEffect(function () {
		if (!props.noAnim) {
			Animator.animateOnShow(
				"logo_calc",
				[{ id: "logo_calc", delay: 500 }],
				false
			);
		}
	}, []);

	const monthSum = () => {
		let base = values.price - values.prepaid;
		let interestRate = props.calculateInterestRate
			? props.calculateInterestRate(values)
			: defaultCalculateInterest(values);
		return Math.round(base / values.time + base * interestRate);
	};
	const daySum = () => {
		return Math.round(monthSum() / (props.daysInMonth ?? 30));
	};

	const handleUpdate = (value) => {
		let newValue: IndexCalculatorValues = { ...values, ...value };
		newValue.localMaxPrepaid = newValue.maxPrepaid;
		if (newValue.price < newValue.localMaxPrepaid)
			newValue.localMaxPrepaid = newValue.price;
		if (newValue.prepaid > newValue.localMaxPrepaid)
			newValue.prepaid = newValue.localMaxPrepaid;
		setValues(newValue);
	};

	return (
		<div
			className={
				"d-flex align-items-center justify-content-center flex-column w-100" +
				(props.noAnim ? "" : " anim-enter-bottom-2")
			}
			id={"logo_calc"}>
			{!props.hidePrice && (
				<IndexCalculatorSlider
					wideSpace={props.wideSpace}
					className={"calculator-slider w-100 "}
					max={props.maxPrice ?? 10000000}
					min={props.minPrice ?? 1500000}
					step={props.priceStep ?? 50000}
					value={values.price}
					label={"Стоимость автомобиля"}
					valueSuffix={" ₽"}
					onChange={(e) => handleUpdate({ price: e })}
				/>
			)}
			<IndexCalculatorSlider
				wideSpace={props.wideSpace}
				className={"w-100 calculator-slider "}
				min={values.minPrepaid}
				max={values.localMaxPrepaid}
				step={props.prepaidStep ?? 5000}
				value={values.prepaid}
				onChange={(e) => handleUpdate({ prepaid: e })}
				label={"Первый взнос"}
				valueSuffix={" ₽"}
				labelClass={props.fontBold ? "font-weight-medium" : ""}
				valueClass={
					props.fontBold
						? "font-weight-medium"
						: "" + (props.smallValue ? " font-size-20" : "")
				}
			/>
			<IndexCalculatorSlider
				wideSpace={props.wideSpace}
				className={"w-100  calculator-slider"}
				min={props.minTime ?? 3}
				max={props.maxTime ?? 60}
				step={1}
				value={values.time}
				onChange={(e) => handleUpdate({ time: e })}
				label={"Срок"}
				valueSuffix={" мес."}
				labelClass={props.fontBold ? "font-weight-medium" : ""}
				valueClass={
					props.fontBold
						? "font-weight-medium"
						: "" + (props.smallValue ? " font-size-20" : "")
				}
			/>
			<div className={"d-flex w-100 justify-content-between mt-px-20"}>
				<IndexCalculatorPeriodIndicator
					amount={daySum()}
					suffix={" ₽"}
					comment={" в сутки"}
					bold={props.fontBold}
				/>
				<IndexCalculatorPeriodIndicator
					amount={monthSum()}
					suffix={" ₽"}
					comment={" в месяц"}
					bold={props.fontBold}
				/>
			</div>
		</div>
	);
};

export default IndexCalculator;
