import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../core/store";
import { IAttendance } from "../models/IAttendance";
import { attendanceService } from "../services/attendance.service";

export interface IAttendanceState {
    attendances: IAttendance[];
    loading: boolean;
    error: boolean;
}

const initialAttendanceState: IAttendanceState = {
    attendances: [],
    loading: false,
    error: false
}

const attendanceSlice = createSlice({
    name: 'attendances',
    initialState: initialAttendanceState,
    reducers: {
        attendancesFetching(state: IAttendanceState, action: PayloadAction<boolean>) {
            state.error = false;
            state.loading = action.payload;
        },

        attendancesFetchSuccess(state: IAttendanceState, action: PayloadAction<IAttendance[]>) {
            state.error = false;
            state.attendances = action.payload;
            state.loading = false;
        },

        attendancesFetchError(state: IAttendanceState, action: PayloadAction<boolean>) {
            state.attendances = [];
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const { attendancesFetching, attendancesFetchSuccess, attendancesFetchError } = attendanceSlice.actions;

export default attendanceSlice.reducer;

export const getAttendances = () : AppThunk => async dispatch => {

    try{
        dispatch(attendancesFetching(true));
        const attendances = await attendanceService.getAttendances();
        dispatch(attendancesFetchSuccess(attendances));
    } catch(e) {
        dispatch(attendancesFetchError(true));
    }

}

export const postAttendance = (athletesIds: string[], membersIds: string[], date: Date, title: string): AppThunk => async dispatch => {

    try{
        await attendanceService.postAttendance(athletesIds,membersIds, date, title);
        dispatch(getAttendances());
    } catch(e) {    
        console.log(e);
    }
}

export const updateAttendance = (
    attendanceId: number,
    athletesIds: string[], 
    membersIds: string[],
    title: string
): AppThunk => async dispatch => {
    try{
        await attendanceService.putAttendance(attendanceId, athletesIds,membersIds, title);
        dispatch(getAttendances());
    } catch(e) {    
        console.log(e);
    }
}

export const deleteAttendance = (attendanceId: number): AppThunk => async dispatch => {
    try{
        await attendanceService.deleteAttendance(attendanceId);
        dispatch(getAttendances());
    } catch(e) {    
        console.log(e);
    }
}
