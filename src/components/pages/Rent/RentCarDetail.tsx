import React, { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { CarRentDataInfo, CarSameLink } from "../../common/CarCard";
import Api, { ConfirmPhone, ErrorResponse } from "../../../Api";
import { CarDetailLayout } from "../../layout/CarDetailLayout";
import RentCarImagesCarousel from "./RentCarImagesCarousel";
import { Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import rentService from "../../../api-functions/rent-page/rent-service";
import RentCarFullImage from "./RentCarFullImage";
import LoadError from "../../common/LoadError";
import { RentModalMobile } from "../../common/Rent/RentModalMobile/RentModalMobile";
import { useAuth } from "../../../hooks/useAuth";
import { CarBookingStepsType } from "../../common/CarRentForm";
import { BrowserView, MobileView } from "react-device-detect";
import RentCarDetailModal from "../../common/RentCarDetailModal";
import RentDetailModalLayout from "../../layout/RentDetailModalLayout";

const RentCarDetail = () => {
	const { carID } = useParams();
	const [modalFullImage, setModalFullImage] = useState(false);
	const [modalBookingCar, setModalBookingCar] = useState(false);
	const { isAuthenticated, has_profile, initialize, user_status } = useAuth();
	const [step, setStep] = useState<CarBookingStepsType>("rent");
	const { data, error, isLoading, isSuccess } = useQuery({
		queryKey: [`rent-car-${carID}`, carID],
		queryFn: () => rentService.getOneCar(carID),
	});

	const chekckUser = async () => {
		await initialize();
		if (user_status) {
			setStep("rent");
		}
	};

	useEffect(() => {
		chekckUser();
	}, [step]);

	const checkSteps = async () => {
		initialize();
		if (!isAuthenticated && !has_profile) {
			setStep("start");
		} else if (isAuthenticated && has_profile) {
			setStep("payment");
		} else if (isAuthenticated && !has_profile) {
			setStep("create");
		}
		setModalBookingCar(true);
	};

	if (error) return <LoadError response={error} />;
	return (
		<>
			{!isLoading && (
				<>
					<BrowserView>
						<RentDetailModalLayout>
							<RentCarDetailModal />
						</RentDetailModalLayout>
					</BrowserView>
					<MobileView>
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
										<CarSameLink
											className="car-detail_same-link"
											car={data.item}
										/>
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
									<h3>Машина не найдина, повторите попытку позжeeе</h3>
								</>
							)}
						</CarDetailLayout>
					</MobileView>
				</>
			)}
		</>
	);
};

export const carRentDataLoader = async ({ request, params }) => {
	return Api.rentCar(params.carID); // d.json();
};

export default RentCarDetail;
