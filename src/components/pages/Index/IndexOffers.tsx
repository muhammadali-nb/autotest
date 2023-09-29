import React from "react";
import { Container } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import CarCard, { CarDataInfo } from "../../common/CarCard";
import Api from "../../../Api";
import LoadError from "../../common/LoadError";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const IndexOffers = () => {
	const recommend = useLoaderData() as Array<CarDataInfo>;

	return (
		<div className={"index__offers"}>
			{/* {process.env.REACT_APP_NO_CATALOG !== "true" && (
				<Container fluid={"xxl"}>
					<div className={"index__offers-header"}>
						<span>выгодные предложения</span>
						<Link to="/catalog" className={"index__offers-header-link"}>
							Другие автомобили&nbsp;&nbsp;
						</Link>
					</div>

					<LoadError response={recommend} />
					{!Api.isError(recommend) && (
						<div className={"index-offers-cards"}>
							{recommend.map((i, index) => (
								<CarCard responsive={false} car={i} key={index} />
							))}
						</div>
					)}
				</Container>
			)} */}
			<div
			// className={
			// 	process.env.REACT_APP_NO_CATALOG !== "true" ? "mt-px-100" : ""
			// }
			>
				<Carousel
					additionalTransfrom={0}
					arrows
					autoPlay
					autoPlaySpeed={4}
					centerMode={false}
					className=""
					containerClass="container-with-dots"
					customTransition="all 30s linear"
					dotListClass=""
					draggable
					focusOnSelect={false}
					infinite
					itemClass=""
					keyBoardControl
					minimumTouchDrag={80}
					pauseOnHover
					// renderArrowsWhenDisabled={false}
					// renderButtonGroupOutside={false}
					// renderDotsOutside={false}
					responsive={{
						desktop: {
							breakpoint: {
								max: 3000,
								min: 1024,
							},
							items: 6,
							partialVisibilityGutter: 40,
						},
						mobile: {
							breakpoint: {
								max: 464,
								min: 0,
							},
							items: 4,
							partialVisibilityGutter: 30,
						},
						tablet: {
							breakpoint: {
								max: 1024,
								min: 464,
							},
							items: 5,
							partialVisibilityGutter: 30,
						},
					}}
					rewind={false}
					rewindWithAnimation={false}
					rtl={false}
					shouldResetAutoplay
					showDots={false}
					sliderClass=""
					slidesToSlide={1}
					swipeable
					transitionDuration={20000}
					customLeftArrow={<></>}
					customRightArrow={<></>}>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-bmw.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-chery.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-geely.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-hyundai.png"} alt={""} />
					</div>
					<div className={"index-offers-brand "}>
						<img src={"/dummy/logo-kia.png"} className="kia-brand" alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-toyota.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-vw.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-scoda.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-mercedes.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-bmw.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-chery.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-geely.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-hyundai.png"} alt={""} />
					</div>
					<div className={"index-offers-brand kia"}>
						<img src={"/dummy/logo-kia.png"} className="kia-brand" alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-toyota.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-vw.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-scoda.png"} alt={""} />
					</div>
					<div className={"index-offers-brand"}>
						<img src={"/dummy/logo-mercedes.png"} alt={""} />
					</div>
				</Carousel>
			</div>
		</div>
	);
};

export default IndexOffers;
