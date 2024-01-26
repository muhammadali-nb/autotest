import axios, { AxiosError, AxiosResponse } from "axios";
import { ReactNode, createContext, useEffect, useReducer } from "react";
import {
	AuthInitialState,
	AuthResponce,
	RegisterErrorType,
} from "../types/AuthContextTypes";
import { jwtDecode } from "jwt-decode";
const actions = {
	INITIALIZE: "INITIALIZE",
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	LOGOUT: "LOGOUT",
	CONFIRMPHONE: "CONFIRMPHONE",
	LOGINCONFIRM: "LOGINCONFIRM",
	INITIALIZETEST: "INITIALIZETEST",
};

const localData = localStorage.getItem("voshod-user");
const initialState: AuthInitialState = localData !== null ? JSON.parse(localData) : {
	isAuthenticated: false,
	user_status: null,
	has_profile: false,
	isInitialized: false,
	middle_name: "",
	last_name: "",
	phone: null,
	access_token: null,
};

const handlers = {
	INITIALIZE: (state: AuthInitialState, action) => {
		const {
			isAuthenticated,
			api_status,
			user_status,
			has_profile,
			first_name,
			middle_name,
			last_name,
			phone,
			access_token,
		} = action.payload;

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
			phone,
			access_token,
		};
	},
	LOGIN: (state: AuthInitialState, action) => {
		const {
			user,
			user_status,
			has_profile,
			error_message,
			api_status,
			first_name,
			middle_name,
			last_name,
			phone,
		} = action.payload;

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
			phone,
		};
	},
	LOGOUT: (state: AuthInitialState) => ({
		...state,
		isAuthenticated: false,
		user: null,
	}),
	REGISTER: (state: AuthInitialState, action) => {
		const {
			user,
			user_status,
			has_profile,
			error_message,
			api_status,
			first_name,
			middle_name,
			last_name,
			phone,
			access_token,
		} = action.payload;

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
			phone,
			access_token,
		};
	},
	CONFIRMPHONE: (state: AuthInitialState, action) => {
		const {
			isAuthenticated,
			api_status,
			user_status,
			has_profile,
			first_name,
			middle_name,
			last_name,
			phone,
		} = action.payload;

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
			phone,
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
				const {
					success,
					reason,
					has_profile,
					first_name,
					middle_name,
					last_name,
					phone,
				} = res.data;
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
							phone: null
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

			//@ts-ignore
			const access_token = res.headers?.get("x-jwt-access");
			//@ts-ignore
			const refresh_token = res.headers?.get("x-jwt-refresh");
			if (refresh_token) localStorage.setItem("refreshToken", refresh_token);
			if (access_token) localStorage.setItem("accessToken", access_token);

			dispatch({
				type: actions.REGISTER,
				payload: {
					isAuthenticated: true,
					api_status: "success",
					has_profile: res.data.has_profile,
					user_status: null,
					err_message: null,
					first_name: res.data.first_name,
					middle_name: res.data.middle_name,
					last_name: res.data.last_name,
					phone: res.data.phone,
					access_token: access_token,
				},
			});

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
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("accessToken");
			return res.data;
		} catch (error) {
			console.log((error as AxiosError).response);
		} finally {
			dispatch({
				type: actions.LOGOUT,
			});
			localStorage.removeItem("voshod-user");
		}
	};

	const login = async (data: AuthResponce) => {
		try {
			const res: AxiosResponse<AuthResponce> = await axios.get(
				`https://taxivoshod.ru/api/login.php?logout=1`,
				{ withCredentials: true }
			);
			const { refresh_token } = res.data;

			if (refresh_token) localStorage.setItem("refreshToken", refresh_token);

			dispatch({
				type: actions.LOGIN,
				payload: data,
			});

			return res.data;
		} catch (e) {
			console.log(e);
		}
	};

	const initializetest = async () => {
		const stored_refresh_token =
			globalThis.localStorage.getItem("refreshToken");
		const stored_access_token = globalThis.localStorage.getItem("accessToken");
		const stored_expiration_date = jwtDecode(stored_access_token as string).exp;
		console.log("old " + stored_access_token);
		if (!stored_refresh_token && !stored_access_token) {
			return;
		}

		const sendToken = () => {
			//@ts-ignore
			if (new Date() > stored_expiration_date) {
				console.log("access");
				return stored_access_token;
			} else {
				console.log("refresh");
				return stored_refresh_token;
			}
		};

		try {
			const res = axios.get(
				"https://taxivoshod.ru/api/voshod-auto/?w=refresh-token",
				{
					headers: {
						Authorization: `Bearer ${sendToken()}`,
					},
					withCredentials: true,
				}
			);

			//@ts-ignore
			const new_access_token = res.headers?.get("x-jwt-access");
			//@ts-ignore
			const new_refresh_token = res.headers?.get("x-jwt-refresh");
			if (new_refresh_token)
				localStorage.setItem("refreshToken", new_access_token);
			if (new_access_token)
				localStorage.setItem("accessToken", new_access_token);

			console.log("new " + new_access_token);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		initialize().catch(console.error);
	}, []);

	useEffect(() => {
		initializetest().catch(console.error);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				...state,
				register,
				initialize,
				logout,
				initializetest,
				login,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const AuthConsumer = AuthContext.Consumer;
