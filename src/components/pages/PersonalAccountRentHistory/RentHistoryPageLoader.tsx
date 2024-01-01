import React from "react";
import ContentLoader from "react-content-loader";

const RentHistoryPageLoader = () => {
	return (
		<>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={"800px"}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-none d-lg-block">
				<rect x="0" y="0" rx="0" ry="0" width={"100%"} height="2" />
				<>
					<rect x="0" y="30" rx="0" ry="0" width={"780"} height="326" />
					<rect x="800" y="30" rx="0" ry="0" width={"100%"} height="156" />
					<rect x="800" y="200" rx="0" ry="0" width={"100%"} height="156" />
				</>
				<rect x="0" y="386" rx="0" ry="0" width={"100%"} height="2" />
				<>
					<rect x="0" y="414" rx="0" ry="0" width={"780"} height="326" />
					<rect x="800" y="414" rx="0" ry="0" width={"100%"} height="156" />
					<rect x="800" y="584" rx="0" ry="0" width={"100%"} height="156" />
				</>
			</ContentLoader>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={"1100px"}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-none d-md-block">
				<rect x="0" y="0" rx="0" ry="0" width="100%" height="2" />
				<>
					<rect x="0" y="20" rx="0" ry="0" width="100%" height="312" />
					<rect x="0" y="356" rx="0" ry="0" width="49%" height="158" />
					<rect x="52%" y="356" rx="0" ry="0" width="49%" height="158" />
				</>
				<rect x="0" y="540" rx="0" ry="0" width="100%" height="2" />
				<>
					<rect x="0" y="570" rx="0" ry="0" width="100%" height="312" />
					<rect x="0" y="910" rx="0" ry="0" width="49%" height="158" />
					<rect x="52%" y="910" rx="0" ry="0" width="49%" height="158" />
				</>
			</ContentLoader>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={"1100px"}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-block d-md-none">
				<rect x="0" y="20" rx="0" ry="0" width="100%" height="520" />
				<rect x="0" y="560" rx="0" ry="0" width="100%" height="520" />
			</ContentLoader>
		</>
	);
};

export default RentHistoryPageLoader;
