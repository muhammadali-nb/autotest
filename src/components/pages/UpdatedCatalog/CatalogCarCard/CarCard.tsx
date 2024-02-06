import React from "react";
import AvtoImage from "../../../../images/index/avto.png";
import { useNavigate } from "react-router-dom";

const CarCard = () => {
	const navigate = useNavigate();

	return (
		<div className="car-card" onClick={() => navigate("/catalog/1")}>
			<div className="car-card_image">
				<img src={AvtoImage} alt="" />
			</div>
			<div className="car-card_body">
				<div className="car-card_taglist">
					<div className="car-card_taglist-tag">Лизинг до 7 лет</div>
					<div className="car-card_taglist-tag">Аванс 0%</div>
				</div>
				<h1 className="car-card_title">
					Cherry <span>Tiggo 7 Pro</span>
				</h1>
				<p className="car-card_regnum">К638ЕТ 53</p>
				<h3 className="car-card_price-perday">
					от <span>6 950 ₽</span> / сут
				</h3>
				<p className="car-card_price-overall">Цена от 2 950 000 ₽</p>
				<button className="site-btn car-card_btn">Забронировать</button>
				<div className="car-card_taglist_mobile">
					Лизинг до 7 лет / Аванс 0%
				</div>
			</div>
		</div>
	);
};

export default CarCard;
