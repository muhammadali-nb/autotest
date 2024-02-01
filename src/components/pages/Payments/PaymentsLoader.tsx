import React from "react";
import ContentLoader from "react-content-loader";

const PaymentsLoader = () => {
	return (
		<>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={600}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-none d-md-block">
				<>
					// bank cards section
					<rect x="0" y="20" rx="0" ry="0" width="100%" height="2" />
					<rect x="0" y="44" rx="0" ry="0" width="74" height="24" />
					<rect x="0" y="88" rx="0" ry="0" width="40" height="76" />
					<rect x="55" y="88" rx="0" ry="0" width="214" height="76" />
					<rect x="284" y="88" rx="0" ry="0" width="214" height="76" />
					<rect x="513" y="88" rx="0" ry="0" width="214" height="76" />
				</>
				<>
					// personal account cards section
					<rect x="0" y="194" rx="0" ry="0" width="100%" height="2" />
					<rect x="0" y="228" rx="0" ry="0" width="74" height="24" />
					<rect x="0" y="268" rx="0" ry="0" width="40" height="212" />
					<rect x="55" y="268" rx="0" ry="0" width="272" height="212" />
					<rect x="344" y="268" rx="0" ry="0" width="272" height="212" />
					<rect x="632" y="268" rx="0" ry="0" width="272" height="212" />
				</>
			</ContentLoader>
			<ContentLoader
				speed={1}
				width={"100%"}
				height={740}
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
				className="d-block d-md-none">
				<>
					// bank cards section
					<>
						<rect y="0" x="0" rx="0" ry="0" width="30" height="20" />
						<rect y="0" x="46" rx="0" ry="0" width="50" height="20" />
						<rect y="0" x="112" rx="0" ry="0" width="50" height="20" />
					</>
					<rect y="28" x="0" rx="0" ry="0" width="100%" height="2" />
					<>
						<rect x="0" y="68" rx="0" ry="0" width="100%" height="68" />
						<rect x="0" y="152" rx="0" ry="0" width="100%" height="68" />
						<rect x="0" y="236" rx="0" ry="0" width="100%" height="68" />
					</>
				</>
				<>
					// personal account cards section
					<rect y="320" x="0" rx="0" ry="0" width="100%" height="2" />
					<>
						<rect x="0" y="336" rx="0" ry="0" width="100%" height="192" />
						<rect x="0" y="546" rx="0" ry="0" width="100%" height="192" />
					</>
				</>
			</ContentLoader>
		</>
	);
};

export default PaymentsLoader;
