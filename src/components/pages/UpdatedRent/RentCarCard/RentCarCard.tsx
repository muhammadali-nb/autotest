import React from "react";
import CarImage from "../../../../images/index/avto.png";

const RentCarCard = () => {
	return (
		<div className="rent-car-card">
			<div className="rent-car-card_image">
				<img src={CarImage} alt="" />
			</div>
			<div className="rent-car-card_body">
				<div className="rent-car-card_tags">
					<p className="rent-car-card_tags_tag free">Свободна</p>
					<p className="rent-car-card_tags_tag">Комфорт</p>
				</div>
				<h1 className="rent-car-card_title">
					Cherry <span>Tiggo 7 Pro Max</span>
					<div className="rent-car-card_title-overlay_first" />
					<div className="rent-car-card_title-overlay_last" />
				</h1>
				<h3 className="rent-car-card_regnum">К638ЕТ 53</h3>
				<p className="rent-car-card_price">
					от&nbsp;<h3> 6 950 ₽ </h3>&nbsp;/ сут
				</p>
				<p className="rent-car-card_deposit">Депозит от 5 950 ₽</p>
				<button className="site-btn rent-car-card_btn">Забронировать</button>
			</div>
		</div>
	);
};

export default RentCarCard;
