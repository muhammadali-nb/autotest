import React from "react";
import { RouterProvider } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./navigation/Navigation";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<YMaps>
				<RouterProvider router={router} />
			</YMaps>
		</AuthProvider>
	</QueryClientProvider>
);

export default App;
