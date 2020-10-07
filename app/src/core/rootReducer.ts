import { combineReducers } from '@reduxjs/toolkit';
import MemberReducers from '../features/members/slices/memberSlice';
import UserReduces from '../shared/user/slices/userSlices';

const rootReducer = combineReducers({
    membersState : MemberReducers,
    userState : UserReduces
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer