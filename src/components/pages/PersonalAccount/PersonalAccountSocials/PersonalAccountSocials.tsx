import React from "react";
import "./PersonalAccountsSocials.scss";
import { userManagerProps } from "../PersonalAccountPage";
import { Link } from "react-router-dom";
import vk from '../../../../images/personal-account/social/vk.svg';
import wp from '../../../../images/personal-account/social/wp.svg';
import tg from '../../../../images/personal-account/social/tg.svg';

const PersonalAccountSocials: React.FC<{
	data: userManagerProps
}> = (props) => {
	const { data } = props;

	const socialIcon = (type: string) => {
		switch(type) {
			case "vk": return vk;
			case "wp": return wp;
			case "tg": return tg;
			default: return;
		}
	}

	return (
		<div className="personal-account-socials">
			<h1 className="personal-account-socials_header">Ваш менеджер</h1>
			<div className="personal-account-socials_divider"></div>
			<h4 className="personal-account-socials_name">{data.last_name}</h4>
			<h3 className="personal-account-socials_fullname">{data.first_name + " " + data.middle_name}</h3>
			<p className="personal-account-socials_number">{data.phone}</p>
			<p className="personal-account-socials_email">{data.email}</p>
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
	);
};

export default PersonalAccountSocials;
