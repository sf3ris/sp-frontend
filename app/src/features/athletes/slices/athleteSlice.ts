import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../../core/store'
import { IHeaderMap, IMember } from '../../members/models/IMember'
import { athleteService } from '../services/athlete.service'
import { IMembership } from '../../memberships/models/membership'
import { membershipService } from '../../memberships/services/memberships.service'

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

    athletesFetching (state : IAthletesState, action: PayloadAction<boolean>) {
      state.athletes = []
      state.error = false
      state.loading = true
    },

    athletesFetchedSuccessfully (state : IAthletesState, action: PayloadAction<IMember[]>) {
      state.athletes = action.payload
      state.error = false
      state.loading = false
    },

    athletesFetchError (state : IAthletesState, action: PayloadAction<boolean>) {
      state.athletes = []
      state.error = true
      state.loading = false
    }

  }
})

export const { athletesFetching, athletesFetchedSuccessfully, athletesFetchError } = athleteSlices.actions
export default athleteSlices.reducer

export const getAthletes = (
  name: string = '',
  lastName: string = '',
  fiscalCode: string = '',
  status: boolean|undefined = undefined
) : AppThunk => async dispatch => {
  try {
    dispatch(athletesFetching(true))
    const response = await athleteService.getAthletes(name, lastName, fiscalCode, status)
    dispatch(athletesFetchedSuccessfully(response.data))
  } catch (e) {
    dispatch(
      athletesFetchError(true)
    )
  }
}

export const postAthlete = (athlete : Partial<Omit<IMember, 'membership'|'id'>>) : AppThunk => async dispatch => {
  try {
    await athleteService.postAthlete(athlete)

    dispatch(getAthletes())
  } catch (e) {
    console.log(e)
  }
}

export const putAthlete = (athlete : Partial<Omit<IMember, 'memberships'>>) : AppThunk => async dispatch => {
  try {
    await athleteService.putAthlete(athlete)

    dispatch(getAthletes())
  } catch (e) {
    console.log(e)
  }
}

export const deleteAthlete = (athlete : IMember) : AppThunk => async dispatch => {
  try {
    await athleteService.deleteAthlete(athlete)

    dispatch(getAthletes())
  } catch (e) {
    console.log(e)
  }
}

export const importAthletes = (
  file: File,
  headers: IHeaderMap[],
  headerRow: string
): AppThunk => async dispatch => {
  try {
    dispatch(athletesFetching(true))
    await athleteService.importAthletes(file, headers, headerRow)
    dispatch(getAthletes())
  } catch (e) {
    dispatch(athletesFetchError(true))
  }
}

export const addMembership = (athlete : IMember, membership : Omit<IMembership, '_id'>) : AppThunk => async dispatch => {
  try {
    await membershipService.addMembership(athlete, membership, 'athlete')

    dispatch(getAthletes())
  } catch (e) {
    console.log(e)
  }
}

export const deleteMembership = (athlete: IMember, membership : IMembership) : AppThunk => async dispatch => {
  try {
    await membershipService.deleteMembership(athlete, membership, 'athlete')

    dispatch(getAthletes())
  } catch (e) {
    console.log(e)
  }
}
