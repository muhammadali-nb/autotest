import React, {useEffect, useState} from 'react';
import {useAppSelector} from "../../../app/hooks";
import Api, {ErrorResponse, RentResponse} from "../../../Api";
import {Link, useSearchParams} from "react-router-dom";
import {CarRentCard} from "../../common/CarCard";
import Loader from "../../common/Loader";
import LoadError from "../../common/LoadError";
import {BottomMessage} from "../CatalogPage";
import Paginator from "../../common/Paginator";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

const RentGrid:React.FC<{loader?: ()=>void}> = (props) => {

    const [cars, setCars] = useState<RentResponse | ErrorResponse | undefined>(undefined)
    const filter = useAppSelector(state=>state.filter)
    const [query, setQuery] = useSearchParams();
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    useEffect(() => {

        const fetchCarData = async () => {
            setCars(undefined);
            console.log('fetching cars...')
            let carData = await Api.rent(filter, query);

            // if(Api.isError(carData)){
            //     //TODO:Error check!
            //     return;
            // }
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
            <div className={'catalog__grid'}>
                {!Api.isError(cars) && cars.list.map((i, index)=>(
                    <CarRentCard car={i} key={index} />
                ))}
            </div>
            <BottomMessage button={<Link to={'/catalog'} className={'site-btn light'}>
                Перейти&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowRight} />
            </Link>}
                           text1={'Нужен автомобиль в собственность?'}
                           text2={'Подумайте о Лизинге!'}/>
            <div className={'mt-px-60'}>
                <Paginator data={cars}/>
            </div>
        </div>
    );
};

export default RentGrid;