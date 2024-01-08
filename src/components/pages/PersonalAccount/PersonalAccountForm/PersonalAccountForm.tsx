import React, { useEffect, useRef, useState } from "react";
import "./PersonalAccountForm.scss";
import { userDataProps } from "../PersonalAccountPage";
import editIcon from "../../../../images/common/edit.svg";
import PersonalAccountModal from "../PersonalAccountModal/PersonalAccountModal";
import { MobileModal } from "../../../common/MobileModal/MobileModal";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Calendar } from "react-date-range";
import { ru } from "date-fns/locale";

const DatePicker: React.FC<{
	value: string
}> = (props) => {
	const { value } = props;

	const [pickerOpened, setPickerOpened] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);

	const pickerRef = useRef<HTMLDivElement>(null);

	const onChange = (date) => {
		setCurrentValue(date);
		setPickerOpened(false);
	}

	const getDate = (date: string) => {
		const newDate = new Date(date);
		let day: number = newDate.getDate();
		let month: number = newDate.getMonth() + 1;

		let dayField: string | number = "";
		let monthField: string | number = "";

		if (day < 10) {
			dayField = '0' + day;
		} else {
			dayField = day;
		}
		if (month < 10) {
			monthField = '0' + month
		} else {
			monthField = month;
		}

		return `${dayField}.${monthField}.${newDate.getFullYear()}`
	}

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (e.target instanceof Node && !pickerRef.current?.contains(e.target))
				setPickerOpened(false);
		}

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		}
	}, []);

	return (
		<div className={"personal-account_form-date " + (pickerOpened ? "active" : "")} ref={pickerRef}>
			<div className="personal-account_form-date_value" onClick={() => setPickerOpened(prev => !prev)}>
				{getDate(currentValue)}
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
					<path d="M6.33333 0.916992V4.58366M13.6667 0.916992V4.58366M18.25 8.25033H1.75M5.41667 11.917H6.33333M9.54167 11.917H10.4583M13.6667 11.917H14.5833M5.41667 15.5837H10.4583M13.6667 15.5837H14.5833M3.58333 19.2503H16.4167C17.3759 19.2503 18.25 18.3375 18.25 17.417V4.58366C18.25 3.66318 17.4724 2.75033 16.5132 2.75033H3.58333C2.6241 2.75033 1.75 3.66318 1.75 4.58366V17.417C1.75 18.3375 2.6241 19.2503 3.58333 19.2503Z" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
			<Calendar
				className={pickerOpened ? 'active' : ''}
				locale={ru}
				date={new Date(currentValue) || new Date()}
				onChange={onChange}
				weekdayDisplayFormat={'EEEEEE'}
			/>
		</div>
	)
}

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
					<div className="personal-account_from-item">
						<DatePicker value={props.data.birth_date} />
					</div>
				</div>
			</form>

			<PersonalAccountModal onHide={() => setModalOpened(false)} show={modalOpened} type={editType} currentPhone={props.data.phone} />
		</>
	);
};

export default PersonalAccountForm;
