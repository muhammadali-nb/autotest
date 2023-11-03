import axios, { AxiosResponse } from "axios";
import { ReactNode, createContext, useEffect, useReducer } from "react";
import { AuthInitialState, AuthResponce } from "../types/AuthContextTypes";

const actions = {
	INITIALIZE: "INITIALIZE",
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	LOGOUT: "LOGOUT",
};

const initialState: AuthInitialState = {
	isAuthenticated: false,
	user_status: "need_auth",
	has_profile: false,
	isInitialized: false,
	api_status: "pending",
	error_message: null,
};

const handlers = {
	INITIALIZE: (state, action) => {
		const { isAuthenticated, user, status, has_profile } = action.payload;

		return {
			...state,
			isAuthenticated,
			isInitialized: true,
			user,
			status,
			has_profile,
		};
	},
	LOGIN: (state, action) => {
		const { user } = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
	LOGOUT: (state) => ({
		...state,
		isAuthenticated: false,
		user: null,
	}),
	REGISTER: (state, action) => {
		const { user, status, has_profile, error_message, api_status } =
			action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
			status,
			has_profile,
			api_status,
			error_message,
		};
	},
};

const reducer = (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
	...initialState,
	login: (phone: string, code: string) => Promise.resolve(),
	loginConfirm: () => Promise.resolve(),
	logout: () => Promise.resolve(),
	register: (phone: string, code: string) => Promise.resolve({}),
	registerConxfirm: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const initialize = async () => {
		axios
			.get("https://taxivoshod.ru/api/login.php", {
				withCredentials: true,
			})
			.then((res: AxiosResponse<AuthResponce>) => {
				const { success, reason, has_profile } = res.data;
				if (success && has_profile) {
					dispatch({
						type: actions.INITIALIZE,
						payload: {
							isAuthenticated: true,
							has_profile: true,
						},
					});
				} else {
					dispatch({
						type: actions.INITIALIZE,
						payload: {
							isAuthenticated: false,
							user: null,
							user_status: reason,
							has_profile: false,
						},
					});
				}
			})
			.catch((err) => {
				dispatch({
					type: actions.INITIALIZE,
					payload: {
						isAuthenticated: false,
						user: null,
					},
				});
			});
	};

	const register = async (phone: string, password: string) => {
		try {
			const res: AxiosResponse<AuthResponce> = await axios.get(
				`https://taxivoshod.ru/api/login.php?auth=1&reg=1& phone=${phone}&code=${password}`,
				{ withCredentials: true }
			);

			dispatch({
				type: actions.REGISTER,
				payload: {
					isAuthenticated: true,
					api_status: "success",
					has_profile: false,
					err_message: null,
				},
			});

			return res.data;
		} catch (error) {
			dispatch({
				type: actions.REGISTER,
				payload: {
					isAuthenticated: false,
					user: null,
					api_status: "error",
					has_profile: false,
					error_message: (error as Error).message,
				},
			});
		}
	};

	useEffect(() => {
		initialize().catch(console.error);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				...state,
				register,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthConsumer = AuthContext.Consumer;
