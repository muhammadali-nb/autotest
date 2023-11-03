import React from "react";
import { Link } from "react-router-dom";
import { ModalTemplatePhone } from "../../../ModalFormTemplate";

const RentModalMobileStart = () => {
	return (
		<>
			<h1>
				Бронирование <br /> <span>Grand Vitara</span>
			</h1>
			<p>
				Оставьте свой номер телефона <br /> и мы перезвоним вам в ближайшее
				время
			</p>
			<form>
				<ModalTemplatePhone
					className="contacts__form-input mobile-modal_body-input"
					placeholder="+ 7 000 000 00 00"
					small={true}
				/>
			</form>
			<button className="site-btn dark mb-px-25">Отправить код</button>
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
			<div className=" personal-account_footer mobile-modal_body-company ">
				ООО ВОСХОДⓒ 2023 год
			</div>
		</>
	);
};

export default RentModalMobileStart;
