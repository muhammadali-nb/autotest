import { useState } from "react";
import filter from "../../../../../images/personal-account/fines/filter.svg";
import { HeaderLogoImage } from "../../../../layout/Header";
import back from "../../../../../images/common/back-dark.svg";
import confirm from "../../../../../images/personal-account/fines/confirm.svg";

const data = {
    cars: [
        {
            name: 'Hyundai Sonata',
            number: 'К638ЕТ 53',
            amount: 3
        },
        {
            name: 'Toyota Camry',
            number: 'К638ЕТ 53',
            amount: 1
        },
        {
            name: 'Kia Rio',
            number: 'К638ЕТ 53',
            amount: 2
        }
    ]
}

const FilterItem: React.FC<{
    title: string,
    items: any[]
}> = (props) => {
    const { title, items } = props;

    const [active, setActive] = useState(true);

    return (
        <div className="personal-account_fines-filterItem">
            <div className={"personal-account_fines-filterHead " + (active ? "active" : "")} onClick={() => setActive(prev => !prev)}>
                {title}
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M5.5 13.75L11 8.25L16.5 13.75" stroke="#BABCBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {active && items.map((item, index) =>
                <div key={index}>
                    <label className="personal-account_fines-check" htmlFor={item.name}>
                        {item.name}&nbsp;<p>{item.number}</p>&nbsp;{(item.amount > 1 ? <p>({item.amount})</p> : "")}
                        <input type="checkbox" name={item.name} id={item.name} />
                        <span></span>
                    </label>
                </div>
            )}
        </div>
    )
}

const FinesFilterMobile: React.FC = () => {
    const [active, setActive] = useState(false);

    return (
        <>
            <div>
                <img src={filter} alt="" onClick={() => setActive(prev => !prev)} />
            </div>
            {active &&
                <>
                    <div className={`balance-mobile  ${active && "active"}`}>
                        <div className="balance-mobile_head">
                            <div className="mobile-modal_header-top">
                                <img src={back} onClick={() => setActive(false)} alt="" />
                                <HeaderLogoImage width={"100px"} height={"24px"} image="dark" />
                                <img src={confirm} alt="" onClick={() => setActive(false)} />
                            </div>
                        </div>
                        <div className="balance-mobile_body">
                            <FilterItem title={"Автомобиль"} items={data.cars} />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default FinesFilterMobile;