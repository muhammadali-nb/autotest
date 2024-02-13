import React from "react";
import CarDetailToolbar from "../../../common/CarDetailToolbar/CarDetailToolbar";

const RentCarDetailInfo = () => {
	return (
		<div className="rent-car_detail-info">
			<h1 className="rent-car_detail-info_title">
				Toyota <span>Camry</span>
			</h1>
			<h3 className="rent-car_detail-info_regnum">К638ЕТ 53</h3>
			<div className="rent-car_detail-info_tags">
				<div className="rent-car_detail-info_tags_tag free">Свободна</div>
				<div className="rent-car_detail-info_tags_tag">Комфорт</div>
				<div className="rent-car_detail-info_tags_tag">Комфорт +</div>
			</div>
			<div className="rent-car_detail-info_price">
				Стоимость:{" "}
				<h3>
					2 800 ₽ <span>/ сут</span>
				</h3>
			</div>
			<p className="rent-car_detail-info_date">
				при аренде автомобиля от 15 суток
			</p>
			<p className="rent-car_detail-info_deposit">Депозит от 6 950 ₽</p>

			<button className=" site-btn rent-car_detail-info_btn">
				Забронировать
			</button>
			<CarDetailToolbar className="rent-car_detail-info_toolbar" />

			<div className="rent-car_detail-info_tarifs">
				<h4 className="rent-car_detail-info_tarifs_header">Тариф</h4>
				<ul className="rent-car_detail-info_tarifs_list">
					{[...new Array(4)].map((_item) => (
						<li className="rent-car_detail-info_tarifs_list-row">
							<p className="rent-car_detail-info_tarifs_list-row_left">
								до 3 дней
							</p>
							<p className="rent-car_detail-info_tarifs_list-row_right">
								2 800 ₽ <span>/ сут</span>
							</p>
						</li>
					))}
				</ul>
				C
			</div>

			<div className="rent-car_detail-info_info">
				<h4 className="rent-car_detail-info_info_header">Тариф</h4>
				<ul className="rent-car_detail-info_info_list">
					{[...new Array(4)].map((_item) => (
						<li className="rent-car_detail-info_info_list-row">
							<p className="rent-car_detail-info_info_list-row_left">Год</p>
							<p className="rent-car_detail-info_info_list-row_right">2023</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RentCarDetailInfo;
