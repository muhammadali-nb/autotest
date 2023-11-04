import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { CarRentDataInfo, CarSameLink } from "../../common/CarCard";
import Api, { ErrorResponse } from "../../../Api";
import { CarDetailLayout } from "../../layout/CarDetailLayout";
import RentCarImagesCarousel from "./RentCarImagesCarousel";
import { Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import rentService from "../../../api-functions/rent-page/rent-service";
import Loader from "../../common/Loader";
import RentCarFullImage from "./RentCarFullImage";
import LoadError from "../../common/LoadError";
import { RentModalMobile } from "../../common/Rent/RentModalMobile/RentModalMobile";
import { useAuth } from "../../../hooks/useAuth";
import { CarBookingStepsType } from "../../common/CarRentForm";

const RentCarDetail = () => {
	const car = useLoaderData() as CarRentDataInfo;
	const { carID } = useParams();
	const [modalFullImage, setModalFullImage] = useState(false);
	const [modalBookingCar, setModalBookingCar] = useState(false);
	const { isAuthenticated, has_profile, initialize } = useAuth();
	const [step, setStep] = useState<CarBookingStepsType>("start");

	const { data, error, isLoading, isSuccess } = useQuery({
		queryKey: [`rent-car-${carID}`, carID],
		queryFn: () => rentService.getOneCar(carID),
	});

	const checkSteps = () => {
		initialize();
		// if (!isAuthenticated && !has_profile) {
		// 	setStep("start");
		// } else if (isAuthenticated && has_profile) {
		// 	setStep("payment");
		// } else if (isAuthenticated && !has_profile) {
		// 	setStep("create");
		// }

		setModalBookingCar(true);
	};

	if (isLoading) return <Loader />;
	if (error) return <LoadError response={error} />;
	return (
		<CarDetailLayout>
			{isSuccess ? (
				<>
					<RentCarImagesCarousel
						setFullScreen={setModalFullImage}
						images={data.item?.images}
					/>
					<Container fluid={"xxl"}>
						<h1 className="car-detail_header">
							{data.item?.brand} <span>{data.item?.model}</span>
						</h1>
						<h4 className="car-detail_id">{data.item?.regnum}</h4>
						<div className="car-detail_price">
							<p>Цена</p>
							<div className="car-detail_price-value">
								{data.item?.rentpay} ₽ <span>/ день</span>
							</div>
						</div>
						<div className="car-detail_deposit">
							Депозит от <span>{data.item?.deposit} ₽</span>
						</div>
						<CarSameLink className="car-detail_same-link" car={car} />
						<div className="car-detail_info">
							<h4>Информация</h4>
							<ul>
								<li>
									<div>Год </div>
									<span>{data.item?.year}</span>
								</li>
								<li>
									<div>КПП </div>
									<span>{data.item?.kpp}</span>
								</li>
								<li>
									<div>Пробег</div> <span>{data.item?.run}км</span>
								</li>
							</ul>
						</div>
					</Container>
					<div className="car-detail_tobook">
						<button className="site-btn big" onClick={checkSteps}>
							Забронировать
						</button>
					</div>
					<RentCarFullImage
						images={isSuccess && data.item?.images}
						active={modalFullImage}
						setActive={setModalFullImage}
					/>
					<RentModalMobile
						step={step}
						setStep={setStep}
						active={modalBookingCar}
						setActive={setModalBookingCar}
						car={isSuccess && data.item}
					/>
				</>
			) : (
				<>
					<h3>Машина не найдина, повторите попытку позже</h3>
				</>
			)}
		</CarDetailLayout>
	);
};

export const carRentDataLoader = async ({ request, params }) => {
	return Api.rentCar(params.id); // d.json();
};

export default RentCarDetail;
