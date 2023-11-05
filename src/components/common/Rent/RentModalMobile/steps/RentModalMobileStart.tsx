import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModalTemplatePhone } from "../../../ModalFormTemplate";
import { ConfirmPhone } from "../../../../../Api";
import { CarDataType } from "../../../../../types/RentTypes";
import { useAuth } from "../../../../../hooks/useAuth";
import Utils from "../../../../../Utils";
import axios from "axios";

const RentModalMobileStart = (props: {
	setStep: (string) => void;
	car: CarDataType;
	setData: (CallRequestData) => void;
	data: ConfirmPhone;
	setTimer: (e: number) => void;
}) => {
	const [passed, setPassed] = useState(false);

	const { user_status } = useAuth();

	const confirmPhone = () => {
		if (user_status === "banned") {
			return;
		}
		axios
			.get(
				`https://taxivoshod.ru/api/login.php?auth=1&reg=1&phone=${props.data.phone}`,
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.success) {
					props.setStep("confirm");
					props.setTimer(res.data.timer ?? 59);
				}
			})
			.catch((e) => console.log(e.response));
	};

	const send = () => {
		let errors = Utils.validateConfirmPhone(props.data);

		if (Object.keys(errors).length > 0) {
			props.setData({ ...props.data, errors: errors });
			setPassed(false);
			return;
		}
		confirmPhone();
	};
	const update = (field: string, value: any) => {
		let errors = props.data.errors;
		delete errors[field];
		let newData = { ...props.data, [field]: value, errors: errors };
		props.setData(newData);
		errors = Utils.validateConfirmPhone(newData);
		setPassed(Object.keys(errors).length === 0);
		Utils.validatePhone(props.data.phone);
	};
	return (
		<div className="mobile-modal_body-start">
			<form>
				<ModalTemplatePhone
					className="contacts__form-input mobile-modal_body-start_input"
					placeholder="+ 7 000 000 00 00"
					small={true}
				/>
			</form>
			{user_status === "banned" ? (
				<p className="text-red-color my-px-10 font-fize-14">
					Вы забанены, и не можете дальше продвигаться
				</p>
			) : (
				<div>
					<button
						className={"site-btn small dark mb-px-25" + (!passed ? "dark" : "")}
						onClick={send}>
						Отправить код
					</button>
				</div>
			)}
			{/* <button className="site-btn dark mb-px-25">Отправить код</button> */}
			<p className="form-mobile-policy ">
				Нажимая на кнопку “Забронировать”, вы соглашаетесь с{" "}
				<Link
					to={"/policy"}
					target={"_blank"}
					className={
						"default-link dark underlined form-mobile-policy-link "
						// (props.error ? "text-red-color" : "")
					}>
					Условиями обработки персональных данных
				</Link>
			</p>
		</div>
	);
};

export default RentModalMobileStart;
