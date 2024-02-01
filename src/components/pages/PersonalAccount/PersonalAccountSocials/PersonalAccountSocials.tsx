import React from "react";
import "./PersonalAccountsSocials.scss";
import { userManagerProps } from "../PersonalAccountPage";
import { Link } from "react-router-dom";
import vk from '../../../../images/personal-account/social/vk.svg';
import wp from '../../../../images/personal-account/social/wp.svg';
import tg from '../../../../images/personal-account/social/tg.svg';
import tgBlue from "../../../../images/personal-account/social/tg-blue.svg";

const PersonalAccountSocials: React.FC<{
	data: userManagerProps,
	tg_connected: boolean
}> = (props) => {
	const { data, tg_connected } = props;

	const socialIcon = (type: string) => {
		switch (type) {
			case "vk": return vk;
			case "wp": return wp;
			case "tg": return tg;
			default: return;
		}
	}

	return (
		<div className="personal-account-socials">
			<div className="personal-account-socials_wrapper">
				<h1 className="personal-account-socials_header">Ваш менеджер</h1>
				<div className="personal-account-socials_divider"></div>
				<h4 className="personal-account-socials_name">{data.last_name}</h4>
				<h3 className="personal-account-socials_fullname">{data.first_name + " " + data.middle_name}</h3>
				<Link className="personal-account-socials_number" to={"tel:" + data.phone}>{data.phone}</Link>
				<Link className="personal-account-socials_email" target="_blank" to={"mailto:" + data.email}>{data.email}</Link>
				<div className="d-flex justify-content-between align-items-end">
					<p className="personal-account-socials_worktime">
						Мы на связи каждый день с 10:00 до 19:00
					</p>
					<div className="personal-account-socials_links">
						{data.social && data.social.map((item, index) =>
							<Link target="_blank" to={item.url} className="personal-account-socials_link" key={index}>
								<img src={socialIcon(item.type)} alt={item.type} />
							</Link>
						)}
					</div>
				</div>
			</div>
			<Link className={"personal-account-socials_wrapper tg " + (tg_connected ? "connected" : "")} target="_blank" to={"/"}>
				<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
					<rect width="40" height="40" rx="20" fill="url(#paint0_linear_5970_50547)" />
					<path fillRule="evenodd" clipRule="evenodd"
						d="M9.04622 19.7917C14.8771 17.2595 18.7588 15.5768 20.708 14.7605C26.2557 12.4448 27.4219 12.045 28.1716 12.0283C28.3382 12.0283 28.7047 12.0616 28.9546 12.2616C29.1545 12.4282 29.2045 12.6447 29.2378 12.8113C29.2711 12.9779 29.3044 13.3278 29.2711 13.5943C28.9713 16.7597 27.6718 24.4398 27.0054 27.9717C26.7222 29.471 26.1724 29.9708 25.6393 30.0208C24.4731 30.1208 23.5902 29.2545 22.474 28.5214C20.708 27.3719 19.7251 26.6556 18.0092 25.5227C16.0266 24.2232 17.3094 23.5069 18.4423 22.3407C18.7422 22.0408 23.8567 17.3761 23.9567 16.9596C23.9733 16.9096 23.9733 16.7097 23.8567 16.6097C23.7401 16.5098 23.5735 16.5431 23.4402 16.5764C23.257 16.6097 20.4581 18.4756 15.0104 22.1574C14.2107 22.7072 13.4944 22.9738 12.8446 22.9571C12.1283 22.9404 10.7622 22.5573 9.72927 22.2241C8.47979 21.8242 7.48021 21.6077 7.56351 20.908C7.61349 20.5414 8.11328 20.1749 9.04622 19.7917Z"
						fill="white" />
					<defs>
						<linearGradient id="paint0_linear_5970_50547" x1="0" y1="40" x2="40" y2="0"
							gradientUnits="userSpaceOnUse">
							<stop offset="0.146484" stopColor="#239FDB" />
							<stop offset="0.853516" stopColor="#28A8EA" />
						</linearGradient>
					</defs>
				</svg>
				{tg_connected ?
					<p className="font-size-18">
						Telegram подключен!
					</p>
					:
					<>
						<p className="font-size-18">
							Подключите Telegram <br />
							для бесплатных сообщений
						</p>
						<div className="personal-account-socials_tg">
							Подключить
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
								<path d="M16.25 9L12.061 4.5M16.25 9L12.061 13.5M16.25 9H2.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
						<div className="personal-account-socials_mobIcon">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
								<path d="M10 18L16 12L10 6" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
					</>
				}
			</Link>
		</div>

	);
};

export default PersonalAccountSocials;
