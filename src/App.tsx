import { Outlet } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./utils/ScrollToTop";

const queryClient = new QueryClient();
const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
					<YMaps>
						<ScrollToTop />
						<Outlet />
					</YMaps>
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
