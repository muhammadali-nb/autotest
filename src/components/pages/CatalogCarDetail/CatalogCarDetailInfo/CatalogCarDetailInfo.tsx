import React from "react";
import IndexCalculator from "../../Index/IndexCalculator";
import CatalogCarDetailInfoCalculator from "./CatalogCarDetailInfoCalculator/CatalogCarDetailInfoCalculator";

const CatalogCarDetailInfo = () => {
	return (
		<div className="car_detail-info">
			<h1 className="car_detail-info_header">
				Toyota <span>Camry</span>
			</h1>
			<div className="car_detail-info_payment-perday">
				Платёж от:&nbsp;
				<h3>
					2 800 ₽ <span>/ сут</span>
				</h3>
			</div>
			<p className="car_detail-info_payment-overall">Цена от 3 618 950 ₽</p>
			<button className="site-btn car_detail-info_btn">Забронировать</button>
			<ul className="car_detail-info_components">
				<li className="car_detail-info_components-item">
					<div className="car_detail-info_components-item_left">Объём</div>
					<div className="car_detail-info_components-item_right">2,0 литра</div>
				</li>
				<li className="car_detail-info_components-item">
					<div className="car_detail-info_components-item_left">Объём</div>
					<div className="car_detail-info_components-item_right">2,0 литра</div>
				</li>
				<li className="car_detail-info_components-item">
					<div className="car_detail-info_components-item_left">Объём</div>
					<div className="car_detail-info_components-item_right">2,0 литра</div>
				</li>
			</ul>
			<CatalogCarDetailInfoCalculator />
		</div>
	);
};

export default CatalogCarDetailInfo;
