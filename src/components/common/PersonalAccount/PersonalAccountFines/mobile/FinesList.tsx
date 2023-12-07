import { useState } from "react";
import Utils from "../../../../../utils/Utils";
import { finesProps } from "../../../../pages/Fines/FinesPage";
import FinesModalMobile from "./FinesModalMobile";

const FinesList: React.FC<{
    data: finesProps[]
}> = (props) => {
    const { data } = props;

    const [modalOpened, setModalOpened] = useState(false);

    const totalSum = () => {
        return data.reduce((acc, item) => acc + item.sum + item.penalties, 0);
    }

    return (
        <>
            <ul className="personal-account_fines-mobileList">
                {data.map(item =>
                    <li className="personal-account_fines-mobileItem" key={item.id} onClick={() => setModalOpened(true)}>
                        <div className="personal-account_fines-mobileHead">
                            <div>
                                <span>
                                    {item.date}
                                </span>
                                <br />
                                {Utils.formatNumber(item.sum + item.penalties)} ₽&nbsp;&nbsp;<span>{Utils.formatNumber(item.sum)} ₽ + {Utils.formatNumber(item.penalties)} ₽ (пени)</span>
                            </div>
                            <div>
                                <span>{item.time}</span><br />
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
                            </div>
                        </div>
                        <div className="personal-account_fines-mobileInfo">
                            <div>
                                <span>
                                    {item.car.model}
                                </span>
                                <span>
                                    {item.article}
                                </span>
                            </div>
                            <div>
                                {item.type}
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <button className="site-btn big personal-account_fines-mobileBtn">
                Оплатить всё ({Utils.formatNumber(totalSum())} ₽)
            </button>
            {modalOpened &&
                <FinesModalMobile setActive={setModalOpened} />
            }
        </>
    )
}

export default FinesList;