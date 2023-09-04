import React from 'react';
import {CarData, CarPreorderButton, CarSameLink} from "../../common/CarCard";
import {useAppSelector} from "../../../app/hooks";
import CarStatBlock from "./CarStatBlock";
import IndexCalculator from "../Index/IndexCalculator";

const CarBase:React.FC<{car:CarData}> = ({car}) => {
    const data = useAppSelector(state => state.baseData);
    const brand = data.left.brands.values?.find((i)=>i.id===car.main.brand)?.name ?? '';
    const model = data.left.models.values?.find((i)=>i.id===car.main.model)?.name ?? '';

    return (
        <div className={'car-base'}>
            <div className={'car-base-title'}>
                {brand}&nbsp;
                <span className={'text-red-color'}>{model}</span>
            </div>
            <div className={'car-base-price'}>
                <div className={'mb-px-5'}>
                    Цена
                </div>
                <div className={'car-base-price-value'}>
                    {car.main.price.toLocaleString()}&nbsp;₽
                </div>
            </div>
            <div className={'car-base-payment'}>
                Минимальный платеж от <span className={'car-base-payment-value'}>{car.main.pay.toLocaleString()}&nbsp;₽</span>
            </div>
            <div className={'mb-px-30'}>
                <CarSameLink car={car.main} className={'d-inline'} text={"Показать похожие модели"} />
            </div>
            <div className={'mb-px-40'}>
                <CarPreorderButton car={car.main} w100={false} />
            </div>
            <div className={'my-3'}>
                <CarStatBlock column1Width={'auto'} data={car.info}/>
            </div>
            <div className={'my-3'} style={{maxWidth:'500px'}}>
                <IndexCalculator fontBold={true} hidePrice={true} price={car.main.price} noAnim={true} />
            </div>

        </div>
    );
};

export default CarBase;