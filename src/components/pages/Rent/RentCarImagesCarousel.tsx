import React, { useState } from "react";
import caretLeft from "./../../../images/common/caret-left-big.svg";
import caretRight from "./../../../images/common/caret-right-big.svg";
import { Carousel } from "react-bootstrap";

export type TypeImages = {
	image: string;
	id: number;
};

const RentCarImagesCarousel = ({
	images,
	setFullScreen,
}: {
	images: TypeImages[];
	setFullScreen: (e: boolean) => void;
}) => {
	const [index, setIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleSelect = (selectedIndex) => {
		if (selectedIndex >= (images?.length ?? 0)) selectedIndex = 0;
		if (selectedIndex < 0) selectedIndex = (images?.length ?? 1) - 1;
		setIndex(selectedIndex);
	};
	return (
		<div className={"car-images_rent"}>
			<Carousel
				activeIndex={index}
				onSelect={handleSelect}
				controls={false}
				indicators={false}>
				{images.map((_item) => (
					<Carousel.Item key={_item.id} onClick={() => setFullScreen(true)}>
						<div
							className={
								"car-images-image-container cursor-pointer car-images_rent-image "
							}
							onClick={handleShow}>
							<img
								className="d-block w-100 car-images-image"
								src={_item.image}
								alt="car_image"
							/>
						</div>
					</Carousel.Item>
				))}
			</Carousel>
			{/* <div className={"car-images-controls car-images_rent-controls mt-px-10"}> */}
			<div className={"car-images-controls mt-3 car-images_rent-controls "}>
				<button
					className={"car-images-controls-btn"}
					onClick={() => handleSelect(index - 1)}>
					<img src={caretLeft} width={16} height={32} alt="" />
				</button>
				<div className={"car-images-controls-sliders"}>
					{[...Array(images.length)].map((i, ind) => (
						<div
							key={ind}
							className={
								"car-images-controls-slider " + (index === ind ? "active" : "")
							}
							onClick={() => handleSelect(ind)}>
							<div></div>
						</div>
					))}
				</div>
				<button
					className={"car-images-controls-btn d-flex justify-content-end"}
					onClick={() => handleSelect(index + 1)}>
					<img src={caretRight} width={16} height={32} alt="" />
				</button>
			</div>
		</div>
		// </div>
	);
};

export default RentCarImagesCarousel;
