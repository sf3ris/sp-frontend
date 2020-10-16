import { IMember } from '../models/IMember';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../../core/store';
import { membersService } from '../services/members.service';
import { IMembership } from '../../memberships/models/membership';
import { membershipService } from '../../memberships/services/memberships.service';

export interface IMembersState {
    members : IMember[];
    loading : boolean;
    error : boolean;
}

const initialMembersState : IMembersState = {
    members: [],
    loading: false,
    error: false
}

const membersSlice = createSlice({
    name : 'members',
    initialState: initialMembersState,
    reducers: {

        membersFetching( state : IMembersState, action : PayloadAction<boolean> ) {

            state.error = false;
            state.loading = action.payload

        },

        membersFetchSuccess( state : IMembersState, action : PayloadAction<IMember[]>) {

            state.error = false;
            state.members = action.payload;
            state.loading = false;

        },

        membersFetchError( state : IMembersState, action: PayloadAction<boolean>){

            state.members = [];
            state.error = action.payload;
            state.loading = false;

        }

    }
})

export const { membersFetching, membersFetchSuccess, membersFetchError } = membersSlice.actions;

export default membersSlice.reducer;

export const getMembers = ( ) : AppThunk => async dispatch => {

    try{

        dispatch( membersFetching(true));

        const members = await membersService.getMembers( );

        dispatch( membersFetchSuccess( members ));

    }
    catch( e ) {

        dispatch(membersFetchError(true));

    }

}

export const postMember = ( member : Partial<Omit<IMember, "memberships"|"id">>) : AppThunk => async dispatch => {

    try {

        await membersService.postMember( member );

        dispatch(getMembers());

    }
    catch( e ) {

        console.log(e);

    }

}

export const putMember = ( member : Partial<Omit<IMember, "memberships">>) : AppThunk => async dispatch => {

    try{

        await membersService.putMember( member );

        dispatch(getMembers());

    }
    catch( e ) {

        console.log(e);

    }

}

export const deleteMember = ( member : IMember) : AppThunk => async dispatch => {

    try{

        await membersService.deleteMember( member );

        dispatch(getMembers());

    }
    catch( e ) {

        console.log(e);

    }

}

export const addMembership = (member : IMember, membership : IMembership ) : AppThunk => async dispatch => {

    try{

        const response = await membershipService.addMembership( member, membership );

        dispatch(getMembers());


    }
    catch( e )
    {

        console.log(e);

    }

}



