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
import TestModal from "./components/pages/TestModal";

const queryClient = new QueryClient();

const App = () => {
	let location = useLocation();
	// let state = location.state as { backgroundLocation?: Location };
	// The `backgroundLocation` state is the location that we were at when one of
	// the gallery links was clicked. If it's there, use it as the location for
	// the <Routes> so we show the gallery in the background, behind the modal.
	let state = location.state as { backgroundLocation?: Location };

	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<YMaps>
					<Outlet />
					{state?.backgroundLocation && (
						<Routes>
							<Route path="/test/:id" element={<TestModal />} />
						</Routes>
					)}
				</YMaps>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
