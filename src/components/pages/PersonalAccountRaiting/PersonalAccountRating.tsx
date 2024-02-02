
import { useQuery } from "@tanstack/react-query";
import { ru } from "date-fns/locale";
import { format } from "date-fns";

import ListGroup from 'react-bootstrap/ListGroup';
import PersonalAccountRaitingLayout from '../../layout/PersonalAccountLayout/PersonalAccountRaitingLayout';
import PersonalAccountHeader from '../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader';
import PersonalAccountData from '../PersonalAccount/PersonalAccountData';
import UserNoAvatar from "../../../images/common/userG.svg";
import RaitingService from "../../../api-functions/raiting-service/raiting-service";
import Loader from "../../common/Loader";
import CustomCalendar from '../../common/CustomCalendar/CustomCalendar';
import {ReactComponent as CalendarSVG} from "../../../images/common/calendar-gray.svg";

import "./PersonalAccountRaiting.scss";

import { useEffect, useState } from 'react';

const PersonalAccountRaiting = () => {

    const [isOpenCalendar, setIsCalendarOpen] = useState<boolean>(false);
    const [filterDate, setFilterDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['raitings'],
        queryFn: () => RaitingService.getRaitingUsers(filterDate)
    });

    const onDateChange = (date: Date) => {
        setFilterDate(format(date, "yyyy-MM-dd"));
    }

    useEffect(() => {
        refetch()
    }, [filterDate, refetch])


    return (
        <PersonalAccountRaitingLayout>
            <div className="personal-account__rating-page__user-info">
                <PersonalAccountHeader>
                    {data?.order_user ? (
                        <PersonalAccountData 
                            data={{ 
                                name: data?.order_user?.first_name,
                                last_name: data?.order_user?.last_name, 
                                middle_name: data?.order_user?.middle_name || ""  }} 
                        />
                    ) : null
                }
                <div className="personal-account__rating-page__user-info__worked">
                    <div className="personal-account__rating-page__user-info__worked--sum">{data?.order_user?.Price || 0} ₽</div>
                    <div className="personal-account__rating-page__user-info__worked--orders">{data?.order_user?.Count || 0} заказов / {data?.order_user?.hours} ч</div>
                </div>
                </PersonalAccountHeader>
                </div>

            {
                isLoading 
                ? <Loader /> 
                : (
                    <div className="personal-account__raiting-page">
                        <div className="personal-account__raiting-page__header-wrapper">
                            <h2 className="personal-account__raiting-page__header">Топ 10 лучших водителей / 18.01</h2>
                            <div className="personal-account__raiting-page__calendar-container">
                                <CalendarSVG className={isOpenCalendar ? "active" : ""} onClick={() => setIsCalendarOpen(prevState => !prevState)} />
                                <CustomCalendar isOpen={isOpenCalendar} locale={ru} onChange={onDateChange} />
                            </div>
                        </div>
        
                        <ListGroup className="personal-account__raiting-list">
                            {data?.order_list.map((item, i) => <PersonalAccountListItem item={item} position={i+1} key={i}/>)}
                        </ListGroup>
                    </div>
                ) 
            }
            
        </PersonalAccountRaitingLayout>
    )
}

const PersonalAccountListItem = ({ item, position }) => {

    return (
        <ListGroup.Item className="personal-account__raiting-page__raiting-item">
            <div className="personal-account__raiting-page__raiting-item__raiting">{position}</div>
            <div className="personal-account__raiting-page__raiting-item__avatar"><img src={UserNoAvatar} alt="user" /></div>
            <div className="personal-account__raiting-page__raiting-item__fullname">
                <div className="personal-account__raiting-page__raiting-item__fullname--surname">{item.last_name}</div>
                <div className="personal-account__raiting-page__raiting-item__fullname--name">{item.first_name} {item.middle_name}</div>
            </div>
            <div className="personal-account__raiting-page__raiting-item__car">
                <div className="personal-account__raiting-page__raiting-item__car--model">{item.car_brand} {item.car_model}</div>
                <div className="personal-account__raiting-page__raiting-item__car--number">{item.car_number} {item.car_region}</div>
            </div>
            <div className="personal-account__raiting-page__raiting-item__bonus">
                <div className="personal-account__raiting-page__raiting-item__bonus--sum"></div>
                <div className="personal-account__raiting-page__raiting-item__bonus--type"></div>
            </div>
            <div className="personal-account__raiting-page__raiting-item__worked">
                <div className="personal-account__raiting-page__raiting-item__worked--sum">{item.Price} ₽</div>
                <div className="personal-account__raiting-page__raiting-item__worked--orders">{item.Count} заказов / {item.hours} ч</div>
            </div>
        </ListGroup.Item>
    )
}

export default PersonalAccountRaiting;