import React, { SyntheticEvent, useState } from 'react';
import { Calendar, dateFnsLocalizer, stringOrDate, CalendarProps } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import itLocale from 'date-fns/locale/it';
import { IMember } from '../../features/members/models/IMember';

import AttendanceModal from './attendance/attendanceModal.component';

import "react-big-calendar/lib/css/react-big-calendar.css";
import { IAttendance } from '../../features/attendance/models/IAttendance';


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
    onSave: (attendanceId: number|undefined, athletesIds: string[], membersIds: string[], date: Date, title: string) => void;
    onDelete: (attendanceId: number) => void;
    attendances: IAttendance[];
    members: IMember[];
}

const CalendarComponent : React.FC<ICalendarProps> = props => {

    const [isOpenAttendanceModal, setIsOpenAttendan]  = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [stopDate, setStopDate] = useState<Date | undefined>(undefined);
    const [title, setTitle] = useState<string>('');
    const [athletesIds, setAthletesIds] = useState<string[]>([]);
    const [membersIds, setMembersIds] = useState<string[]>([]);
    const [attendanceId, setAttendanceId] = useState<number|undefined>(undefined);

    const toggle = () => {
        setIsOpenAttendan(!isOpenAttendanceModal);
    }

    const onSelect = (slotInfo: {
        start: stringOrDate;
        end: stringOrDate;
        slots: Date[] | string[];
        action: 'select' | 'click' | 'doubleClick';
    })  => {
        setStartDate( new Date(slotInfo.start) );
        setStopDate( new Date(slotInfo.end) );

        toggle();
    }

    const onSelectEvent = (event: any, e: SyntheticEvent) => {
        setTitle(event.title);
        setStartDate(new Date(event.start));
        setStopDate(new Date(event.end));
        setAthletesIds(event.resource.athletes_ids);
        setMembersIds(event.resource.members_ids);
        setAttendanceId(event.resource.attendance_id);

        toggle();
    }

    const onSave = (athletesIds: string[], membersIds: string[], title: string) => {
        startDate && props.onSave(attendanceId, athletesIds, membersIds, startDate, title);
        toggle();
    }

    const onDelete = () => {
        attendanceId && props.onDelete(attendanceId);
        toggle();
    }

    const onAttendanceModalClose = () => {
        setAthletesIds([]);
        setMembersIds([]);
        setStartDate(undefined);
        setStopDate(undefined);
        setTitle('');
        setAttendanceId(undefined);
        toggle();
    }

    return (

        <>

            <Calendar
                selectable={true}
                onSelectSlot={onSelect}
                culture="it-IT"
                onSelectEvent={onSelectEvent}
                views={['month']} 
                popup={true}
                events={props.attendances.map( attendance => (
                    {
                        start: attendance.date,
                        end: attendance.date,
                        title: attendance.title,
                        resource: {
                            athletes_ids: attendance.athletes_ids,
                            members_ids: attendance.members_ids,
                            attendance_id: attendance._id
                        }
                    }))
                }
                style={{height:'500px'}}
                localizer={localizer} />

            { startDate && stopDate &&
                <AttendanceModal
                    members={props.members}
                    selectedAthletesIds={athletesIds}
                    selectedMembersIds={membersIds}
                    title={title}
                    athletes={props.athletes}
                    startDate={startDate}
                    endDate={stopDate}
                    isOpen={isOpenAttendanceModal}
                    onSave={onSave}
                    onDelete={onDelete}
                    toggle={onAttendanceModalClose} />
            }

        </>

    )

}

export default CalendarComponent;
