import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MemberComponent from '../component/member/member.component'
import { RootState } from '../core/rootReducer'
import {
  deleteAthlete,
  getAthletes,
  IAthletesState,
  importAthletes,
  postAthlete,
  putAthlete
} from '../features/athletes/slices/athleteSlice'
import { IHeaderMap, IMember } from '../features/members/models/IMember'
import { IMembership } from '../features/memberships/models/membership'
import DefaultLayout from '../layout/DefaultLayout'

const AthleteContainer : React.FC<{}> = props => {
  const dispatch = useDispatch()

  const athletesState : IAthletesState = useSelector(
    (state : RootState) => state.athleteState
  )

  const onSave = (athlete : Partial<IMember>) => {
    if ('_id' in athlete) dispatch(putAthlete(athlete))
    else dispatch(postAthlete(athlete))
  }

  const onDelete = (athlete : IMember) => {
    dispatch(deleteAthlete(athlete))
  }

  const onPDF = async (columns : string []) => {

  }

  const onAddMembership = (athlete : IMember, membership : Omit<IMembership, '_id'>) => {

  }

  const onDeleteMembership = (athlete : IMember, membership : IMembership) => {

  }

  const onMembersImport = (file: File, headers: IHeaderMap[], headerRow: string) => {
    dispatch(importAthletes(file, headers, headerRow))
  }

  const getFilteredAthletes = (nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) => {
    setTimeout(() => {
      dispatch(getAthletes())
    }, 400)
  }

  return (

        <DefaultLayout>

            <MemberComponent
                onImportModal={onMembersImport}
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

export default AthleteContainer
