import React from "react";
import DowloadImage from "../../img/common/download.svg";

const FileInput = () => {
	return (
		<label className="file-input" htmlFor="image">
			<img src={DowloadImage} alt="download file" />
			<p>Добавьте фото водительских прав</p>
			<input type="file" name="image" id="image" />
		</label>
	);
};

export default FileInput;
