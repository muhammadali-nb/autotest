import React from "react";
import ContentLoader from "react-content-loader";

const RentGridSkeleton = (props) => {
	return (
		<ContentLoader
			speed={2}
			width={1200}
			height={600}
			viewBox="0 0 1200 600"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
			{...props}>
			<rect x="253" y="169" rx="0" ry="0" width="1" height="0" />
			<rect x="19" y="15" rx="0" ry="0" width="168" height="189" />
			<rect x="228" y="12" rx="0" ry="0" width="182" height="195" />
			<rect x="434" y="15" rx="0" ry="0" width="169" height="198" />
		</ContentLoader>
	);
};

export default RentGridSkeleton;
