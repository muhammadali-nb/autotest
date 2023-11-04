import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import Utils from "../../../../../Utils";
import { CarBookingStepsType } from "../../../CarRentForm";
import { CarDataType } from "../../../../../types/RentTypes";
import { ModalTemplateInput } from "../../../ModalFormTemplate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const RentModalMobileConfirm = ({
	timerConfirm,
	step,
	setStep,
	car,
	phone,
}: {
	timerConfirm: number;
	step: CarBookingStepsType;
	setStep: (e: CarBookingStepsType) => void;
	car: CarDataType;
	phone: string;
}) => {
	const [passed, setPassed] = useState(false);
	const [code, setCode] = useState("      ");
	const [error, setError] = useState("");
	const [idPrefix] = useState(Utils.randomString());
	const { register, error_message } = useAuth();
	const [timer, setTimer] = useState(timerConfirm);

	useEffect(() => {
		let id = "confirm" + car.id + idPrefix + "-0";
		let item = document.getElementById(id) as HTMLInputElement;
		item?.focus();
		item?.setSelectionRange(0, 1);
		setTimer(timerConfirm);
	}, []);
	useEffect(() => {
		if (timer > 0)
			setTimeout(() => {
				setTimer(timer - 1);
			}, 1000);
	}, [timer]);

	const timerToString = () => {
		let minutes = ("0" + Math.floor(timer / 60)).slice(-2);
		let seconds = ("0" + (timer % 60)).slice(-2);
		return minutes + ":" + seconds;
	};

	const send = async () => {
		if (code.replace(/\D+/g, "").length < 5) {
			setPassed(false);
			return;
		}

		try {
			const res: any = await register(phone, code);
			if (res.success) {
				setStep("create");
				setPassed(true);
			}
		} catch (error) {
			console.log(error);
			setPassed(false);
		}
	};

	const update = (index: number, value: string) => {
		if (!value.replace(/\D/, "")) {
			setPassed(false);
			return;
		}
		let output = code.substring(0, index) + value + code.substring(index + 1);
		setCode(output);

		console.log("update code: " + output);
		let id = "confirm" + car.id + idPrefix + "-" + (index + 1);
		if (index < 5) {
			let item = document.getElementById(id) as HTMLInputElement;
			item?.focus();
			item?.setSelectionRange(0, 1);
		}

		let passed = output.replace(/\D+/g, "").length >= 6;
		setPassed(passed);
		console.log("passed: " + passed);
	};

	return (
		<div className="mobile-modal_body-confirm">
			<div className={"mobile-modal_body-confirm_input"}>
				<ModalTemplateInput
					type={"phone"}
					id={"confirm" + car.id + idPrefix + "-0"}
					container_style={{ maxWidth: "40px" }}
					maxLength={1}
					small={false}
					onInput={(e: any) => update(0, e.target.value)}
				/>
				<ModalTemplateInput
					type={"phone"}
					id={"confirm" + car.id + idPrefix + "-1"}
					container_style={{ maxWidth: "40px" }}
					maxLength={1}
					small={false}
					onInput={(e: any) => update(1, e.target.value)}
				/>
				<ModalTemplateInput
					type={"phone"}
					small={false}
					id={"confirm" + car.id + idPrefix + "-2"}
					container_style={{ maxWidth: "40px" }}
					maxLength={1}
					onInput={(e: any) => update(2, e.target.value)}
				/>
				<ModalTemplateInput
					type={"phone"}
					small={false}
					id={"confirm" + car.id + idPrefix + "-3"}
					container_style={{ maxWidth: "40px" }}
					maxLength={1}
					onInput={(e: any) => update(3, e.target.value)}
				/>
				<ModalTemplateInput
					type={"phone"}
					small={false}
					id={"confirm" + car.id + idPrefix + "-4"}
					container_style={{ maxWidth: "40px" }}
					maxLength={1}
					onInput={(e: any) => update(4, e.target.value)}
				/>
			</div>
			{timer > 0 && (
				<p className="mobile-modal_body-confirm_timer">
					Вы сможете запросить СМС через {timerToString()}
				</p>
			)}
			{timer <= 0 && (
				<div className={"my-px-10"}>
					<button
						className={
							"default-link text-default text-decoration-underline font-size-12"
						}
						onClick={() => ""}>
						Отправить СМС ещё раз
					</button>
				</div>
			)}
			<div
				className={
					"d-flex justify-content-between mobile-modal_body-confirm_submit "
				}>
				<button
					className={
						"site-btn small " +
						(!passed ? "dark" : "") +
						" mobile-modal_body-confirm_submit-send"
					}
					onClick={() => send()}>
					Подтвердить код
				</button>
				<button
					className={
						"default-link text-decoration-none default-transition text-gray-color text-hover-default font-size-12 mobile-modal_body-confirm_change"
					}
					onClick={() => setStep("start")}>
					<FontAwesomeIcon icon={faAngleLeft} />
					&nbsp;&nbsp;&nbsp;Изменить номер
				</button>
			</div>
		</div>
	);
};

export default RentModalMobileConfirm;
