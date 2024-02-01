import "../PersonalAccountFines.scss";
import Utils from "../../../../../utils/Utils";
import { useState } from "react";
import FinesModal from "./FinesModal";
import { finesProps } from "../../../../pages/Fines/FinesPage";

const FinesTable: React.FC<{
    data: finesProps[]
}> = (props) => {
    const { data } = props;

    const [modalOpened, setModalOpened] = useState(false);
    const [modalData, setModalData] = useState<finesProps>({
        id: 0,
        time: '',
        date: '',
        article: '',
        type: '',
        sum: '',
        penalties: '',
        car: {
            model: '',
            number: '',
            region: ''
        },
        images: [
            ''
        ],
        payed: 0
    });

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
                    {data.map(item =>
                        <tr key={item.id} onClick={() => {
                            setModalData(item);
                            setModalOpened(true);
                        }}>
                            <td>
                                {item.date} <br />
                                {item.time}
                            </td>
                            <td align="left">
                                <img src={item.image} alt="" />
                                <div className="personal-account_fines-fineCell">
                                    {item.article} <br />
                                    {item.type}
                                </div>
                            </td>
                            <td>
                                {Utils.formatNumber(parseFloat(item.sum))}₽ {parseFloat(item.penalties) > 0 ? <span>+ {parseFloat(item.penalties)}₽ (пени)</span> : ""} <br />
                                {Utils.formatNumber(parseFloat(item.sum) + parseFloat(item.penalties))}₽ (итог включая пени)
                            </td>
                            <td className="font-weight-semibold">
                                {item.car.model} <br />
                                {item.car.number}&nbsp;&nbsp;{item.car.region}
                            </td>
                            <td>
                                {(item.payed === parseFloat(item.sum) + parseFloat(item.penalties)) &&
                                    <span className="payed">
                                        Оплачен
                                    </span>
                                }
                                {(item.payed > 0 && item.payed < (parseInt(item.sum) + parseFloat(item.penalties))) &&
                                    <span className="progress">
                                        {item.payed} / {parseFloat(item.sum) + parseFloat(item.penalties)} ₽
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
            {data &&
                <FinesModal show={modalOpened} data={modalData} onHide={() => setModalOpened(false)} />
            } 
        </>
    )
}

export default FinesTable;