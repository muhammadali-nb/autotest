import "./PersonalAccountFines.scss";
import doc from "../../../../images/personal-account/fines/fine-doc.png";
import Utils from "../../../../utils/Utils";
import { useState } from "react";
import FinesModal from "./FinesModal";

const finesData = [
    {
        id: '1',
        time: '00:00',
        date: '00.00.0000',
        image: '',
        article: '12.9.2',
        type: 'Превышение скорости движения ТС от 20 до 40',
        sum: 2500,
        penalties: 500,
        car: {
            model: 'Kia K5',
            number: 'М766КС',
            region: '198'
        },
        payed: 0
    },
    {
        id: '4',
        time: '00:00',
        date: '00.00.0000',
        image: '',
        article: '12.9.2',
        type: 'Превышение скорости движения ТС от 20 до 40',
        sum: 2500,
        penalties: 500,
        car: {
            model: 'Kia K5',
            number: 'М766КС',
            region: '198'
        },
        payed: 500
    },
    {
        id: '3',
        time: '00:00',
        date: '00.00.0000',
        image: '',
        article: '12.9.2',
        type: 'Превышение скорости движения ТС от 20 до 40',
        sum: 2500,
        penalties: 500,
        car: {
            model: 'Kia K5',
            number: 'М766КС',
            region: '198'
        },
        payed: 3000
    }
];

const FinesTable: React.FC = () => {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            <table cellPadding={0} cellSpacing={0} className="personal-account_fines-table">
                <thead>
                    <tr>
                        <td>
                            Дата / время
                        </td>
                        <td>
                            Штраф
                        </td>
                        <td>
                            Сумма
                        </td>
                        <td>
                            Автомобиль
                        </td>
                        <td>
                            Статус
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {finesData.map(item =>
                        <tr key={item.id} onClick={() => setModalOpened(true)}>
                            <td>
                                {item.date} <br />
                                {item.time}
                            </td>
                            <td align="left">
                                <img src={doc} alt="" />
                                <div className="personal-account_fines-fineCell">
                                    {item.article} <br />
                                    {item.type}
                                </div>
                            </td>
                            <td>
                                {Utils.formatNumber(item.sum)}₽ {item.penalties > 0 ? <span>+ {item.penalties}₽ (пени)</span> : ""} <br />
                                {Utils.formatNumber(item.sum + item.penalties)}₽ (итог включая пени)
                            </td>
                            <td className="font-weight-semibold">
                                {item.car.model} <br />
                                {item.car.number}&nbsp;&nbsp;{item.car.region}
                            </td>
                            <td>
                                {(item.payed === item.sum + item.penalties) &&
                                    <span className="payed">
                                        Оплачен
                                    </span>
                                }
                                {(item.payed > 0 && item.payed < (item.sum + item.penalties)) &&
                                    <span className="progress">
                                        {item.payed} / {item.sum + item.penalties} ₽
                                    </span>
                                }
                                {item.payed === 0 &&
                                    <span className="not-payed">
                                        Не оплачен
                                    </span>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <FinesModal show={modalOpened} onHide={() => setModalOpened(false)} />
        </>
    )
}

export default FinesTable;