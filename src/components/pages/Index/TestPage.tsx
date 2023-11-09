import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const TestPage = () => {
	let location = useLocation();

	return (
		<>
			<div>
				<h1>testtststetet</h1>
				<Link to={"/test/1"} state={{ backgroundLocation: location }}>
					tets
				</Link>
			</div>
		</>
	);
};

export default TestPage;
