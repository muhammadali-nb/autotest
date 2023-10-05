import React from "react";
import "./PersonalAccountForm.scss";
const PersonalAccountForm = () => {
	return (
		<form className="personal-account_form">
			<h3>ФИО</h3>
			<input type="text" placeholder="Имя" className="contacts__form-input" />
			<input
				type="text"
				placeholder="Фамилия"
				className="contacts__form-input"
			/>
			<input
				type="text"
				placeholder="Отчество"
				className="contacts__form-input"
			/>

			<h3>Контакты</h3>
			<input
				type="text"
				placeholder="+7 (___) ___ - __ - __"
				className="contacts__form-input"
			/>
			<input
				type="text"
				placeholder="E-mail"
				className="contacts__form-input"
			/>

			<h3>Дата рождения</h3>
			<input
				type="text"
				placeholder="00.00.0000"
				className="contacts__form-input"
			/>
		</form>
	);
};

export default PersonalAccountForm;
