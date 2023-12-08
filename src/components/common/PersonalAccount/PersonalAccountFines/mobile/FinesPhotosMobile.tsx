import { Carousel } from "react-bootstrap";
import { HeaderLogoImage } from "../../../../layout/Header";
import back from "../../../../../images/common/back-dark.svg";
import img from "../../../../../images/personal-account/fines/fine-modal.png";
import car from "../../../../../images/rent/auto_card.png";
import download from "../../../../../images/personal-account/fines/download.svg";
import Utils from "../../../../../utils/Utils";
import { useState } from "react";
import caretLeft from "../../../../../images/common/caret-left-big.svg";
import caretRight from "../../../../../images/common/caret-right-big.svg";

const FinesPhotosMobile: React.FC<{
    setActive: (arg0: boolean) => void
}> = (props) => {
    const { setActive } = props;

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <div className="balance-mobile active">
            <div className="balance-mobile_head">
                <div className="mobile-modal_header-top">
                    <img src={back} onClick={() => setActive(false)} alt="" />
                    <HeaderLogoImage width={"100px"} height={"24px"} image="dark" />
                    <img src={download} alt="Скачать" />
                </div>
            </div>
            <div className="balance-mobile_body">
                <Carousel
                    activeIndex={index}
                    interval={null}
                    className="personal-account_fines-modalSlider"
                    controls={false}
                    indicators={false}
                >
                    <Carousel.Item>
                        <div className="personal-account_fines-modalImage slide">
                            <img src={img} alt="" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="personal-account_fines-modalImage slide">
                            <img src={car} alt="" />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="personal-account_fines-modalImage slide">
                            <img src={img} alt="" />
                        </div>
                    </Carousel.Item>
                </Carousel>
                <div
                    className={
                        "w-100 d-flex justify-content-center p-3"
                    }>
                    <div className={"car-images-controls w-100"}>
                        <button
                            className={"car-images-controls-btn"}
                            onClick={() => handleSelect(index - 1)}>
                            <img src={caretLeft} width={16} height={32} alt="" />
                        </button>
                        <div className={"car-images-controls-sliders"}>
                            <div
                                className={
                                    "car-images-controls-slider " +
                                    (index === 0 ? "active" : "")
                                }
                                onClick={() => handleSelect(0)}>
                                <div></div>
                            </div>
                            <div
                                className={
                                    "car-images-controls-slider " +
                                    (index === 1 ? "active" : "")
                                }
                                onClick={() => handleSelect(1)}>
                                <div></div>
                            </div>
                            <div
                                className={
                                    "car-images-controls-slider " +
                                    (index === 2 ? "active" : "")
                                }
                                onClick={() => handleSelect(2)}>
                                <div></div>
                            </div>
                        </div>
                        <button
                            className={"car-images-controls-btn"}
                            onClick={() => handleSelect(index + 1)}>
                            <img src={caretRight} width={16} height={32} alt="" />
                        </button>
                    </div>
                </div>
                <div className="personal-account_fines-modalAction">
                    <div className="site-btn big">
                        Оплатить ({Utils.formatNumber(5000)} ₽)
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinesPhotosMobile;