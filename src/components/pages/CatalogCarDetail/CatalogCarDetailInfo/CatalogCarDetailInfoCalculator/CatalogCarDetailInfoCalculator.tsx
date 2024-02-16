import React, { useEffect, useState } from "react";
import IndexCalculatorSlider from "../../../Index/IndexCalculatorSlider";
import { IndexCalculatorProps } from "../../../Index/IndexCalculator";

type IndexCalculatorValues = {
	price: number;
	prepaid: number;
	minPrepaid: number;
	maxPrepaid: number;
	localMaxPrepaid: number;
	time: number;
};

const CatalogCarDetailInfoCalculator = (props: IndexCalculatorProps) => {
	const [values, setValues] = useState<IndexCalculatorValues>({
		price: props.price ?? 3000000,
		prepaid: props.prepaid ?? 300000,
		minPrepaid: props.minPrepaid ?? 100000,
		maxPrepaid: props.maxPrepaid ?? 5000000,
		localMaxPrepaid: props.maxPrepaid ?? 10000000,
		time: props.time ?? 24,
	});

	const monthSum = () => {
		let base = values.price - values.prepaid;
		let interestRate = (props.koef ?? 1.5) / 100;
		return Math.round(((base / values.time + base * interestRate) * 100) / 100); // proverit nado
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
		<div className="car_detail-info_calculator">
			<h3>Калькулятор</h3>
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
			<div className="car_detail-info_calculator_values">
				<h3>
					{daySum()} ₽<span> в сутки</span>
				</h3>
				<h3>
					{monthSum()} ₽<span> в месяц</span>
				</h3>
			</div>
		</div>
	);
};

export default CatalogCarDetailInfoCalculator;
