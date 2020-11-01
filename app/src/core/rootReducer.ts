import { combineReducers } from '@reduxjs/toolkit';
import MemberReducers from '../features/members/slices/memberSlice';
import UserReduces from '../shared/user/slices/userSlices';
import AthletesReducers from '../features/athletes/slices/athleteSlice';

const rootReducer = combineReducers({
    membersState : MemberReducers,
    userState : UserReduces,
    athleteState : AthletesReducers
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer