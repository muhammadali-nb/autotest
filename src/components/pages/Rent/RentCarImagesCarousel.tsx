import React, { useState } from "react";
import { CarData, CarRentDataInfo } from "../../common/CarCard";

import caretLeft from "./../../../img/common/caret-left-big.svg";

import caretRight from "./../../../img/common/caret-right-big.svg";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";

const RentCarImagesCarousel = ({ car }: { car: CarRentDataInfo }) => {
	const [index, setIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleSelect = (selectedIndex) => {
		// if (selectedIndex >= car.images.length) selectedIndex = 0;
		// if (selectedIndex < 0) selectedIndex = car.images.length - 1;
		// setIndex(selectedIndex);
	};
	return (
		<div className={"car-images_rent"}>
			<Carousel
				activeIndex={index}
				onSelect={handleSelect}
				controls={false}
				indicators={false}>
				<Carousel.Item>
					<div
						className={
							"car-images-image-container cursor-pointer car-images_rent-image "
						}
						onClick={handleShow}>
						<img
							className="d-block w-100 car-images-image"
							src={car.thumb}
							alt=""
						/>
					</div>
				</Carousel.Item>
			</Carousel>
			<div className={"car-images-controls car-images_rent-controls mt-px-10"}>
				<button
					className={"car-images-controls-btn car-images_rent-controls_btn"}
					onClick={() => handleSelect(index - 1)}>
					<img src={caretLeft} alt="" />
				</button>
				<div
					className={
						"car-images-controls-sliders car-images_rent-controls-sliders  "
					}>
					{[...Array(3)].map((i, ind) => (
						<div
							key={ind}
							className={
								"car-images-controls-slider car-images_rent-controls-slider " +
								(index === ind ? "active" : "")
							}
							onClick={() => handleSelect(ind)}>
							<div></div>
						</div>
					))}
				</div>
				<button
					className={"car-images-controls-btn car-images_rent-controls_btn"}
					onClick={() => handleSelect(index + 1)}>
					<img src={caretRight} alt="" />
				</button>
			</div>
		</div>
	);
};

export default RentCarImagesCarousel;
