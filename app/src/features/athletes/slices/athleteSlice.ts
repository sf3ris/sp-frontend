import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../core/store";
import { IMember } from "../../members/models/IMember";
import { IMembership } from "../../memberships/models/membership";
import { athleteService } from "../services/athlete.service";

export interface IAthletesState {
    athletes : IMember[];
    loading : boolean;
    error : boolean;
}

const initialState : IAthletesState = {
    athletes: [],
    loading: false,
    error: false
}

const athleteSlices = createSlice({
    name: 'athletesState',
    initialState,
    reducers: {

        athletesFetching( state : IAthletesState, action: PayloadAction<boolean>) {

            state.athletes = [];
            state.error = false;
            state.loading = true;

        },

        athletesFetchedSuccessfully( state : IAthletesState, action: PayloadAction<IMember[]>) {

            state.athletes = action.payload;
            state.error = false;
            state.loading = false;

        },

        athletesFetchError( state : IAthletesState, action: PayloadAction<boolean>) {

            state.athletes = [];
            state.error = true;
            state.loading = false;

        }

    }
})

export const { athletesFetching, athletesFetchedSuccessfully, athletesFetchError } = athleteSlices.actions;
export default athleteSlices.reducer;

export const getAthletes = ( ) : AppThunk => async dispatch => {

    try{

        dispatch( athletesFetching(true) )

        const athletes = await athleteService.getAthletes( );

        dispatch( athletesFetchedSuccessfully( athletes ))


    }
    catch( e ) {

        console.log(e);

        dispatch(
            athletesFetchError(true)
        )

    }

}

export const postAthlete = ( athlete : Partial<Omit<IMember, "membership"|"id">> ) : AppThunk => async dispatch => {

    try{

        await athleteService.postAthlete( athlete );

        dispatch(getAthletes());

    }
    catch( e ) {
        console.log(e);
    } 

}

export const putAthlete = ( athlete : Partial<Omit<IMember, "memberships">> ) : AppThunk => async dispatch => {

    try{

        await athleteService.putAthlete( athlete );

        dispatch(getAthletes());


    }
    catch( e ) {
        console.log(e);
    }

}

export const deleteAthlete = ( athlete : IMember) : AppThunk => async dispatch => {

    try{

        await athleteService.deleteAthlete( athlete );

        dispatch(getAthletes());

    }
    catch( e ) {

        console.log(e);

    }

}

export const addMembership = (athlete : IMember, membership : Omit<IMembership,"_id"> ) : AppThunk => async dispatch => {

    try{

        //const response = await athl.addMembership( member, membership );

        //dispatch(getMembers());


    }
    catch( e )
    {

        console.log(e);

    }

}

export const deleteMembership = ( athlete: IMember, membership : IMembership ) : AppThunk => async dispatch => {

    try{

        //const response = await membershipService.deleteMembership( member, membership );

        //dispatch(getMembers());


    }
    catch( e )
    {

        console.log(e);

    }

}