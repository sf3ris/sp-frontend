import { combineReducers } from '@reduxjs/toolkit';
import MemberReducers from '../features/members/slices/memberSlice';
import UserReduces from '../shared/user/slices/userSlices';
import AthletesReducers from '../features/athletes/slices/athleteSlice';
import AttendanceReducers from '../features/attendance/slices/attendanceSlice';

const rootReducer = combineReducers({
    membersState: MemberReducers,
    userState: UserReduces,
    athleteState: AthletesReducers,
    attendanceState: AttendanceReducers
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
