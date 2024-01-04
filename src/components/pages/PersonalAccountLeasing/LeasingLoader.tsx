import React from "react";
import ContentLoader from "react-content-loader";

const LeasingLoader = () => {
	return (
		<>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={1000}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-none d-xl-block"
        >
				<rect x="0" y="0" rx="0" ry="0" width="100%" height="2" />
				<rect x="0" y="20" rx="0" ry="0" width="780" height="384" />
				<rect x="795" y="20" rx="0" ry="0" width="368" height="126" />
				<rect x="795" y="162" rx="0" ry="0" width="368" height="240" />
				<rect x="0" y="418" rx="0" ry="0" width="310" height="660" />
				<rect x="325" y="418" rx="0" ry="0" width="856" height="660" />
			</ContentLoader>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={1600}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-none d-md-block d-xl-none">
				<rect x="0" y="0" rx="0" ry="0" width="100%" height="384" />
				<rect x="0" y="400" rx="0" ry="0" width="49%" height="240" />
				<rect x="51%" y="400" rx="0" ry="0" width="49%" height="240" />
				<rect x="0" y="660" rx="0" ry="0" width="310" height="660" />
				<rect x="325" y="660" rx="0" ry="0" width="856" height="660" />
			</ContentLoader>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={860}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-block d-md-none ">
				<rect x="0" y="0" rx="0" ry="0" width="100%" height="852" />
			</ContentLoader>
		</>
	);
};

export default LeasingLoader;
