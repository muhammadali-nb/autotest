import React from "react";

const PersonalAccountData: React.FC<{
	data: { name: string, last_name: string, middle_name: string }
}> = (props) => {
	return (
		<div className="personal-account-data">
			<div className="personal-account-data_image">
				<img src="" alt="" />
			</div>
			<div className="personal-account-data_body">
				<h4 className="personal-account-data_name">{props.data.last_name}</h4>
				<p className="personal-account-data_fullname">{props.data.name + ' ' + props.data.middle_name}</p>
			</div>
		</div>
	);
};

export default PersonalAccountData;
