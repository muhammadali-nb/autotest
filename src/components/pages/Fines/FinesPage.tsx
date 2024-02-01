import PersonalAccountFinesLayout from "../../layout/PersonalAccountLayout/PersonalAccountFinesLayout";
import PersonalAccountHeader from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeader";
import PersonalAccountBalance from "../PersonalAccount/PersonalAccountBalance/PersonalAccountBalance";
import FinesHead from "../../common/PersonalAccount/PersonalAccountFines/desktop/FinesHead";
import FinesTable from "../../common/PersonalAccount/PersonalAccountFines/desktop/FinesTable";
import { useEffect, useState } from "react";
import PersonalAccountHeaderMobile from "../../common/PersonalAccount/PersonalAccountHeader/PersonalAccountHeaderMobile";
import FinesList from "../../common/PersonalAccount/PersonalAccountFines/mobile/FinesList";
import FinesHeadMobile from "../../common/PersonalAccount/PersonalAccountFines/mobile/FinesHeadMobile";
import FinesFilterMobile from "../../common/PersonalAccount/PersonalAccountFines/mobile/FinesFilterMobile";
import { useQuery } from "@tanstack/react-query";
import finesService from "../../../api-functions/fines-page/fines-service";
import FinesLoader from "../../common/PersonalAccount/PersonalAccountFines/FinesLoader";

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

export interface rangeProps {
    startDate: Date,
    endDate: Date,
    key: string
}

const FinesPage: React.FC = () => {
    const [size, setSize] = useState("desk");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [payed, setPayed] = useState(false);
    const [dateRange, setDateRange] = useState<rangeProps>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });
    const [mobileData, setMobileData] = useState<finesProps[]>([]);

    const { data, isLoading } = useQuery({
        queryKey: ['fines', page],
        queryFn: () => finesService.getFines(page)
    });

    useEffect(() => {
        const checkSize = () => {
            if (window.innerWidth > 1024) {
                setMobileData([]);
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

    useEffect(() => {
        if (!data) return;
        if (totalPages !== data.pages) {
            setTotalPages(data.pages);
        }

        if (mobileData !== data && !isLoading && size !== "desk") {
            setMobileData(prev => prev.concat(...data.list));
        }
    }, [data]);

    return (
        <PersonalAccountFinesLayout>
            {size === "desk" ?
                <div>
                    <PersonalAccountHeader>
                        <h1 className="personal-account-header_title">Штрафы</h1>
                        <PersonalAccountBalance />
                    </PersonalAccountHeader>
                    <div className="personal-account_fines">
                        <FinesHead payed={payed} setPayed={() => setPayed(prev => !prev)} range={dateRange} setDates={setDateRange} page={page} setPage={setPage} totalPages={totalPages} />
                        {(isLoading && !data) ?
                            <FinesLoader />
                            :
                            <FinesTable data={data.list} />
                        }
                    </div>
                </div>
                :
                <div>
                    <PersonalAccountHeaderMobile>
                        <h2>Штрафы</h2>
                        <FinesFilterMobile />
                    </PersonalAccountHeaderMobile>
                    <div className="personal-account_fines">
                        <FinesHeadMobile payed={payed} setPayed={() => setPayed(prev => !prev)} range={dateRange} setDates={setDateRange} />
                        {(isLoading && page === 1) ?
                            <FinesLoader />
                            :
                            <FinesList data={mobileData} page={page} setPage={() => setPage(prev => prev + 1)} totalPages={totalPages} isLoading={isLoading} />
                        }
                    </div>
                </div>
            }

        </PersonalAccountFinesLayout>
    )
}

export default FinesPage;