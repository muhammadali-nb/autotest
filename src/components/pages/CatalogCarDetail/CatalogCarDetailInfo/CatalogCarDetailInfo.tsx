import React from "react";
import IndexCalculator from "../../Index/IndexCalculator";
import CatalogCarDetailInfoCalculator from "./CatalogCarDetailInfoCalculator/CatalogCarDetailInfoCalculator";
import CarBookingForm from "../../../common/CarBookingForm";
import CarDetailToolbar from "../../../common/CarDetailToolbar/CarDetailToolbar";

type ICarDetailCatalogInfoListItem = {
	name: string;
	value: string;
	id: number;
};
interface ICarDetailCatalogInfo {
	brand: string;
	model: string;
	min_pay: number;
	price: number;
	liked: boolean;
	list: ICarDetailCatalogInfoListItem[];
}

interface ICarDetailCatalogInfoCalculator {
	min_pay: number;
	date_from: number;
	date_to: number;
	kasgo: number;
	koef: number;
}

interface IProps {
	info: ICarDetailCatalogInfo;
	calculator: ICarDetailCatalogInfoCalculator;
}

const CatalogCarDetailInfo = ({ info, calculator }: IProps) => {
	return (
		<div className="car_detail-info">
			<div className="car_detail-info_content">
				<h1 className="car_detail-info_header">
					{info?.brand} <span>{info?.model}</span>
				</h1>
				<div className="d-none d-md-block">
					<div className="car_detail-info_payment-perday">
						Платёж от:&nbsp;
						<h3>
							{info?.price.toLocaleString()} ₽ <span>/ сут</span>
						</h3>
					</div>
					<p className="car_detail-info_payment-overall">
						Цена от {info?.min_pay.toLocaleString()} ₽
					</p>
				</div>
				<div className="d-block d-md-none">
					<div className="car_detail-info_payment-perday">
						Стоимость:
						<h3>{info?.price.toLocaleString()} ₽</h3>
					</div>
					<p className="car_detail-info_payment-overall">
						Минимальный платёж от {info?.min_pay.toLocaleString()} ₽
					</p>
					<CarDetailToolbar className="d-md-none mt-px-25" />
				</div>
				{/* <button className="site-btn car_detail-info_btn d-none d-md-block">
					Забронировать
				</button> */}

				<CarBookingForm
					car={{} as any}
					className="car_detail-info_btn d-none d-md-block"
				/>

				<ul className="car_detail-info_components">
					<h3>Информация</h3>

					{info?.list.map((_item) => (
						<li className="car_detail-info_components-item" key={_item.id}>
							<div className="car_detail-info_components-item_left">
								{_item?.name}
							</div>
							<div className="car_detail-info_components-item_right">
								{_item?.value}
							</div>
						</li>
					))}
				</ul>
			</div>
			<CatalogCarDetailInfoCalculator
				price={info?.price}
				minTime={calculator?.date_from}
				koef={calculator?.koef}
				maxTime={calculator?.date_to}
				maxPrepaid={info?.price}
				minPrepaid={info?.min_pay}
				prepaid={info?.min_pay}
				noAnim={true}
			/>
		</div>
	);
};

export default CatalogCarDetailInfo;
