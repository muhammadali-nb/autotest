import { useQuery } from "@tanstack/react-query";

import ListGroup from 'react-bootstrap/ListGroup';
import PersonalAccountRaitingLayout from '../../layout/PersonalAccountLayout/PersonalAccountRaitingLayout';
import PersonalAccountHeader from '../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader';
import PersonalAccountData from '../PersonalAccount/PersonalAccountData';
import { userData } from '../PersonalAccount/PersonalAccountPage';
import UserNoAvatar from "../../../images/common/userG.svg";

import "./PersonalAccountRaiting.scss";
import RaitingService from "../../../api-functions/raiting-service/raiting-service";
import Loader from "../../common/Loader";

const PersonalAccountRaiting = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['raitings'],
        queryFn: () => RaitingService.getRaitingUsers()
    });

    console.log(data)

    return (
        <PersonalAccountRaitingLayout>
            <PersonalAccountHeader>
				<PersonalAccountData data={userData} />
			</PersonalAccountHeader>

            {
                isLoading 
                ? <Loader /> 
                : (
                    <div className="personal-account__raiting-page">
                        <h2 className="personal-account__header">Топ 10 лучших водителей / 18.01</h2>
        
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
        <ListGroup.Item className="personal-account__raiting-item">
            <div className="personal-account__raiting-item__raiting">{position}</div>
            <div className="personal-account__raiting-item__avatar"><img src={UserNoAvatar} alt="user" /></div>
            <div className="personal-account__raiting-item__fullname">
                <div className="personal-account__raiting-item__fullname--surname">{item.last_name}</div>
                <div className="personal-account__raiting-item__fullname--name">{item.first_name} {item.middle_name}</div>
            </div>
            <div className="personal-account__raiting-item__car">
                <div className="personal-account__raiting-item__car--model">{item.car_brand} {item.car_model}</div>
                <div className="personal-account__raiting-item__car--number">{item.car_number} {item.car_region}</div>
            </div>
            <div className="personal-account__raiting-item__bonus">
                <div className="personal-account__raiting-item__bonus--sum"></div>
                <div className="personal-account__raiting-item__bonus--type"></div>
            </div>
            <div className="personal-account__raiting-item__worked">
                <div className="personal-account__raiting-item__worked--sum">{item.Price} ₽</div>
                <div className="personal-account__raiting-item__worked--orders">{item.Count} заказов / ${item.hours} ч</div>
            </div>
        </ListGroup.Item>
    )
}

export default PersonalAccountRaiting;