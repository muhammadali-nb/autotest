import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { ICatalogCar } from "../../../../types/UpdatedCatalog/catalog.interface";
import CarBookingForm from "../../../common/CarBookingForm";

const CarCard = ({ car }: { car: ICatalogCar }) => {
	return (
		<div className="car-card">
			<Link to={`/catalog/${car.id}`}>
				<div className="car-card_image">
					<img src={car?.image} alt={car.brand + " " + car.model} />
				</div>
			</Link>

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
					от <span>{car?.min_pay.toLocaleString()} ₽</span> / сут
				</h3>
				<p className="car-card_price-overall">
					Цена от {car?.price.toLocaleString()} ₽
				</p>

				<CarBookingForm car={car} className="car-card_btn" />

				{/* <button className="site-btn car-card_btn">Забронировать</button> */}
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
