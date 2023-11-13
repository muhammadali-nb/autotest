import React, { ReactNode, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Api, { CallRequestData } from "../../Api";
import ModalFormTemplate, {
	ModalTemplateConfirm,
	ModalTemplateContent,
	ModalTemplateInput,
	ModalTemplatePhone,
} from "./ModalFormTemplate";
import Utils from "../../utils/Utils";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons/faPhoneVolume";
import callIcon from "../../img/common/Phone-header.svg";
import callIconDark from "../../img/common/Phone-header-dark.svg";

const CallRequestFormContent: React.FC<{
	closeFunc: () => void;
	setSent: (boolean) => void;
}> = (props) => {
	const [data, setData] = useState<CallRequestData>({
		name: "",
		lastName: "",
		phone: "",
		confirm: false,
		errors: {},
		middleName: "",
	});
	const [passed, setPassed] = useState(false);
	const send = () => {
		let errors = Utils.validateForm(data);
		if (Object.keys(errors).length > 0) {
			setData({ ...data, errors: errors });
			setPassed(false);
			return;
		}
		Api.callRequest(data).then((resp) => {
			if (Api.isError(resp)) {
				setData({
					...data,
					errors: { server: "Ошибка соединения с сервером!" },
				});
				return;
			}

			if (resp.success) {
				props.setSent(true);
				setPassed(true);
			} else {
				setData({ ...data, errors: resp.fields ?? {} });
				setPassed(false);
			}
		});
	};
	const update = (field: string, value: any) => {
		let errors = data.errors;
		delete errors[field];
		let newData = { ...data, [field]: value, errors: errors };
		setData(newData);
		errors = Utils.validateForm(newData);
		setPassed(Object.keys(errors).length === 0);
	};
	return (
		<ModalTemplateContent>
			<div>
				<div className={"call-content_close-btn"}>
					<button
						className={
							"default-link font-size-18 font-weight-semibold text-hover-default"
						}
						onClick={() => props.closeFunc()}>
						<FontAwesomeIcon icon={faAngleLeft} />
						&nbsp;&nbsp;ВЕРНУТЬСЯ
					</button>
				</div>
				<div>
					<div className={"call-content-text-header"}>заказать звонок</div>
					<div className={"call-content-text"}>
						Оставьте свой номер телефона и мы перезвоним <br /> вам в ближайшее
						время
					</div>
					<div style={{ marginTop: "60px" }}>
						<ModalTemplateInput
							error={data.errors["name"]}
							onInput={(e: any) => update("name", e.target.value)}
							placeholder={"Имя"}
							small={false}
						/>
						<ModalTemplateInput
							error={data.errors["lastName"]}
							onInput={(e: any) => update("lastName", e.target.value)}
							placeholder={"Фамилия"}
							small={false}
						/>
						<ModalTemplatePhone
							small={false}
							error={data.errors["phone"]}
							onInput={(e: any) => update("phone", e.target.value)}
							onChange={(e: any) => update("phone", e.target.value)}
						/>
					</div>
					{data.errors["server"] && (
						<div className={"my-2 text-red-color font-size-12"}>
							{data.errors["server"]}
						</div>
					)}
				</div>
			</div>

			<div>
				<button
					className={"site-btn small " + (!passed ? "dark" : "")}
					onClick={() => send()}>
					Перезвоните мне
				</button>
				<ModalTemplateConfirm
					small={false}
					error={data.errors["confirm"]}
					confirmed={data.confirm}
					onChange={(e) => update("confirm", e.target.checked)}
				/>
			</div>
		</ModalTemplateContent>
	);
};
const CallRequestFormConfirmed: React.FC<{
	closeFunc: () => void;
}> = (props) => {
	return (
		<ModalTemplateContent>
			<div style={{ marginTop: "130px" }}>
				<div className={"call-content-text-header"}>
					Спасибо <br />
					за обращение
				</div>
				<div className={"call-content-text"}>
					Наш специалист с вами свяжется
				</div>
				<div className={"call-content-text"}>Пожалуйста, ожидайте</div>
				<div
					style={{ width: "100px", height: "6px", margin: "20px 0" }}
					className={"bg-red-color"}></div>
			</div>
			<div>
				<button className={"site-btn small"} onClick={() => props.closeFunc()}>
					Закрыть
				</button>
			</div>
		</ModalTemplateContent>
	);
};

const CallRequestForm: React.FC<{
	light?: boolean;
	text?: string | ReactNode;
	small?: boolean;
	className?: string;
}> = (props) => {
	const [show, setShow] = useState(false);
	const [sent, setSent] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<>
			{props.text ? (
				<button
					className={
						`site-btn  ${props.className}  ` +
						(props.light ? " light" : "") +
						(props.small ? " small" : "")
					}
					onClick={handleShow}>
					{props.text ?? (
						<>
							Заказать звонок&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<FontAwesomeIcon icon={faArrowRight} />
						</>
					)}
				</button>
			) : (
				<img
					onClick={handleShow}
					src={props.light ? callIcon : callIconDark}
					alt="order call"
					className={props.className}
				/>
				// <FontAwesomeIcon
				// 	onClick={handleShow}
				// 	className={`header-mobile_phone ${
				// 		props.light
				// 			? "header-mobile_phone_light"
				// 			: "header-mobile_phone_dark"
				// 	} `}
				// 	icon={faPhoneVolume}
				// />
			)}

			<ModalFormTemplate show={show} onHide={handleClose} centered size={"xl"}>
				{!sent && (
					<CallRequestFormContent closeFunc={handleClose} setSent={setSent} />
				)}
				{sent && <CallRequestFormConfirmed closeFunc={handleClose} />}
			</ModalFormTemplate>
		</>
	);
};

export default CallRequestForm;
