import date from "../../../../../images/personal-account/fines/date.svg";
import "../PersonalAccountFines.scss";
import arrow from "../../../../../images/personal-account/fines/arrow.svg";
import doubleArrow from "../../../../../images/personal-account/fines/double-arrow.svg";
import { useEffect, useRef, useState } from "react";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from "react-date-range";
import { ru } from 'date-fns/locale';
import { rangeProps } from "../../../../pages/Fines/FinesPage";

const FinesHead: React.FC<{
    payed: boolean,
    setPayed: () => void,
    range: rangeProps,
    setDates: (arg0: rangeProps) => void,
    page: number,
    setPage: (arg0: number) => void,
    totalPages: number
}> = (props) => {
    const { payed, setPayed, range, setDates, page, setPage, totalPages } = props;

    const [pickerOpened, setPickerOpened] = useState(false);
    const [subPage, setSubPage] = useState(1);

    const maxSubPage = Math.floor(totalPages / 3) + (totalPages % 3 > 0 ? 1 : 0);

    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.target instanceof Node && !pickerRef.current?.contains(e.target))
                setPickerOpened(false);
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    const handleSelect = (ranges) => {
        setDates(ranges.selection);
    }

    const getDate = (date: Date) => {
        let day: string | number = date.getDate();
        let month: string | number = date.getMonth() + 1;

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month
        }

        return `${day}.${month}.${date.getFullYear()}`
    }

    const moveDates = (increment: boolean) => {
        const currentStartDate = range.startDate;
        const currentEndDate = range.endDate;

        let newStartDate: Date;
        let newEndDate: Date;

        const timeDifference = Math.abs(currentStartDate.getTime() - currentEndDate.getTime());
        let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

        if (daysDifference === 0) daysDifference = 1;

        const addDaysToDate = (date: Date, days: number): Date => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + days);
            return newDate;
        }

        if (increment) {
            newStartDate = addDaysToDate(currentStartDate, daysDifference);
            newEndDate = addDaysToDate(currentEndDate, daysDifference);
        } else {
            newStartDate = addDaysToDate(currentStartDate, daysDifference * -1);
            newEndDate = addDaysToDate(currentEndDate, daysDifference * -1);
        }

        setDates({
            startDate: newStartDate,
            endDate: newEndDate,
            key: 'selection'
        });
    }

    const renderPageButtons = () => {
        const buttons: React.ReactNode[] = [];

        for (let i = subPage; i <= subPage + 2; i++) {
            if (i <= totalPages) {
                buttons.push(
                    <div className={'personal-account_fines-page ' + (page === i * subPage ? 'active' : '')} onClick={() => setPage(i * subPage)}>
                        {i + (subPage > 1 ? 2 : 0)}
                    </div>
                );
            }
            
        }

        return buttons;
    }

    // useEffect(() => {
    //     if (page > 3) {
    //         setSubPage(page % 3);
    //     } else {
    //         setSubPage(1);
    //     }
    // }, [page]);

    return (
        <div className="personal-account_fines-head">
            <div className="personal-account_fines-datefilter" ref={pickerRef}>
                <DateRangePicker
                    className={pickerOpened ? 'active' : ''}
                    locale={ru}
                    ranges={[range]}
                    onChange={handleSelect}
                    weekdayDisplayFormat={'EEEEEE'}
                    staticRanges={[]}
                />
                <img src={date} alt="Дата" onClick={() => setPickerOpened(prev => !prev)} />
                <span className="personal-account_fines-prevDate" onClick={() => moveDates(false)}>
                    <img src={arrow} alt="Предыдущая дата" />
                </span>
                <div className="personal-account_fines-dateValue">
                    <span>
                        {getDate(range.startDate)}
                    </span>
                    -
                    <span>
                        {getDate(range.endDate)}
                    </span>
                </div>
                <span className="personal-account_fines-nextDate" onClick={() => moveDates(true)}>
                    <img src={arrow} alt="Следующая дата" />
                </span>
            </div>
            <div className="personal-account_fines-payed">
                <span>Оплачены</span>
                <div className={!payed ? "not-payed" : ""} onClick={setPayed}>

                </div>
                <span>Не оплачены</span>
            </div>
            <div className="personal-account_fines-pages">
                {(totalPages > 3 && subPage > 1) &&
                    <div className="personal-account_fines-prevPages" onClick={() => setSubPage(prev => prev - 1)}>
                        <img src={doubleArrow} alt="Пред. 3 страницы" />
                    </div>
                }
                {page > 1 &&
                    <div className="personal-account_fines-prevPage" onClick={() => setPage(page - 1)}>
                        <img src={arrow} alt="Предыдущая страница" />
                    </div>
                }
                {renderPageButtons()}
                {page < totalPages &&
                    <div className="personal-account_fines-nextPage" onClick={() => setPage(page + 1)}>
                        <img src={arrow} alt="Следующая страница" />
                    </div>
                }
                {(subPage < maxSubPage && totalPages > 3) &&
                    <div className="personal-account_fines-nextPages" onClick={() => setSubPage(prev => prev + 1)}>
                        <img src={doubleArrow} alt="След. 3 страницы" />
                    </div>
                }
                {totalPages > 3 &&
                    <div className="personal-account_fines-page" onClick={() => setPage(totalPages)}>
                        {totalPages}
                    </div>
                }
            </div>
        </div>
    )
}

export default FinesHead;