import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MemberComponent from '../component/member/member.component'
import { RootState } from '../core/rootReducer'
import {
  addMembership,
  deleteAthlete, deleteMembership,
  getAthletes,
  IAthletesState,
  importAthletes,
  postAthlete,
  putAthlete
} from '../features/athletes/slices/athleteSlice'
import { IHeaderMap, IMember } from '../features/members/models/IMember'
import { IMembership } from '../features/memberships/models/membership'
import DefaultLayout from '../layout/DefaultLayout'
import { getMembers } from '../features/members/slices/memberSlice'
import { membersService } from '../features/members/services/members.service'
import { athleteService } from '../features/athletes/services/athlete.service'
import useDownload from '../shared/hooks/useDownload'

const AthleteContainer : React.FC<{}> = props => {
  const dispatch = useDispatch()
  const { downloadPdf } = useDownload()

  const [filterTimeout, setFilterTimeout] = useState<NodeJS.Timeout|undefined>(undefined)

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

  const onPDF = async (
    columns : string [],
    nameFilter: string,
    lastNameFilter: string,
    fiscalCodeFilter: string,
    statusFilter: boolean|undefined
  ) => {
    if (columns.length <= 0) return
    const pdf = await athleteService.getPDF(
      columns,
      nameFilter,
      lastNameFilter,
      fiscalCodeFilter,
      statusFilter
    )

    downloadPdf(pdf.data, 'athletes.pdf')
  }

  const onAddMembership = (athlete : IMember, membership : Omit<IMembership, '_id'>) => {
    dispatch(addMembership(athlete, membership))
  }

  const onDeleteMembership = (athlete : IMember, membership : IMembership) => {
    dispatch(deleteMembership(athlete, membership))
  }

  const onMembersImport = (file: File, headers: IHeaderMap[], headerRow: string) => {
    dispatch(importAthletes(file, headers, headerRow))
  }

  const getFilteredAthletes = (nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined) => {
    filterTimeout && clearTimeout(filterTimeout)

    setFilterTimeout(setTimeout(() => {
      dispatch(getAthletes(nameFilter, lastNameFilter, fiscalCodeFilter, statusFilter))
    }, 400))
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
