import React, { useState } from "react";
import "./PersonalAccountForm.scss";
import { userDataProps } from "../PersonalAccountPage";
import editIcon from "../../../../images/common/edit.svg";

const PersonalAccountForm: React.FC<{
	data: userDataProps
}> = (props) => {


	return (
		<>
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
					<div className="personal-account_form-item">
						<input
							value={props.data.phone}
							type="text"
							placeholder="+7 (___) ___ - __ - __"
							className="contacts__form-input personal-account_form-input"
						/>
						<div className="personal-account_form-edit">
							<img src={editIcon} alt="Изменить номер телефона" />
						</div>
					</div>
					{!props.data.email ?
						<button className="site-btn dark w-100">
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
								<path d="M9.5 3V9M9.5 9H15.5M9.5 9H3.5M9.5 9V15" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
							Добавить E-mail
						</button>
						:
						<div className="personal-account_form-item">
							<input
								value={props.data.email}
								type="text"
								placeholder="E-mail"
								className="contacts__form-input personal-account_form-input"
							/>
							<div className="personal-account_form-edit">
								<img src={editIcon} alt="Изменить электо" />
							</div>
						</div>
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
		</>
	);
};

export default PersonalAccountForm;
