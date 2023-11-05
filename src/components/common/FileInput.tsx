import React, { ChangeEvent, useEffect, useState } from "react";
import DowloadImage from "../../img/common/download.svg";
import Utils from "../../Utils";

const FileInput = ({ upload }: { upload: (e: any) => void }) => {
	const [image, setImage] = useState<string | undefined>(undefined);
	const [fileName, setFileName] = useState("");

	const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const file = e.target?.files[0];
		setFileName(file.name);
		setImage(URL.createObjectURL(file));
		const base64 = Utils.convertBase64(file);
		base64.then((res) => upload(res)).catch((err) => upload(""));
	};

	return (
		<label className={`file-input ${image && " selected"} `} htmlFor="image">
			{!image ? (
				<>
					<img
						src={DowloadImage}
						className="file-input_icon"
						alt="download file"
					/>
					<p>Добавьте фото водительских прав</p>
				</>
			) : (
				<>
					<img
						className="file-input_selected-image"
						src={image}
						alt={fileName}
					/>
					<p className="file-input_selected-image_name">{fileName}</p>
				</>
			)}
			<input
				type="file"
				name="image"
				id="image"
				onChange={(e) => uploadImage(e)}
			/>
		</label>
	);
};

export default FileInput;
