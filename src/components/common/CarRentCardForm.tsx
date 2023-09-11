import React, {ReactNode, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Api, {CallRequestData, CatalogResponse, ErrorResponse} from "../../Api";
import ModalFormTemplate, {
    ModalTemplateConfirm,
    ModalTemplateContent,
    ModalTemplateInput,
    ModalTemplatePhone
} from "./ModalFormTemplate";
import Utils from "../../Utils";
import {CarData, CarRentButton, CarRentDataInfo} from "./CarCard";
import Loader from "./Loader";
import LoadError from "./LoadError";
import img from "../../img/common/modal-image.png";
import {Carousel} from "react-bootstrap";
import caretLeft from "../../img/common/caret-left-big.svg";
import caretRight from "../../img/common/caret-right-big.svg";
import {BaseState} from "../../store/reducers/baseDataSlice";
import {useAppSelector} from "../../store/hooks";
import {CarStatBlockEntry, CarStatBlockItem, CarStatBlockProps} from "../pages/Car/CarStatBlock";
import CarRentForm from "./CarRentForm";

const CarRequestFormContent:React.FC<{closeFunc:()=>void, car:CarRentDataInfo}> = (props) => {
    const baseData:BaseState = useAppSelector(state => state.baseData);
    const brand = baseData.left?.brands.values?.find((i) => props.car.brand === i.id)?.name ?? 'неизвестно';
    const model = baseData.left?.models.values?.find((i) => props.car.model === i.id)?.name ?? 'неизвестно';
    const tags = baseData.top?.special.values?.filter((i) => props.car.special.includes(i.id)) ?? [];

    const statSettings:CarStatBlockProps = {data:[],dotted:false, column1Width:'70px', column2Width:'auto'}
    return (
        <div className={'py-px-35 px-px-60 flex-grow'}>
            <div>
                <div className={'font-size-40 line-height-120 font-weight-semibold text-uppercase mb-px-10'}>
                    {brand} <span className={'text-red-color'}>{model}</span>
                </div>
                <div className={'text-gray-color font-weight-medium font-size-24 line-height-120 mb-px-20'}>
                    {props.car.regnum}
                </div>
                <div className={'car__card-taglist mb-px-60'}>
                    {tags.map((i, index)=>(<div key={index} className={'car__card-tag'}>
                        {i.name}
                    </div>))}
                </div>
                <div className={'font-size-32 line-height-120 font-weight-semibold mb-px-15'}>
                    {props.car.rentpay.toLocaleString()} ₽ <span className={'font-size-24 line-height-120'}>/ день</span>
                </div>
                <div className={'font-size-16 line-height-120 font-weight-medium mb-px-40'}>
                    Депозит от <span className={'font-weight-semibold'}>{props.car.deposit.toLocaleString()}  ₽</span>
                </div>
                <div className={'mb-px-40'}>
                    <CarRentForm car={props.car} func={props.closeFunc} wide={false} />
                </div>
                <div className={'font-size-24 line-height-120 font-weight-medium mb-px-25'}>
                    Информация
                </div>
                <div className={'mb-px-40'}>
                    <CarStatBlockEntry settings={statSettings}>
                        <CarStatBlockItem settings={statSettings}
                              data={{name:"Год",value:props.car.year}} />
                        <CarStatBlockItem settings={statSettings}
                              data={{name:"КПП",value:'АКПП'}} />
                        <CarStatBlockItem settings={statSettings}
                              data={{name:"Пробег",value:props.car.run + ' км'}} />
                    </CarStatBlockEntry>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
const CarRequestFormImage:React.FC<{closeFunc:()=>void, car:CarRentDataInfo}> = (props) => {
    const [car, setCar] = useState<CarData | ErrorResponse | undefined>();
    const [index, setIndex] = useState(0);


    useEffect(() => {
        const fetchCarData = async () => {
            setCar(undefined);
            let carData = await Api.car(props.car.id);
            setCar(carData);
        }
        fetchCarData();
    }, [])
    const handleSelect = (selectedIndex) => {
        if(Api.isError(car))
            return;
        if(selectedIndex >= (car?.images?.length ?? 0))
            selectedIndex = 0;
        if(selectedIndex < 0)
            selectedIndex = (car?.images?.length ?? 1) - 1;
        setIndex(selectedIndex);
    };

    if(!car)
        return (<div className={'d-flex flex-column position-relative justify-content-center align-items-center'}
                     style={{minWidth:'600px',maxWidth:'600px'}}><Loader /></div>)
    if(Api.isError(car))
        return (<div className={'d-flex flex-column position-relative justify-content-center align-items-center'}
                     style={{minWidth:'600px',maxWidth:'600px'}}><LoadError response={car} /></div>)


    return (
        <div className={'d-flex flex-column position-relative justify-content-center'}
             style={{minWidth:'600px',maxWidth:'600px'}}>
            <div className={'car-images mb-0'}>
                <Carousel activeIndex={index} onSelect={handleSelect} controls={false} indicators={false}>
                    {car.images.map((img, index) =>(
                        <Carousel.Item key={index}>
                            <div className={'car-images-image-container cursor-pointer'}>
                                <img
                                    className="d-block w-100 car-images-image"
                                    src={img.full}
                                    alt=""
                                />
                            </div>
                        </Carousel.Item>
                    ))}

                </Carousel>

            </div>
            <div className={'position-absolute bottom-0 left-0 w-100 d-flex justify-content-center p-3'}>
                <div className={'car-images-controls w-100'}>
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
            <div className={'position-absolute top-0 left-0 px-px-30 py-px-20'}>
                <button className={'default-link font-size-18 font-weight-semibold text-decoration-none'}
                    onClick={()=>props.closeFunc()}>
                    <FontAwesomeIcon icon={faAngleLeft} />&nbsp;&nbsp;НАЗАД
                </button>
            </div>
        </div>
    )
}

const CarRequestForm:React.FC<{light?:boolean,text?:string|ReactNode,small?:boolean,car:CarRentDataInfo}> = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button className={'site-btn w-100 big'}
                    onClick={handleShow} >
                {props.text ?? <>Забронировать</>}</button>
            <ModalFormTemplate show={show} onHide={handleClose} centered size={'xl'}
                image={<CarRequestFormImage closeFunc={handleClose} car={props.car} />}
            >
                <CarRequestFormContent closeFunc={handleClose} car={props.car}/>
            </ModalFormTemplate>
        </>
    );
};

export default CarRequestForm;