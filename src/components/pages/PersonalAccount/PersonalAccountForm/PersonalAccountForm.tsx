import React, { useEffect, useState } from "react";
import "./PersonalAccountForm.scss";
import { userDataProps } from "../PersonalAccountPage";
import editIcon from "../../../../images/common/edit.svg";
import PersonalAccountModal from "../PersonalAccountModal/PersonalAccountModal";
import { MobileModal } from "../../../common/MobileModal/MobileModal";

const PersonalAccountForm: React.FC<{
	data: userDataProps
}> = (props) => {
	const [modalOpened, setModalOpened] = useState(false);
	const [mobileModalOpened, setMobileModalOpened] = useState(false);
	const [editType, setEditType] = useState('phone');
	const [size, setSize] = useState("desk");

	useEffect(() => {
		window.addEventListener("resize", function () {
			setSize(this.window.innerWidth > 767 ? "desk" : "mob");
		});

		setSize(window.innerWidth > 767 ? "desk" : "mob");
		
		return () => {
			window.removeEventListener("resize", function () {
				setSize(this.window.innerWidth > 767 ? "desk" : "mob");
			});
		}
	}, []);

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
						<div className="personal-account_form-edit" onClick={() => {
							setEditType('phone');
							setModalOpened(true);
						}}>
							<img src={editIcon} alt="Изменить номер телефона" />
						</div>
					</div>
					{size === "desk" &&
						<>
							{props.data.email ?
								<div className="personal-account_form-item">
									<input
										value={props.data.email}
										type="text"
										placeholder="E-mail"
										className="contacts__form-input personal-account_form-input"
									/>
									<div className="personal-account_form-edit" onClick={() => {
										setEditType('email');
										setModalOpened(true);
									}}>
										<img src={editIcon} alt="Изменить электронную почту" />
									</div>
								</div>
								:
								<button className="site-btn dark w-100" onClick={(e) => {
									e.preventDefault();
									setEditType("email");
									setModalOpened(true);
								}}>
									<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
										<path d="M9.5 3V9M9.5 9H15.5M9.5 9H3.5M9.5 9V15" stroke="#222222" stroke-Width="2" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									Добавить E-mail
								</button>
							}
						</>
					}
				</div>
				{size === "mob" &&
					<div className="personal-account_form-mobActions">
						<button className="site-btn dark w-100" onClick={(e) => {
							e.preventDefault();
							setEditType("phone");
							setMobileModalOpened(true);
						}}>
							Изменить телефон
						</button>
						<button className="site-btn dark w-100" onClick={(e) => {
							e.preventDefault();
							setEditType("email");
							setMobileModalOpened(true);
						}}>
							{!props.data.email ? <>Добавить E-mail</> : <>Изменить E-mail</>}
						</button>

						<MobileModal type="editPhone" active={mobileModalOpened && editType === "phone"} setActive={setMobileModalOpened} />
						<MobileModal type="editEmail" active={mobileModalOpened && editType === "email"} setActive={setMobileModalOpened} />
					</div>
				}
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

			<PersonalAccountModal onHide={() => setModalOpened(false)} show={modalOpened} type={editType} currentPhone={props.data.phone} />
		</>
	);
};

export default PersonalAccountForm;
