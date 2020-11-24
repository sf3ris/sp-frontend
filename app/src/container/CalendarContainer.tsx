import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarComponent from '../component/calendar/calendar.component';
import { RootState } from '../core/store';
import { IAthletesState } from '../features/athletes/slices/athleteSlice';
import { getAthletes } from '../features/athletes/slices/athleteSlice';
import DefaultLayout from '../layout/DefaultLayout';

const CalendarContainer : React.FC<{}> = props => {

    const dispatch = useDispatch();

    const athletesState  : IAthletesState = useSelector(
        ( state : RootState ) => state.athleteState
    );

    useEffect(() => {

        dispatch(getAthletes());

    }, []);

    return (

        <DefaultLayout >

            
                <CalendarComponent 
                    athletes={athletesState.athletes} />
            

        </DefaultLayout>

    )

}

export default CalendarContainer;