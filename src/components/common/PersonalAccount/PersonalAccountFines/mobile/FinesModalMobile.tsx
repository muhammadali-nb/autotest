import { HeaderLogoImage } from "../../../../layout/Header";
import back from "../../../../../images/common/back-dark.svg";
import img from "../../../../../images/personal-account/fines/fine-modal.png";

const FinesModalMobile: React.FC<{
    setActive: (arg0: boolean) => void
}> = (props) => {
    const { setActive } = props;

    return (
        <div className="balance-mobile active">
            <div className="balance-mobile_head">
                <div className="mobile-modal_header-top">
                    <img src={back} onClick={() => setActive(false)} alt="" />
                    <HeaderLogoImage width={"100px"} height={"24px"} image="dark" />
                    <div></div>
                </div>
            </div>
            <div className="balance-mobile_body">
                <div className="personal-account_fines-modalTitle text-uppercase font-weight-semibold">
                    Информация
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Автомобиль:
                    </div>
                    <div>
                        Chery Tiggo 7 Pro H257PB198
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        УИН:
                    </div>
                    <div>
                        12345678901234567890
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Наименоване штрафа:
                    </div>
                    <div>
                        Оплата штрафа по поставлению <br /> 12345678901234567890 от 00.00.0000
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Дата нарушения:
                    </div>
                    <div>
                        00.00.00 00:00:00
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Место нарушения:
                    </div>
                    <div>
                        17 км 440 м,а/д Санкт-петербург-морье, на нп проба, Ленинградская обл.
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Координаты:
                    </div>
                    <div>
                        60.069590,30.742230
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Статья нарушения:
                    </div>
                    <div>
                        12.9ч.2
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Расшифровка статьи нарушения:
                    </div>
                    <div>
                        Превышение установленной скорости движения транспортного средства на величину более 20, но не более 40 километров
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Дата выписывания постановления:
                    </div>
                    <div>
                        00.00.0000
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Изначальная сумма штрафа:
                    </div>
                    <div>
                        500₽
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Комиссия за оплату:
                    </div>
                    <div>
                        250 ₽
                    </div>
                </div>
                <div className="personal-account_fines-modalItem">
                    <div>
                        Сумма к оплате с учётом скидки и предыдущих платежей:
                    </div>
                    <div>
                        0 ₽
                    </div>
                </div>
                <div className="personal-account_fines-modalItem flex">
                    <div>
                        <span>Дата окончания скидки:</span>
                        <span>00.00.0000</span>
                    </div>

                    <div>
                        <span>Статус оплаты:</span>
                        <span>Оплачен</span>
                    </div>
                </div>
                <div className="personal-account_fines-modalTitle text-uppercase font-weight-semibold">
                    Фото
                </div>
                <div className="personal-account_fines-modalImage">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default FinesModalMobile;