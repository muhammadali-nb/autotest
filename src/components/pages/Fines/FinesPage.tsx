import PersonalAccountFinesLayout from "../../layout/PersonalAccountLayout/PersonalAccountFinesLayout";
import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import FinesHead from "../../common/PersonalAccount/PersonalAccountFines/desktop/FinesHead";
import FinesTable from "../../common/PersonalAccount/PersonalAccountFines/desktop/FinesTable";
import { useEffect, useState } from "react";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import doc from "../../../images/personal-account/fines/fine-doc.png";
import FinesList from "../../common/PersonalAccount/PersonalAccountFines/mobile/FinesList";
import FinesHeadMobile from "../../common/PersonalAccount/PersonalAccountFines/mobile/FinesHeadMobile";
import FinesFilterMobile from "../../common/PersonalAccount/PersonalAccountFines/mobile/FinesFilterMobile";
import { useQuery } from "@tanstack/react-query";
import finesService from "../../../api-functions/fines-page/fines-service";

export interface finesProps {
    id: number,
    time: string | boolean,
    date: string,
    image?: string,
    article: string,
    type: string,
    sum: string,
    penalties: string,
    car: {
        model: string,
        number: string,
        region: string
    },
    payed: number,
    images: string[]
}

// const finesData: finesProps[] = [
//     {
//         id: '1',
//         time: '00:00',
//         date: '00.00.0000',
//         image: doc,
//         article: '12.9.2',
//         type: 'Превышение скорости движения ТС от 20 до 40',
//         sum: 2500,
//         penalties: 500,
//         car: {
//             model: 'Kia K5',
//             number: 'М766КС',
//             region: '198'
//         },
//         payed: 0
//     },
//     {
//         id: '4',
//         time: '00:00',
//         date: '00.00.0000',
//         image: doc,
//         article: '12.9.2',
//         type: 'Превышение скорости движения ТС от 20 до 40',
//         sum: 2500,
//         penalties: 500,
//         car: {
//             model: 'Kia K5',
//             number: 'М766КС',
//             region: '198'
//         },
//         payed: 500
//     },
//     {
//         id: '3',
//         time: '00:00',
//         date: '00.00.0000',
//         image: doc,
//         article: '12.9.2',
//         type: 'Превышение скорости движения ТС от 20 до 40',
//         sum: 2500,
//         penalties: 500,
//         car: {
//             model: 'Kia K5',
//             number: 'М766КС',
//             region: '198'
//         },
//         payed: 3000
//     }
// ];

const FinesPage: React.FC = () => {
    const [size, setSize] = useState("desk");

    const { data, isLoading } = useQuery({
        queryKey: ['fines'],
        queryFn: () => finesService.getFines()
    });

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth > 1024) {
                setSize("desk");
            } else {
                setSize("mobile");
            }
        }
        window.addEventListener('resize', checkSize);

        checkSize();

        return () => {
            window.removeEventListener('resize', checkSize);
        }
    }, []);

    console.log(data)

    return (
        <PersonalAccountFinesLayout>
            {size === "desk" ?
                <div>
                    <PersonalAccountHeader>
                        <h1 className="personal-account-header_title">Штрафы</h1>
                        <PersonalAccountBalance />
                    </PersonalAccountHeader>
                    <div className="personal-account_fines">
                        <FinesHead />
                        {(!isLoading && data.list) &&
                            <FinesTable data={data.list} />
                        }
                    </div>
                </div>
                :
                <div>
                    <PersonalAccountHeaderMobile>
                        <h2>Штрафы</h2>
                        <h2></h2>
                        <FinesFilterMobile />
                    </PersonalAccountHeaderMobile>
                    <div className="personal-account_fines">
                        <FinesHeadMobile />
                        {(!isLoading && data.list) &&
                            <FinesList data={data.list} />
                        }
                    </div>
                </div>
            }

        </PersonalAccountFinesLayout>
    )
}

export default FinesPage;