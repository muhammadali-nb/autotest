import axios from "axios";
import React, { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader";

const Payment = () => {
	const { pid, id } = useParams();
	const navigate = useNavigate();

	const checkPayment = async () => {
		try {
			axios
				.get(`https://taxivoshod.ru/api/voshod-auto/?w=check-pay&pid=${pid}`)
				.then((res) => {
					if (res.data.result === 1) {
						navigate(`/rent/page/1/car/${id}`, {
							state: {
								status: "success",
								payment_status: res.data.status,
							},
						});
					} else {
						navigate(`/rent/page/1/car/${id}`, {
							state: null,
						});
					}
				});
		} catch (error) {
			// console.log(error);
			navigate(`/rent/page/1/car/${id}`, {
				state: null,
			});
		}
	};

	// const testCheck = () => {
	// 	navigate(`/rent/page/1/car/${id}`, {
	// 		state: {
	// 			status: "success",
	// 			payment_status: "CONFIRMED",
	// 		},
	// 	});
	// };

	useEffect(() => {
		checkPayment();
	}, []);

	return <Loader />;
};

export default Payment;
