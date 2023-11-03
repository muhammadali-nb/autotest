import call from "../../../img/common/phone-call.svg";
import back from "../../../img/common/back.svg";
import { HeaderLogoImage } from "../../layout/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// type TypeReptBookingCarStep = "start" | ""

export const RentModalMobile = ({
	active,
	setActive,
}: {
	active: boolean;
	setActive: (e: boolean) => void;
}) => {
  const [step, setStep] = useState()
	useEffect(() => {
		if (active) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "unset";
	}, [active]);


	return (
		<div className={`mobile-modal ${active && "active"}`}>
			<div className="mobile-modal_header">
				<div className="mobile-modal_header-top">
					<img src={back} onClick={() => setActive(false)} alt="" />
					<HeaderLogoImage width={"100px"} height={"24px"} image="light" />
					<img src={call} alt="" />
				</div>
				<div className="mobile-modal_header-bottom">
					<h3>
						Доступные <br /> автомобили
					</h3>
					<p>
						С нами просто. <br /> Индивидуальные решения для вас
					</p>
				</div>
			</div>
			<div className="mobile-modal_body">
				<h1>
					Заявка <br /> на автомобиль
				</h1>
				<p>
					Оставьте свой номер телефона и мы перезвоним вам в ближайшее время
				</p>
				<form>
					<input
						type="text"
						className="contacts__form-input mobile-modal_body-input"
						placeholder="+ 7 000 000 00 00"
					/>
					
				</form>
				<button className="site-btn dark mb-px-25">перезвоните мне</button>
				<p className="form-mobile-policy ">
					Нажимая на кнопку “Забронировать”, вы соглашаетесь с{" "}
					<Link
						to={"/policy"}
						target={"_blank"}
						className={
							"default-link dark underlined form-mobile-policy-link "
							// (props.error ? "text-red-color" : "")
						}>
						Условиями обработки персональных данных
					</Link>
				</p>
				<div className=" personal-account_footer mobile-modal_body-company ">
					ООО ВОСХОДⓒ 2023 год
				</div>
			</div>
		</div>
	);
};
