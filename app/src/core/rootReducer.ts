import { combineReducers } from '@reduxjs/toolkit'
import MemberReducers from '../features/members/slices/memberSlice'
import UserReduces from '../shared/user/slices/userSlices'
import AthletesReducers from '../features/athletes/slices/athleteSlice'
import AttendanceReducers from '../features/attendance/slices/attendanceSlice'
import SettingsReducers from '../features/settings/slices/settingsSlice'

const rootReducer = combineReducers({
  membersState: MemberReducers,
  userState: UserReduces,
  athleteState: AthletesReducers,
  attendanceState: AttendanceReducers,
  settingsState: SettingsReducers
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
