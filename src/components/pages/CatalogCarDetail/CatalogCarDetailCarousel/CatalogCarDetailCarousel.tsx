import React, { useState } from "react";
import CarImage from "../../../../images/index/avto.png";
import { Carousel } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { CarImagesModal } from "../../Car/CarImages";
import CarFullImageModal from "../../Rent/RentCarFullImage";
const data = [
	{ image: CarImage, id: 1 },
	{ image: CarImage, id: 2 },
	{ image: CarImage, id: 3 },
	{ image: CarImage, id: 4 },
];

const CatalogCarDetailCarousel = () => {
	const [activeImage, setActiveImage] = useState(0);
	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);
	const handleSelect = (selectedIndex) => {
		if (selectedIndex >= data.length) selectedIndex = 0;
		if (selectedIndex < 0) selectedIndex = data.length - 1;
		setActiveImage(selectedIndex);
	};

	return (
		<>
			<div className="car_detail-carousel">
				<Carousel
					activeIndex={activeImage}
					onSelect={handleSelect}
					controls={false}
					indicators={false}>
					{data?.map((img, index) => (
						<Carousel.Item key={index}>
							<div onClick={handleShow} className="car_detail-carousel_active">
								<img src={img.image} />
							</div>
						</Carousel.Item>
					))}

					<button
						onClick={() => handleSelect(activeImage - 1)}
						className="
						car_detail-carousel_controls-left">
						<svg
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M7 13L1 7L7 1"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button
						onClick={() => handleSelect(activeImage + 1)}
						className="
						car_detail-carousel_controls-right">
						<svg
							width="8"
							height="14"
							viewBox="0 0 8 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1 13L7 7L1 1"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</Carousel>

				<div className="car_detail-carousel_items">
					{data.map((_item, index) => (
						<button onClick={() => handleSelect(index)}>
							<img src={_item.image} />
						</button>
					))}
				</div>
			</div>
			<>
				<BrowserView>
					<CarImagesModal
						show={showModal}
						handleClose={handleClose}
						car_images={data}
					/>
				</BrowserView>
				<MobileView>
					<CarFullImageModal
						active={showModal}
						setActive={setShowModal}
						images={data}
					/>
				</MobileView>
			</>
		</>
	);
};

export default CatalogCarDetailCarousel;
