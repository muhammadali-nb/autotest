import React from "react";
import IndexCalculator from "../../Index/IndexCalculator";
import CatalogCarDetailInfoCalculator from "./CatalogCarDetailInfoCalculator/CatalogCarDetailInfoCalculator";
import CarBookingForm from "../../../common/CarBookingForm";
import CarDetailToolbar from "../../../common/CarDetailToolbar/CarDetailToolbar";

const CatalogCarDetailInfo = () => {
	return (
		<div className="car_detail-info">
			<div className="car_detail-info_content">
				<h1 className="car_detail-info_header">
					Toyota <span>Camry</span>
				</h1>
				<div className="d-none d-md-block">
					<div className="car_detail-info_payment-perday">
						Платёж от:&nbsp;
						<h3>
							2 800 ₽ <span>/ сут</span>
						</h3>
					</div>
					<p className="car_detail-info_payment-overall">Цена от 3 618 950 ₽</p>
				</div>
				<div className="d-block d-md-none">
					<div className="car_detail-info_payment-perday">
						Стоимость:
						<h3>2 800 ₽</h3>
					</div>
					<p className="car_detail-info_payment-overall">
						Минимальный платёж от 3 618 950 ₽
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
					<li className="car_detail-info_components-item">
						<div className="car_detail-info_components-item_left">Объём</div>
						<div className="car_detail-info_components-item_right">
							2,0 литра
						</div>
					</li>
					<li className="car_detail-info_components-item">
						<div className="car_detail-info_components-item_left">Объём</div>
						<div className="car_detail-info_components-item_right">
							2,0 литра
						</div>
					</li>
					<li className="car_detail-info_components-item">
						<div className="car_detail-info_components-item_left">Объём</div>
						<div className="car_detail-info_components-item_right">
							2,0 литра
						</div>
					</li>
				</ul>
			</div>
			<CatalogCarDetailInfoCalculator />
		</div>
	);
};

export default CatalogCarDetailInfo;
