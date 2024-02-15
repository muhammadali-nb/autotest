import React from "react";
import CarDetailToolbar from "../../../common/CarDetailToolbar/CarDetailToolbar";
import { IRentCarDetailInfo } from "../../../../types/UpdatedRent/rent.interface";

const RentCarDetailInfo = ({ car_info }: { car_info: IRentCarDetailInfo }) => {
	return (
		<>
			<div className="rent-car_detail-info">
				<h1 className="rent-car_detail-info_title">
					{car_info?.brand} <span>{car_info?.model}</span>
				</h1>
				<h3 className="rent-car_detail-info_regnum">{car_info?.regnum}</h3>
				<div className="rent-car_detail-info_tags">
					<div
						className={
							"rent-car_detail-info_tags_tag " +
							(car_info?.available ? "free" : "busy")
						}>
						{car_info?.available ? "Cвободна" : "Занята"}
					</div>

					{car_info.tags.map((_item, index) => (
						<div className="rent-car_detail-info_tags_tag" key={index}>
							{_item}
						</div>
					))}
				</div>
				<div className="rent-car_detail-info_price">
					Стоимость:{" "}
					<h3>
						{car_info?.price_per_day.toLocaleString()} ₽ <span>/ сут</span>
					</h3>
				</div>
				<p className="rent-car_detail-info_date">
					при аренде автомобиля от 15 суток
				</p>
				<p className="rent-car_detail-info_deposit">
					Депозит от {car_info.deposit.toLocaleString()} ₽
				</p>

				<button className=" site-btn rent-car_detail-info_btn">
					Забронировать
				</button>
				<CarDetailToolbar className="rent-car_detail-info_toolbar" />

				<div className="rent-car_detail-info_tarifs">
					<h4 className="rent-car_detail-info_tarifs_header">Тариф</h4>
					<ul className="rent-car_detail-info_tarifs_list">
						{car_info?.tarif.map((_item) => (
							<li
								key={_item.id}
								className="rent-car_detail-info_tarifs_list-row">
								<p className="rent-car_detail-info_tarifs_list-row_left">
									{_item.dedline}
								</p>
								<p className="rent-car_detail-info_tarifs_list-row_right">
									{_item.price} ₽ <span>/ сут</span>
								</p>
							</li>
						))}
					</ul>
				</div>

				<div className="rent-car_detail-info_info">
					<h4 className="rent-car_detail-info_info_header">Тариф</h4>
					<ul className="rent-car_detail-info_info_list">
						{car_info?.info.map((_item) => (
							<li key={_item.id} className="rent-car_detail-info_info_list-row">
								<p className="rent-car_detail-info_info_list-row_left">
									{_item.name}
								</p>
								<p className="rent-car_detail-info_info_list-row_right">
									{_item.value}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
			{/* <CarBookingForm car_id={1} car={car_info as any} /> */}
		</>
	);
};

export default RentCarDetailInfo;
