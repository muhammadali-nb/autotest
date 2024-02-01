import ListGroup from 'react-bootstrap/ListGroup';

import PersonalAccountRaitingLayout from '../../layout/PersonalAccountLayout/PersonalAccountRaitingLayout';
import PersonalAccountHeader from '../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader';
import PersonalAccountData from '../PersonalAccount/PersonalAccountData';
import { userData } from '../PersonalAccount/PersonalAccountPage';
import UserNoAvatar from "../../../images/common/userG.svg";

import "./PersonalAccountRaiting.scss";

const DATA = Array(10).fill({
    name: 'анастасия',
    surname: 'фокина',
    fatherName: 'алексеева',
    carModel: 'kia k5',
    carNumber: 'm766kc 198',
    bonusSum: 1000,
    orders: 50,
    ordersTime: 50,
    totalEarnSum: 500000
})

const PersonalAccountRaiting = () => {
    return (
        <PersonalAccountRaitingLayout>
            <PersonalAccountHeader>
				<PersonalAccountData data={userData} />
			</PersonalAccountHeader>

            <div className="personal-account__raiting-page">

                <h2 className="personal-account__header">Топ 10 лучших водителей / 18.01</h2>

                <ListGroup className="personal-account__raiting-list">
                    {DATA.map((item, i) => {
                        return <ListGroup.Item className="personal-account__raiting-item" key={i}>
                            <div className="personal-account__raiting-item__raiting">1</div>
                            <div className="personal-account__raiting-item__avatar"><img src={UserNoAvatar} alt="user" /></div>
                            <div className="personal-account__raiting-item__fullname">
                                <div className="personal-account__raiting-item__fullname--surname">{item.surname}</div>
                                <div className="personal-account__raiting-item__fullname--name">{item.name} {item.fatherName}</div>
                            </div>
                            <div className="personal-account__raiting-item__car">
                                <div className="personal-account__raiting-item__car--model">{item.carModel}</div>
                                <div className="personal-account__raiting-item__car--number">{item.carNumber}</div>
                            </div>
                            <div className="personal-account__raiting-item__bonus">
                                <div className="personal-account__raiting-item__bonus--sum">{item.bonusSum} ₽</div>
                                <div className="personal-account__raiting-item__bonus--type">бонус</div>
                            </div>
                            <div className="personal-account__raiting-item__worked">
                                <div className="personal-account__raiting-item__worked--sum">{item.totalEarnSum} ₽</div>
                                <div className="personal-account__raiting-item__worked--orders">{item.orders} заказов / ${item.ordersTime} ч</div>
                            </div>
                        </ListGroup.Item>
                    })}
                </ListGroup>
            </div>
            
        </PersonalAccountRaitingLayout>
    )
}

export default PersonalAccountRaiting;