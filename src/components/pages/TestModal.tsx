import React from "react";
import ModalFormTemplate from "../common/ModalFormTemplate";
import { useNavigate, useParams } from "react-router-dom";

const TestModal = () => {
	let { id } = useParams<"id">();
	const navigate = useNavigate();
	return (
		<ModalFormTemplate show={true} onHide={() => navigate(-1)}>
			hello world {id}{" "}
		</ModalFormTemplate>
	);
};

export default TestModal;
