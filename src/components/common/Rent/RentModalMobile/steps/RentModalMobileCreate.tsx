import React, { useState } from "react";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import FileInput from "../../../FileInput";
import Utils from "../../../../../utils/Utils";
import {
	CarDataType,
	RentCreateAccountForm,
} from "../../../../../types/RentTypes";
import { CarBookingStepsType } from "../../../CarRentForm";

const RentModalMobileCreate = ({
	step,
	setStep,
	car,
	getPayment,
}: {
	step: CarBookingStepsType;
	setStep: (e: CarBookingStepsType) => void;
	car: CarDataType;
	getPayment: () => void;
}) => {
	const [base64, setBase64] = useState("");
	const [state, setState] = useState<RentCreateAccountForm>({
		name: "",
		lastName: "",
		middleName: "",
		image: "",
		errors: {},
	});
	const [passed, setPassed] = useState(false);
	const createAccount = async () => {
		let errors = Utils.validateRentCreateAccont(state);
		if (Object.keys(errors).length > 0) {
			setState({ ...state, errors: errors });
			setPassed(false);
			return;
		}

		try {
			const res = await fetch("/voshod-auto/?w=update-profile", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					w: "update-profile",
					first_name: state.name,
					last_name: state.lastName,
					middle_name: state.middleName,
					license_photo: base64,
				}),
			});
			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();
			if (data.result === 1) {
				getPayment();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateForm = (field: string, value: any) => {
		let errors = state.errors;
		delete errors[field];
		let newData = { ...state, [field]: value, errors: errors };
		setState(newData);
		errors = Utils.validateRentCreateAccont(newData);
		setPassed(Object.keys(errors).length === 0);
		// Utils.validatePhone(props.data.phone);
	};
	return (
		<div className="mobile-modal_body-create">
			<form>
				<ModalTemplateInput
					placeholder="Фамилия"
					value={state.lastName}
					error={state.errors?.lastName}
					small={true}
					onChange={(e) => updateForm("lastName", e.target.value)}
					onInput={(e) => updateForm("lastName", e.target.value)}
				/>
				<ModalTemplateInput
					placeholder="Имя"
					value={state.name}
					error={state.errors?.name}
					small={true}
					onChange={(e) => updateForm("name", e.target.value)}
					onInput={(e) => updateForm("name", e.target.value)}
				/>
				<ModalTemplateInput
					placeholder="Отчество"
					value={state.middleName}
					error={state.errors?.middleName}
					small={true}
					onChange={(e) => updateForm("middleName", e.target.value)}
					onInput={(e) => updateForm("middleName", e.target.value)}
				/>
				<FileInput className="mt-px-10" upload={setBase64} />
			</form>
			<button
				className={
					"site-btn small " +
					(!passed ? "dark" : "") +
					" mobile-modal_body-confirm_submit-send"
				}
				onClick={createAccount}>
				Перейти к оплате
			</button>
		</div>
	);
};

export default RentModalMobileCreate;
