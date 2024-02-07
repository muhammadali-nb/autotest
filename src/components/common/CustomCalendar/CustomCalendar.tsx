import { Calendar, CalendarProps } from 'react-date-range';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import './CustomCalendar.scss';

interface CustomCalendarProps extends CalendarProps {
    isOpen: boolean;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ isOpen, ...otherProps }) => {

    return <Calendar  className={isOpen ? "active" : ""} {...otherProps} />
} 

export default CustomCalendar;