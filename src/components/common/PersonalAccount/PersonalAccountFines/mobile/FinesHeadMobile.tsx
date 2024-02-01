import date from "../../../../../images/personal-account/fines/date.svg";
import arrow from "../../../../../images/personal-account/fines/arrow.svg";
import { rangeProps } from "../../../../pages/Fines/FinesPage";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { ru } from 'date-fns/locale';

const FinesHeadMobile: React.FC<{
    payed: boolean,
    setPayed: () => void,
    range: rangeProps,
    setDates: (arg0: rangeProps) => void
}> = (props) => {
    const { payed, setPayed, range, setDates } = props;

    const [pickerOpened, setPickerOpened] = useState(false);
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
                <div className="psonal-account_fines-dateValue">
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
            <div className="personal-account_fines-checkboxes">
                <label className="personal-account_fines-check" htmlFor="payed">
                    Только неоплаченные
                    <input type="checkbox" name="payed" id="payed" defaultChecked={!payed} onChange={setPayed} />
                    <span></span>
                </label>
            </div>
        </div>
    )
}

export default FinesHeadMobile;