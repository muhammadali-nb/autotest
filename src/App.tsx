import React, { useEffect } from "react";
import {
	Outlet,
	Route,
	RouterProvider,
	Routes,
	useLocation,
} from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import RentCarDetail from "./components/pages/Rent/RentCarDetail";

const queryClient = new QueryClient();

const App = () => {
	let location = useLocation();
	let state = location.state as { backgroundLocation?: Location };
	useEffect(() => {
		console.log(location);
	}, [location]);
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<YMaps>
					<Outlet />
					{state?.backgroundLocation && (
						<Routes>
							<Route path="/rent/:carID" element={<RentCarDetail />} />
						</Routes>
					)}
				</YMaps>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
