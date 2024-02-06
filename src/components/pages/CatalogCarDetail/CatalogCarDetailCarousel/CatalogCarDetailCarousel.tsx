import React, { useState } from "react";
import CarImage from "../../../../images/index/avto.png";
const data = [
	{ image: CarImage, id: 1 },
	{ image: CarImage, id: 2 },
	{ image: CarImage, id: 3 },
	{ image: CarImage, id: 4 },
];

const CatalogCarDetailCarousel = () => {
	const [activeImage, setActiveImage] = useState(0);

	return (
		<div className="car_detail-carousel">
			<div className="car_detail-carousel_active">
				<img src={data[activeImage].image} alt="" />
			</div>
			<div className="car_detail-carousel_items">
				{data.map((_item) => (
					<button>
						<img src={_item.image} alt="" />
					</button>
				))}
			</div>
		</div>
	);
};

export default CatalogCarDetailCarousel;
