import React, {useState} from 'react';
import {CarData} from "../../common/CarCard";
import CarStatBlock from "./CarStatBlock";

const CarInfo:React.FC<{car:CarData}> = (props) => {
    const [page, setPage] = useState('tech')
    return (
        <div className={'car-info'}>
            <div  className={'car-info-btns'}>
                <button className={'car-info-btn ' + (page === 'tech' ? 'active' : '')}
                        onClick={()=>{setPage('tech')}}>
                    Технические характеристики
                </button>
                <button className={'car-info-btn ' + (page === 'standard' ? 'active' : '')}
                                 onClick={()=>{setPage('standard')}}>
                    Стандартное оборудование
                </button>
            </div>
            <div className={'my-3'}>
                {page === 'tech' && <CarStatBlock column1Width={'2.5fr'} dotted={true} data={props.car.tech} />}
                {page === 'standard' && <CarStatBlock column1Width={'4fr'} data={props.car.standard} />}
            </div>

        </div>
    );
};

export default CarInfo;