import { Modal } from "react-bootstrap";
import { ModalTemplateContent } from "../../ModalFormTemplate";
import img from "../../../../images/personal-account/fines/fine-modal.png";

const FinesModal: React.FC<{
    onHide: () => void,
    show: boolean
}> = (props) => {
    const { onHide, show } = props;

    return (
        <Modal centered
            onHide={onHide}
            show={show}
        >
            <div className="modal-template">
                <ModalTemplateContent>
                    <div className="personal-account_fines-modalTitle text-uppercase font-weight-semibold">
                        Штраф
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
                            <div>
                                Дата окончания скидки:
                            </div>
                            <div>
                                00.00.0000
                            </div>
                        </div>

                        <div>
                            <div>
                                Статус оплаты:
                            </div>
                            <div>
                                Оплачен
                            </div>
                        </div>
                    </div>
                    <div className="personal-account_fines-modalImage">
                        <img src={img} alt="" />
                    </div>
                </ModalTemplateContent>
            </div>
        </Modal>
    )
}

export default FinesModal;