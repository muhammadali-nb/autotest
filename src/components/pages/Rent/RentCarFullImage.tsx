import React, { useEffect, useState } from "react";

import arrowLeft from "../../../images/car-detail/arrow-left.svg";
import { TypeImages } from "./RentCarImagesCarousel";
import { Carousel } from "react-bootstrap";
import caretLeft from "./../../../images/common/caret-left-big.svg";
import caretRight from "./../../../images/common/caret-right-big.svg";

interface RentCarFullImageProps {
	active: boolean;
	setActive: (e: boolean) => void;
	images: TypeImages[];
}

const RentCarFullImage = ({
	active,
	setActive,
	images,
}: RentCarFullImageProps) => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		if (active) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [active]);

	const handleSelect = (selectedIndex) => {
		// if (Api.isError(car)) return;
		if (selectedIndex >= (images?.length ?? 0)) selectedIndex = 0;
		if (selectedIndex < 0) selectedIndex = (images?.length ?? 1) - 1;
		setIndex(selectedIndex);
	};
	return (
		<div className={"rent-car-fullimage" + `${active ? " active" : ""}`}>
			<button className="rent-car-fullimage_close">
				<img
					src={arrowLeft}
					alt="Back to car detail"
					onClick={() => setActive(false)}
				/>
			</button>

			<Carousel
				activeIndex={index}
				onSelect={handleSelect}
				controls={false}
				indicators={false}>
				{images.map((_item) => (
					<Carousel.Item key={_item.id}>
						<div
							className={"car-images-image-container cursor-pointer "}
							// onClick={handleShow}
						>
							<img
								className="d-block w-100 car-images-image "
								src={_item.image}
								alt=""
							/>
						</div>
					</Carousel.Item>
				))}
			</Carousel>
			<div
				className={
					"car-images-controls car-images_rent-controls mt-px-10 rent-car-fullimage_controls"
				}>
				<button
					className={"car-images-controls-btn car-images_rent-controls_btn"}
					onClick={() => handleSelect(index - 1)}>
					<img src={caretLeft} alt="" />
				</button>
				<div
					className={
						"car-images-controls-sliders car-images_rent-controls-sliders  "
					}>
					{[...Array(images.length)].map((i, ind) => (
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

export default RentCarFullImage;
