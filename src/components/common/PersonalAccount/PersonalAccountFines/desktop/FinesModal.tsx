import { Carousel, Modal } from "react-bootstrap";
import { ModalTemplateContent } from "../../../ModalFormTemplate";
import img from "../../../../../images/personal-account/fines/fine-modal.png";
import car from "../../../../../images/rent/auto_card.png";
import "../PersonalAccountFines.scss";
import { finesProps } from "../../../../pages/Fines/FinesPage";

const detailData = {
    car: {
        model: 'Tiggo 8 Pro Max',
        number: 'Н445ОМ198198'
    },
    uin: '12345678901234567890',
    name: 'Оплата штрафа по поставлению 12345678901234567890 от 00.00.0000',
    violationDate: '00.00.0000',
    violationPlace: '17 км 440 м,а/д Санкт-петербург-морье, на нп проба, Ленинградская обл.',
    coordinates: '60.069590,30.742230',
    article: '12.9ч.2',
    type: 'Превышение установленной скорости движения транспортного средства на величину более 20, но не более 40 километров в час',
    resolutionDate: '00.00.0000',
    startSum: 500,
    commission: 250,
    currentSum: 750,
    discountDate: '00.00.0000',
    payed: 0,
    link: 'www.pay.com',
    images: [
        'src',
        'src'
    ]
}

const FinesModal: React.FC<{
    onHide: () => void,
    show: boolean,
    data: finesProps
}> = (props) => {
    const { onHide, show, data } = props;

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
                            {data.car.model} {data.car.number + data.car.region}
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
                            {data.date}
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
                            {data.article}
                        </div>
                    </div>
                    <div className="personal-account_fines-modalItem">
                        <div>
                            Расшифровка статьи нарушения:
                        </div>
                        <div>
                            {data.type}
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
                            {data.sum}₽
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
                    <Carousel
                        interval={null}
                        className="personal-account_fines-modalSlider"
                    >
                        {data.images.map((item, index) =>
                            <Carousel.Item key={index}>
                                <div className="personal-account_fines-modalImage">
                                    <img src={item} alt="" />
                                </div>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </ModalTemplateContent>
            </div>
        </Modal>
    )
}

export default FinesModal;