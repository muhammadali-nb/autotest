import React from "react";

import { useNavigate } from "react-router-dom";
import { ICatalogCar } from "../../../../types/UpdatedCatalog/catalog.interface";

const CarCard = ({ car }: { car: ICatalogCar }) => {
	const navigate = useNavigate();

	return (
		<div className="car-card" onClick={() => navigate("/catalog/1")}>
			<div className="car-card_image">
				<img src={car?.image} alt="" />
			</div>
			<div className="car-card_body">
				<div className="car-card_taglist">
					{car?.tags.map((_item, index) => (
						<div className="car-card_taglist-tag" key={index}>
							{_item}
						</div>
					))}
				</div>
				<h1 className="car-card_title">
					{car?.brand} <span>{car?.model}</span>
				</h1>
				<p className="car-card_regnum">{car?.regnum}</p>
				<h3 className="car-card_price-perday">
					от <span>{car?.price_per_day.toLocaleString()} ₽</span> / сут
				</h3>
				<p className="car-card_price-overall">
					Цена от {car?.price.toLocaleString()} ₽
				</p>
				<button className="site-btn car-card_btn">Забронировать</button>
				<div className="car-card_taglist_mobile">
					{car?.tags.map((word, index) => (
						<React.Fragment key={index}>
							<span>{word}</span>
							{index < car?.tags.length - 1 && <span> / </span>}
						</React.Fragment>
					))}
				</div>
			</div>
		</div>
	);
};

export default CarCard;
