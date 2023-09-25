import React from "react";
import img from "../../img/common/modal-image.png";
import { FormCheck, Modal, ModalProps } from "react-bootstrap";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";

interface ModalTemplateInputProps {
	error?: string;
	placeholder?: string;
	onInput?: any;
	onChange?: any;
	value?: any;
	confirmed?: boolean;
	show_text?: any;
	className?: string;
	container_class_name?: string;
	container_style?: React.CSSProperties;
	style?: React.CSSProperties;
	small: any;
	[x: string]: any;
}
export const ModalTemplateInput: React.FC<ModalTemplateInputProps> = (
	props
) => {
	return (
		<div
			className={
				"call-content-input " +
				(props.error ? "error " : "") +
				(props.small ? "small-form-input " : "") +
				(props.container_class_name ?? "")
			}
			style={props.container_style}
			data-error={
				props.error &&
				(typeof props.show_text == "undefined" ? true : props.show_text)
					? props.error
					: ""
			}>
			<input
				{...props}
				type="text"
				onInput={props.onInput}
				className={
					"contacts__form-input " +
					(props.error ? "error " : "") +
					(props.className ?? "")
				}
				placeholder={props.placeholder}
				value={props.value}
				style={props.style}
			/>
		</div>
	);
};
export const ModalTemplateTextarea: React.FC<ModalTemplateInputProps> = (
	props
) => {
	return (
		<div
			className={
				"contacts__form-textarea-container " +
				(props.error ? " error" : "") +
				(props.small ? " small-form-input" : "")
			}
			data-error={
				props.error &&
				(typeof props.show_text == "undefined" ? true : props.show_text)
					? props.error
					: ""
			}>
			<textarea
				className={"contacts__form-textarea " + (props.error ? " error" : "")}
				onInput={props.onInput}
				value={props.value ?? ""}
				placeholder={props.placeholder}></textarea>
		</div>
	);
};
export const ModalTemplatePhone: React.FC<ModalTemplateInputProps> = (
	props
) => {
	return (
		<div
			className={
				"call-content-input " +
				(props.error ? " error" : "") +
				(props.small ? " small-form-input" : "")
			}
			data-error={
				props.error &&
				(typeof props.show_text == "undefined" ? true : props.show_text)
					? props.error
					: ""
			}>
			<InputMask
				{...props}
				className={"contacts__form-input " + (props.error ? " error" : "")}
				mask="+7 999 999 99 99"
				maskChar=" "
				type="tel"
				placeholder={"+7 000 000 00 00"}
			/>
		</div>
	);
};
export const ModalTemplateConfirm: React.FC<ModalTemplateInputProps> = (
	props
) => {
	return (
		<div style={{ marginTop: "20px" }}>
			{props.error && (
				<div className={"my-2 text-red-color font-size-12"}>
					Подтвердите согласие с условиями политики
				</div>
			)}
			<FormCheck
				checked={props.confirmed}
				onChange={props.onChange}
				label={
					<span
						style={{ fontSize: "14px" }}
						className={
							"font-weight-medium " + (props.error ? "text-red-color" : "")
						}>
						Я соглашаюсь с&nbsp;
						<Link
							to={"/policy"}
							target={"_blank"}
							className={
								"default-link dark underlined " +
								(props.error ? "text-red-color" : "")
							}>
							Условиями обработки персональных данных
						</Link>
					</span>
				}
			/>

			<p className="form-mobile-policy">
				Нажимая на кнопку “Забронировать”, вы соглашаетесь с{" "}
				<Link
					to={"/policy"}
					target={"_blank"}
					className={
						"default-link dark underlined form-mobile-policy-link " +
						(props.error ? "text-red-color" : "")
					}>
					Условиями обработки персональных данных
				</Link>
			</p>
		</div>
	);
};
export const ModalTemplateContent: React.FC<{ children: React.ReactNode }> = (
	props
) => {
	return <div className={"modal-content-block"}>{props.children}</div>;
};
const ModalTemplateImage = () => {
	return (
		<div
			className={"modal-image-block"}
			style={{ backgroundImage: `url('${img}')` }}>
			<div className={"call-request-text-header"}>
				Доступные
				<br />
				автомобили
			</div>
			<div className={"call-request-text"}>
				С нами просто.
				<br />
				Индивидуальные решения для вас.
			</div>
		</div>
	);
};
const ModalFormTemplate: React.FC<ModalProps> = (props) => {
	return (
		<Modal {...props} centered size={"xl"}>
			<div className={"modal-template"}>
				{props.image ?? <ModalTemplateImage />}
				<div className={"modal-content-block-container"}>{props.children}</div>
			</div>
		</Modal>
	);
};

export default ModalFormTemplate;
