import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CarSameLink } from "../../common/CarCard";
import Api, { ErrorResponse } from "../../../Api";
import { CarDetailLayout } from "../../layout/CarDetailLayout";
import RentCarImagesCarousel from "./RentCarImagesCarousel";
import { Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import rentService from "../../../api-functions/rent-page/rent-service";

import LoadError from "../../common/LoadError";
import { RentModalMobile } from "../../common/Rent/RentModalMobile/RentModalMobile";
import { useAuth } from "../../../hooks/useAuth";
import { CarBookingStepsType } from "../../common/CarRentForm";
import { BrowserView, MobileView } from "react-device-detect";
import RentCarDetailModal from "../../common/RentCarDetailModal";
import RentDetailModalLayout from "../../layout/RentDetailModalLayout";
import Loader from "../../common/Loader";
import CarFullImageModal from "./RentCarFullImage";
import { RentBookingPaymentStatus } from "../../../types/RentTypes";
import axios, { AxiosError } from "axios";
import api from "../../../core/axios";
import MetaDecorator from "../../layout/MetaDecorator";

const RentCarDetail = () => {
	const { carID } = useParams();
	const location = useLocation();
	const [carFullName, setCarFullName] = useState<null | string>(null);
	const [paymentStatus, setPaymentStatus] =
		useState<RentBookingPaymentStatus>(null);
	const [modalFullImage, setModalFullImage] = useState(false);
	const [modalBookingCar, setModalBookingCar] = useState(false);
	const { isAuthenticated, has_profile } = useAuth();
	const [step, setStep] = useState<CarBookingStepsType>("rent");
	const [depositPrice, setDepositPrice] = useState(0);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);
	const { data, error, isLoading, isSuccess } = useQuery({
		queryKey: [`rent-car-${carID}`, carID],
		queryFn: () => rentService.getOneCar(carID),
	});

	const title =
		data?.item?.brand +
		" " +
		data?.item?.model +
		" - " +
		process.env.REACT_APP_WEBSITE_NAME;

	const checkCardPayment = () => {
		if (!location.state) {
			return;
		}

		if (location.state.status === "success") {
			setModalBookingCar(true);
			setPaymentStatus(location.state.payment_status);
			setCarFullName(location.state.car_name);
			setStep("booking_result");
		} else {
			setPaymentStatus("CANCELLED");
			setStep("booking_result");
		}
	};

	useEffect(() => {
		checkCardPayment();
	}, [location]);

	const getPriceCar = async () => {
		try {
			const res = await api.get(`/voshod-auto/?w=book-a-car&id=${carID}`, {
				withCredentials: true,
			});
			if (res.data.result === 1) {
				setDepositPrice(res.data.summ);
				if (res.data.summ > 0) setStep("payment");
				else setStep("finish");
				setModalBookingCar(true);
			}
		} catch (error) {
			setStep("rent");
			setErrorMessage(
				(error as AxiosError<ErrorResponse>).response?.data.message ??
					"Возникла ошибка с сервером поробуйте позже"
			);
		}
	};

	const checkSteps = async () => {
		if (!isAuthenticated && !has_profile) {
			setStep("start");
			setModalBookingCar(true);
		} else if (isAuthenticated && has_profile) {
			await getPriceCar();
		} else if (isAuthenticated && !has_profile) {
			setStep("create");
			setModalBookingCar(true);
		}
	};
	if (isLoading) return <Loader />;
	if (error) return <LoadError response={error} />;
	return (
		<>
			<MetaDecorator
				title={title}
				url={`/catalog/${carID}`}
				image={data?.item?.images[0]?.image}
			/>
			{!isLoading && (
				<>
					<BrowserView>
						<RentDetailModalLayout>
							<RentCarDetailModal
								errorMessage={errorMessage}
								step={step}
								setStep={setStep}
								paymentStatus={paymentStatus}
								setPaymentStatus={setPaymentStatus}
								getPriceCar={getPriceCar}
								depositPrice={depositPrice}
								setDepositPrice={setDepositPrice}
								setCarName={setCarFullName}
								carName={carFullName}
							/>
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
										{errorMessage && (
											<div className={"my-2 text-red-color font-size-8"}>
												{errorMessage}
											</div>
										)}
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
													<div>Пробег</div>
													<span>{data.item?.run}км</span>
												</li>
											</ul>
										</div>
									</Container>
									<div className="car-detail_tobook">
										<button className="site-btn big" onClick={checkSteps}>
											Забронировать
										</button>
									</div>
									<CarFullImageModal
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
										depositPrice={depositPrice}
										getPriceCar={getPriceCar}
										setDepositPrice={setDepositPrice}
										paymentStatus={paymentStatus}
										setPaymentStatus={setPaymentStatus}
										carName={carFullName}
										setCarName={setCarFullName}
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
