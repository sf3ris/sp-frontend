import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, stringOrDate } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import itLocale from 'date-fns/locale/it';
import { IMember } from '../../features/members/models/IMember';

import AttendanceModal from './attendance/attendanceModal.component';

import "react-big-calendar/lib/css/react-big-calendar.css";


const locales = {
    'it-IT': itLocale
  }

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

interface ICalendarProps {
    athletes: IMember[];
}

const CalendarComponent : React.FC<ICalendarProps> = props => {

    const [ isOpenAttendanceModal, setIsOpenAttendan ]  = useState<boolean>(false);
    const [ startDate, setStartDate ]                   = useState<Date | undefined>(undefined);
    const [ stopDate, setStopDate ]                     = useState<Date | undefined>(undefined);

    const toggle = () => {

        setIsOpenAttendan( !isOpenAttendanceModal );

    }

    const onSelect = ( slotInfo: {
        start: stringOrDate;
        end: stringOrDate;
        slots: Date[] | string[];
        action: 'select' | 'click' | 'doubleClick';
    } )  => {

        setStartDate( new Date(slotInfo.start) );
        setStopDate( new Date(slotInfo.end) );

        toggle();

    }

    return (

        <>

            <Calendar
                selectable={true}
                onSelectSlot={onSelect}
                culture="it-IT"
                //views={['month','day']} 
                events={[]}
                style={{height:'500px'}}
                localizer={localizer} />

            { startDate && stopDate && 
                <AttendanceModal
                    athletes={props.athletes}
                    startDate={startDate}
                    endDate={stopDate}
                    isOpen={isOpenAttendanceModal}
                    toggle={toggle} />
            }

        </>

    )

}

export default CalendarComponent;