import React, { useState } from "react";
import "./PersonalAccountForm.scss";
import { userDataProps } from "../PersonalAccountPage";
const PersonalAccountForm: React.FC<{
	data: userDataProps
}> = (props) => {


	return (
		<form className="personal-account_form">
			<div className={"personal-account_form-topic"}>
				<h3>ФИО</h3>
				<input type="text" placeholder="Имя" value={props.data.name} className="contacts__form-input" />
				<input
					value={props.data.last_name}
					type="text"
					placeholder="Фамилия"
					className="contacts__form-input personal-account_form-input"
				/>
				<input
					value={props.data.middle_name}
					type="text"
					placeholder="Отчество"
					className="contacts__form-input personal-account_form-input"
				/>
			</div>
			<div className={"personal-account_form-topic"}>
				<h3>Контакты</h3>
				<input
					value={props.data.phone}
					type="text"
					placeholder="+7 (___) ___ - __ - __"
					className="contacts__form-input personal-account_form-input"
				/>
				{!props.data.email ?
					<button className="site-btn dark w-100">
						Добавить E-mail
					</button>
					:
					<input
						value={props.data.email}
						type="text"
						placeholder="E-mail"
						className="contacts__form-input personal-account_form-input"
					/>
				}
			</div>
			<div className={"personal-account_form-topic"}>
				<h3>Дата рождения</h3>
				<input
					value={new Date(props.data.birth_date).toISOString().substring(0, 10)}
					type="date"
					placeholder="00.00.0000"
					className="contacts__form-input personal-account_form-input"
				/>
			</div>
		</form>
	);
};

export default PersonalAccountForm;
