import React, {useState} from 'react';
import {CarData} from "../../common/CarCard";
import {Carousel, Modal} from "react-bootstrap";
import caretLeft from './../../../img/common/caret-left-big.svg';
import chevronLeft from './../../../img/index/Chevron Left.png';
import chevronRight from './../../../img/index/Chevron Right.png';
import caretRight from './../../../img/common/caret-right-big.svg';
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faCircleXmark} from "@fortawesome/free-solid-svg-icons";

export const CarImagesModal:React.FC<{show:boolean,index?:number, car:CarData,handleClose:()=>void}> = ({show,index = 0, car,handleClose}) =>{
    const [imageIndex, setIndex] = useState(index);
    const handleSelect = (selectedIndex) => {
        if(selectedIndex >= car.images.length)
            selectedIndex = 0;
        if(selectedIndex < 0)
            selectedIndex = car.images.length - 1;
        setIndex(selectedIndex);
    };

    return (
        <Modal show={show} onHide={handleClose} centered size={'xl'} className={'widened'}>
            <div className={'position-relative'} >
                <div className={'d-flex justify-content-center align-items-center end-0 top-0 position-absolute default-transition p-0 cursor-pointer text-lightgray text-hover-gray-color bg-hover-white'}
                     style={{zIndex:300,transform:'translate(50%,-50%)',background:'#222222', borderRadius:'19px',width:'18px', height:'18px'}}
                     onClick={handleClose}>
                    <FontAwesomeIcon icon={faCircleXmark} size={'lg'} />
                </div>
                <Carousel activeIndex={imageIndex} onSelect={handleSelect} controls={false} indicators={false}>
                    {car.images.map((img, index) =>(
                        <Carousel.Item key={index}>
                            <div className={'car-images-image-container rounded overflow-hidden bg-white'}>
                                <img
                                    className="d-block w-100 car-images-image big"
                                    src={img.full}
                                    alt=""
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div className={'position-absolute bottom-0 start-0 w-100 p-px-20 d-flex justify-content-center overlay-bt'}>
                    <div className={'car-images-controls w-100'} style={{maxWidth:'600px'}}>
                        <button
                            className={'car-images-controls-btn text-white'} onClick={()=>handleSelect(imageIndex - 1)}>
                            <img src={chevronLeft} alt={''}/>
                        </button>
                        <div className={'car-images-controls-sliders'}>
                            {car.images.map((i, ind)=>(
                                <div key={ind} className={'car-images-controls-slider white ' + (imageIndex === ind ? 'active' : '')}
                                     onClick={()=>handleSelect(ind)}
                                ><div></div></div>
                            ))}
                        </div>
                        <button
                            className={'car-images-controls-btn text-white'} onClick={()=>handleSelect(imageIndex + 1)}>
                            {/*<FontAwesomeIcon icon={faChevronRight} size={'2x'} />*/}
                            <img src={chevronRight} alt={''}/>
                        </button>
                    </div>
                </div>

            </div>

        </Modal>
    )
}

const CarImages:React.FC<{car:CarData}> = ({car}) => {
    const [index, setIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const navigate=useNavigate();

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleSelect = (selectedIndex) => {
        if(selectedIndex >= car.images.length)
            selectedIndex = 0;
        if(selectedIndex < 0)
            selectedIndex = car.images.length - 1;
        setIndex(selectedIndex);
    };
    return (
        <div className={'car-images'}>
            <CarImagesModal show={showModal} handleClose={handleClose} car={car} />

            <div className={'mb-4'}>
                <Link to={'/catalog'} className={'btn btn-link d-flex font-weight-medium font-size-18 align-items-center text-uppercase default-link text-hover-default'} onClick={()=>navigate(-1)}>
                    <FontAwesomeIcon icon={faAngleLeft} size={'sm'} />&nbsp;&nbsp;Вернуться в каталог
                </Link>
            </div>
            <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
                {car.images.map((img, index) =>(
                    <Carousel.Item key={index}>
                        <div className={'car-images-image-container cursor-pointer'} onClick={handleShow}>
                            <img
                                className="d-block w-100 car-images-image"
                                src={img.full}
                                alt=""
                            />
                        </div>
                    </Carousel.Item>
                ))}

            </Carousel>
            <div className={'car-images-controls mt-3'}>
                <button
                        className={'car-images-controls-btn'} onClick={()=>handleSelect(index - 1)}>
                    <img src={caretLeft} width={16} height={32} alt=""/>
                </button>
                <div className={'car-images-controls-sliders'}>
                    {car.images.map((i, ind)=>(
                        <div key={ind} className={'car-images-controls-slider ' + (index === ind ? 'active' : '')}
                            onClick={()=>handleSelect(ind)}
                        ><div></div></div>
                    ))}
                </div>
                <button
                        className={'car-images-controls-btn'} onClick={()=>handleSelect(index + 1)}>
                    <img src={caretRight} width={16} height={32} alt=""/>
                </button>
            </div>
        </div>
    );
};

export default CarImages;