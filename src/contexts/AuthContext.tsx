import axios, { AxiosError, AxiosResponse } from "axios";
import { ReactNode, createContext, useEffect, useReducer } from "react";
import {
	AuthInitialState,
	AuthResponce,
	RegisterErrorType,
} from "../types/AuthContextTypes";

const actions = {
	INITIALIZE: "INITIALIZE",
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	LOGOUT: "LOGOUT",
};

const localData = localStorage.getItem("voshod-user");
const initialState: AuthInitialState = localData !== null ? JSON.parse(localData) : {
	isAuthenticated: false,
	user_status: null,
	has_profile: false,
	isInitialized: false,
	middle_name: "",
	last_name: "",
	phone: ""
};

// const initialState: AuthInitialState = {
// 	isAuthenticated: false,
// 	user_status: null,
// 	has_profile: false,
// 	isInitialized: false,
// 	api_status: "pending",
// 	error_message: null,
// 	first_name: "",
// 	middle_name: "",
// 	last_name: "",
// 	phone: ""
// }

const handlers = {
	INITIALIZE: (state: AuthInitialState, action) => {
		const { isAuthenticated, api_status, user_status, has_profile, first_name, middle_name, last_name, phone } =
			action.payload;

		return {
			...state,
			isAuthenticated,
			isInitialized: true,
			api_status,
			user_status,
			has_profile,
			first_name,
			middle_name,
			last_name,
			phone
		};
	},
	LOGIN: (state: AuthInitialState, action) => {
		const { user } = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
	LOGOUT: (state: AuthInitialState) => ({
		...state,
		isAuthenticated: false,
		user: null,
	}),
	REGISTER: (state: AuthInitialState, action) => {
		const { user, user_status, has_profile, error_message, api_status, first_name, middle_name, last_name, phone } =
			action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
			user_status,
			has_profile,
			api_status,
			error_message,
			first_name,
			middle_name,
			last_name,
			phone
		};
	},
};

const reducer = (state: AuthInitialState, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
	...initialState,
	login: (phone: string, code: string) => Promise.resolve(),
	loginConfirm: () => Promise.resolve(),
	logout: () => Promise.resolve(),
	register: (phone: string, code: string) => Promise.resolve({}),
	registerConxfirm: () => Promise.resolve(),
	initialize: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const initialize = async () => {
		axios
			.get("https://taxivoshod.ru/api/login.php", {
				withCredentials: true,
			})
			.then((res: AxiosResponse<AuthResponce>) => {
				const { success, reason, has_profile, first_name, middle_name, last_name, phone } = res.data;
				if (success && has_profile) {
					const payload = {
						isAuthenticated: true,
						has_profile: true,
						user_status: null,
						first_name: first_name,
						middle_name: middle_name,
						last_name: last_name,
						phone: phone
					};

					localStorage.setItem("voshod-user", JSON.stringify(payload));

					dispatch({
						type: actions.INITIALIZE,
						payload: payload,
					});

					// dispatch({
					// 	type: actions.INITIALIZE,
					// 	payload: {
					// 		isAuthenticated: true,
					// 		has_profile: true,
					// 		user_status: null,
					// 		first_name: first_name,
					// 		middle_name: middle_name,
					// 		last_name: last_name,
					// 		phone: phone
					// 	},
					// });
				} else {
					dispatch({
						type: actions.INITIALIZE,
						payload: {
							isAuthenticated: false,
							user: null,
							user_status: reason,
							has_profile: false,
							first_name: "",
							middle_name: "",
							last_name: "",
							phone: ""
						},
					});
				}
			})
			.catch((err) => {
				console.log((err as AxiosError).response);
				dispatch({
					type: actions.INITIALIZE,
					payload: {
						isAuthenticated: false,
						user: null,
						user_status: (err as AxiosError<AuthResponce>).response?.data
							.reason,
						has_profile: false,
						first_name: "",
						middle_name: "",
						last_name: "",
						phone: ""
					},
				});
			});
	};

	const register = async (phone: string, password: string) => {
		try {
			const res: AxiosResponse<AuthResponce> = await axios.get(
				`https://taxivoshod.ru/api/login.php?auth=1&reg=1&phone=${phone}&code=${password}`,
				{ withCredentials: true }
			);

			const payload = {
				isAuthenticated: true,
				api_status: "success",
				has_profile: false,
				user_status: null,
				err_message: null,
				first_name: res.data.first_name,
				middle_name: res.data.middle_name,
				last_name: res.data.last_name,
				phone: res.data.phone
			};

			localStorage.setItem("voshod-user", JSON.stringify(payload));

			dispatch({
				type: actions.REGISTER,
				payload: payload,
			});

			// dispatch({
			// 	type: actions.REGISTER,
			// 	payload: {
			// 		isAuthenticated: true,
			// 		api_status: "success",
			// 		has_profile: false,
			// 		user_status: null,
			// 		err_message: null,
			// 		first_name: res.data.first_name,
			// 		middle_name: res.data.middle_name,
			// 		last_name: res.data.last_name,
			// 		phone: res.data.phone
			// 	},
			// });

			return res.data;
		} catch (error) {
			console.log((error as AxiosError).response);
			dispatch({
				type: actions.REGISTER,
				payload: {
					isAuthenticated: false,
					user: null,
					api_status: "error",
					has_profile: false,
					user_status: (error as AxiosError<RegisterErrorType>).response?.data
						?.reason,
					error_message: (error as AxiosError<RegisterErrorType>).response?.data
						?.message,
				},
			});
		}
	};

	const logout = async () => {
		try {
			const res: AxiosResponse<AuthResponce> = await axios.get(
				`https://taxivoshod.ru/api/login.php?logout=1`,
				{ withCredentials: true }
			);
			return res.data;
		} catch (error) {
			console.log((error as AxiosError).response);
		} finally {
			dispatch({
				type: actions.LOGOUT
			});
			localStorage.removeItem("voshod-user");
		}
	};

	const login = (data: AuthResponce) => {
		dispatch({
			type: actions.LOGIN,
			payload: data
		});
	}

	useEffect(() => {
		initialize().catch(console.error);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				...state,
				register,
				initialize,
				logout
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthConsumer = AuthContext.Consumer;