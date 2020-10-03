import { combineReducers } from '@reduxjs/toolkit';
import MemberReducers from '../features/members/slices/memberSlice';

const rootReducer = combineReducers({
    membersState : MemberReducers
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer