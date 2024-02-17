import React from "react";
import ContentLoader from "react-content-loader";

const CarGridSkeleton = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={1200}
			height={600}
			viewBox="0 0 1200 600"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			{...props}>
			<rect x="0" y="0" rx="4" ry="4" width="28%" height="430" />
			<rect x="350" y="0" rx="4" ry="4" width="28%" height="430" />
			<rect x="700" y="0" rx="4" ry="4" width="28%" height="430" />
		</ContentLoader>
	);
};

export default CarGridSkeleton;
