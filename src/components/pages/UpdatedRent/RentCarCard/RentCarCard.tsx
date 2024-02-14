import React from "react";
import CarImage from "../../../../images/index/avto.png";
import { IRentCar } from "../../../../types/UpdatedRent/rent.interface";

const RentCarCard = ({ car }: { car: IRentCar }) => {
	return (
		<div className="rent-car-card">
			<div className="rent-car-card_image">
				<img src={car?.image} alt="" />
			</div>
			<div className="rent-car-card_body">
				<div className="rent-car-card_tags">
					<p
						className={
							"rent-car-card_tags_tag " + (car?.available ? "free" : "busy")
						}>
						{car?.available ? "Cвободна" : "Занята"}
					</p>
					{car.tags.map((_item, index) => (
						<p className="rent-car-card_tags_tag">{_item}</p>
					))}
				</div>
				<h1 className="rent-car-card_title">
					{car?.brand} <span>{car?.model}</span>
					<div className="rent-car-card_title-overlay_first" />
					<div className="rent-car-card_title-overlay_last" />
				</h1>
				<h3 className="rent-car-card_regnum">{car?.regnum}</h3>
				<p className="rent-car-card_price">
					от&nbsp;<h3> {car?.price_per_day.toLocaleString()} ₽ </h3>&nbsp;/ сут
				</p>
				<p className="rent-car-card_deposit">
					Депозит от {car?.deposit.toLocaleString()} ₽
				</p>
				<button className="site-btn rent-car-card_btn">Забронировать</button>
			</div>
		</div>
	);
};

export default RentCarCard;
