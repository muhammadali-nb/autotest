import React, {useEffect, useState} from 'react';
import CarCard from "../../common/CarCard";
import {useAppSelector} from "../../../app/hooks";
import Api, {CatalogResponse, ErrorResponse} from "../../../Api";
import {useSearchParams} from "react-router-dom";
import Loader from "../../common/Loader";
import LoadError from "../../common/LoadError";
import Paginator from "../../common/Paginator";
import {BottomMessage} from "../CatalogPage";
import CarRequestForm from "../../common/CarRequestForm";

const CarGrid:React.FC<{loader?: ()=>void}> = (props) => {

    const [cars, setCars] = useState<CatalogResponse | ErrorResponse | undefined>(undefined)
    const filter = useAppSelector(state=>state.filter)
    const [query, setQuery] = useSearchParams();
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    useEffect(() => {

        const fetchCarData = async () => {
            setCars(undefined);
            console.log('fetching cars...')
            let carData = await Api.catalog(filter, query);
            setCars(carData);
        }
        if(!cars)
            fetchCarData();
        else{
            clearTimeout(timer);
            setTimer(setTimeout(fetchCarData, 1000));
        }

    },[filter, query])

    if(!cars)
        return (<Loader />)
    if(Api.isError(cars))
        return (<LoadError response={cars} />)
    if(cars.list.length === 0)
        return (<div className={'d-flex w-100 text-center text-muted align-items-center'} style={{minHeight:'40vh'}}>
            <em>Поиск по выбранным Вами параметрам не вернул результатов</em>
        </div>)
    return (
        <div>
            {/*<Paginator />*/}
            <div className={'catalog__grid'}>
                {!Api.isError(cars) && cars.list.map((i, index)=>(
                    <CarCard car={i} key={index} />
                ))}
            </div>
            <BottomMessage button={<CarRequestForm light />} text1={'Не нашли ничего подходящего?'}
                text2={'Предложите свой вариант!'}/>
            <div className={'mt-px-60'}>
                <Paginator data={cars} />
            </div>

        </div>

    );
};

export default CarGrid;