import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MemberComponent from '../component/member/member.component';
import { RootState } from '../core/rootReducer';
import { deleteAthlete, getAthletes, IAthletesState, postAthlete, putAthlete } from '../features/athletes/slices/athleteSlice';
import { IMember } from '../features/members/models/IMember';
import { IMembership } from '../features/memberships/models/membership';
import DefaultLayout from '../layout/DefaultLayout';


const AthleteContainer : React.FC<{}> = props => {

    const dispatch = useDispatch();

    const athletesState  : IAthletesState = useSelector(
        ( state : RootState ) => state.athleteState
    )

    useEffect(() => {

        dispatch( getAthletes() );

    } , [])
    
    const onSave = ( athlete : Partial<IMember> ) => {

        if('_id' in athlete) dispatch(putAthlete(athlete));
        else dispatch( postAthlete(athlete));

    }

    const onDelete = ( athlete : IMember ) => {
        dispatch(deleteAthlete(athlete));
    }

    const onPDF = async ( columns : string []) => {


    }

    const onAddMembership = ( athlete : IMember, membership : Omit<IMembership,"_id"> ) => {


    }

    const onDeleteMembership = ( athlete : IMember, membership : IMembership ) => {

    }

    const getFilteredAthletes = (nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) => {
        setTimeout(() => {
            dispatch(getAthletes());
        }, 1000);  
    }


    return (

        <DefaultLayout>

            <MemberComponent
                getMembers={getFilteredAthletes}
                onSave={onSave}
                onPDF={onPDF}
                onDelete={onDelete}
                onAddMembership={onAddMembership}
                onDeleteMembership={onDeleteMembership}
                members={athletesState.athletes} />

        </DefaultLayout>

    )

}

export default AthleteContainer;
