import React, { useState } from "react";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import FileInput from "../../../FileInput";

const RentModalMobileCreate = () => {
	const [passed, setPassed] = useState(false);
	const [base64, setBase64] = useState('')
	return (
		<div className="mobile-modal_body-create">
			<form>
				<ModalTemplateInput small={true} placeholder="Фамилия" />
				<ModalTemplateInput small={true} placeholder="Имя" />
				<ModalTemplateInput small={true} placeholder="Отчество" />
				<FileInput upload={setBase64} />

			</form>
			<button
				className={
					"site-btn small " +
					(!passed ? "dark" : "") +
					" mobile-modal_body-confirm_submit-send"
				}
				onClick={() => ""}>
				Перейти к оплате
			</button>
		</div>
	);
};

export default RentModalMobileCreate;
