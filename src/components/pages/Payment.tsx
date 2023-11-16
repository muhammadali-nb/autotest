import axios from "axios";
import React, { useEffect } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";

const Payment = () => {
	const { pid } = useParams();
	const navigate = useNavigate();

	const checkPayment = async () => {
		try {
			axios
				.get(`https://taxivoshod.ru/api/voshod-auto/?w=check-pay&pid=${pid}`)
				.then((res) => {
					if (res.data.result === 1) {
						navigate("/rent/page/1/car/1", {
							state: {
								status: "success",
								payment_status: res.data.status,
							},
						});
					} else {
						navigate("/rent/page/1/car/1", {
							state: null,
						});
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkPayment();
	}, []);

	return <div>Payment {pid}</div>;
};

export default Payment;
