import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../common/Loader";

const Payment = () => {
	const { pid, id } = useParams();
	const navigate = useNavigate();

	const checkPayment = async () => {
		try {
			const res = await axios.get(
				`https://taxivoshod.ru/api/voshod-auto/?w=check-pay&pid=${pid}`
			);
			if (res.data.result === 1) {
				navigate(`/rent/page/1/car/${id}`, {
					state: {
						status: "success",
						payment_status: res.data.status,
					},
				});
			} else {
				navigate(`/rent/page/1/car/${id}`, {
					state: {
						status: "error",
						payment_status: "CANCELED",
					},
				});
			}
		} catch (error) {
			navigate(`/rent/page/1/car/${id}`, {
				state: {
					status: "error",
					payment_status: "CANCELED",
				},
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
