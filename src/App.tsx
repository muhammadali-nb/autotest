import { Outlet } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./utils/ScrollToTop";
// import { AxiosInterceptor } from "./core/axios";

const queryClient = new QueryClient();
const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				{/* <AxiosInterceptor> */}
					<YMaps>
						<ScrollToTop />
						<Outlet />
					</YMaps>
				{/* </AxiosInterceptor> */}
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
