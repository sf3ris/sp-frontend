import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarComponent from '../component/calendar/calendar.component';
import { RootState } from '../core/store';
import { IAthletesState } from '../features/athletes/slices/athleteSlice';
import { getAthletes } from '../features/athletes/slices/athleteSlice';
import { deleteAttendance, getAttendances, IAttendanceState, postAttendance, updateAttendance } from '../features/attendance/slices/attendanceSlice';
import { getMembers, IMembersState } from '../features/members/slices/memberSlice';
import DefaultLayout from '../layout/DefaultLayout';

const CalendarContainer : React.FC<{}> = props => {

    const dispatch = useDispatch();

    const athletesState: IAthletesState = useSelector(
        ( state : RootState ) => state.athleteState
    );

    const attendanceState: IAttendanceState = useSelector(
        (state: RootState) => state.attendanceState
    );

    const membersState: IMembersState = useSelector(
        (state: RootState) => state.membersState
    );

    useEffect(() => {
        dispatch(getAthletes());
        dispatch(getMembers());
        dispatch(getAttendances());
    }, []);

    const onSave = async (attendanceId: number|undefined, athletesIds: string[], membersIds: string[], date: Date, title: string) => {
        if (attendanceId) {
            dispatch(updateAttendance(attendanceId, athletesIds, membersIds, title));
        } else {
            dispatch(postAttendance(athletesIds,membersIds, date, title));
        }
    }

    const onDelete = async (attendanceId: number) => {
        dispatch(deleteAttendance(attendanceId));
    }

    return (
        <DefaultLayout >
                <CalendarComponent
                    members={membersState.members}
                    attendances={attendanceState.attendances}
                    onSave={onSave}
                    onDelete={onDelete} 
                    athletes={athletesState.athletes} />
        </DefaultLayout>
    )

}

export default CalendarContainer;
