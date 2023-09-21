import React, { RefObject, useState } from "react";
import {
	ModalTemplateConfirm,
	ModalTemplateInput,
	ModalTemplatePhone,
	ModalTemplateTextarea,
} from "./ModalFormTemplate";
import Api, { CallRequestData } from "../../Api";
import Utils from "../../Utils";

const ContactsFormSent = (props) => (
	<div className={"contacts__form" + (props.big ? " contacts__form-big" : "")}>
		<div
			style={{
				marginTop: props.big ? "130px" : "60px",
				marginBottom: props.big ? "100px" : "50px",
			}}>
			<div className={"call-content-text-header"}>
				Спасибо <br />
				за обращение
			</div>
			<div className={"call-content-text"}>Наш специалист с вами свяжется</div>
			<div className={"call-content-text"}>Пожалуйста, ожидайте</div>
			<div
				style={{ width: "100px", height: "6px", margin: "20px 0" }}
				className={"bg-red-color"}></div>
		</div>
	</div>
);

const ContactsForm: React.FC<{
	big?: boolean;
	className?: string;
	contactsFormRef?: RefObject<HTMLDivElement>;
	toggle?: boolean;
}> = (props) => {
	const [data, setData] = useState<CallRequestData>({
		name: "",
		lastName: "",
		phone: "",
		confirm: false,
		errors: {},
	});
	const [sent, setSent] = useState(false);
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
				setSent(true);
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
		<div
			className={"d-flex flex-column w-100 h-100"}
			ref={props.contactsFormRef}>
			{sent && <ContactsFormSent {...props} />}
			{!sent && (
				<div
					className={
						"contacts__form" + (props.big ? " contacts__form-big" : "")
					}>
					<div
						className={"d-grid"}
						style={{ gridTemplateColumns: "1fr 1fr ", gridColumnGap: "15px" }}>
						<div style={{ gridColumn: props.big ? "span 1" : "" }}>
							<ModalTemplateInput
								required
								error={data.errors["name"]}
								small={!props.big}
								className={`${props.toggle && "input-form-toggle"}`}
								onInput={(e: any) => update("name", e.target.value)}
								placeholder={"Имя"}
							/>
						</div>
						<div style={{ gridColumn: props.big ? "span 1" : "" }}>
							<ModalTemplateInput
								required
								error={data.errors["lastName"]}
								small={!props.big}
								className={`${props.toggle && "input-form-toggle"}`}
								onInput={(e: any) => update("lastName", e.target.value)}
								placeholder={"Фамилия"}
							/>
						</div>
						<div>
							<ModalTemplatePhone
								name={"phone"}
								required
								error={data.errors["phone"]}
								className={`${props.toggle && "input-form-toggle"}`}
								small={true}
								onInput={(e: any) => update("phone", e.target.value)}
								onChange={(e: any) => update("phone", e.target.value)}
							/>
						</div>
						<div>
							<ModalTemplateInput
								type={"email"}
								name={"email"}
								error={data.errors["email"]}
								className={`${props.toggle && "input-form-toggle"}`}
								small={true}
								onInput={(e: any) => update("email", e.target.value)}
								placeholder={"E-mail"}
							/>
						</div>
						<div style={{ gridColumn: "span 2" }}>
							<ModalTemplateTextarea
								error={data.errors["comment"]}
								small={!props.big}
								onInput={(e: any) => update("comment", e.target.value)}
								placeholder={"Комментарий"}
								value={data.comment}></ModalTemplateTextarea>
						</div>
						<div style={{ gridColumn: "span 2" }}>
							{data.errors["server"] && (
								<div className={"my-2 text-red-color font-size-12"}>
									{data.errors["server"]}
								</div>
							)}
						</div>
					</div>

					{/*<Col xs={12}>*/}
					{/*    {data.errors['phone'] &&*/}
					{/*      <div className={'font-size-12 text-red-color'}>*/}
					{/*          {data.errors['phone']}*/}
					{/*      </div>}*/}

					{/*</Col>*/}

					<div className={" contacts__form-footer  mt-px-40"}>
						<button
							type={"button"}
							onClick={() => send()}
							className={
								"site-btn big " + (props.big && !passed ? "dark" : "")
							}>
							Отправить
						</button>
						<ModalTemplateConfirm
							small={false}
							error={data.errors["confirm"]}
							confirmed={data.confirm}
							onChange={(e) => update("confirm", e.target.checked)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContactsForm;
