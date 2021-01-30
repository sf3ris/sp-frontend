import React, { useEffect, useState } from "react";
import { IMembersState, getMembers, postMember, putMember, deleteMember, addMembership, deleteMembership } from "../features/members/slices/memberSlice";
import { RootState } from "../core/store";
import { useSelector, useDispatch } from 'react-redux';
import MemberComponent from "../component/member/member.component";
import { IMember } from "../features/members/models/IMember";
import DefaultLayout from "../layout/DefaultLayout";
import { membersService } from "../features/members/services/members.service";
import useDownload from "../shared/hooks/useDownload";
import { IMembership } from "../features/memberships/models/membership";

const MemberContainer : React.FC<{}> = props => {

    const membersState : IMembersState = useSelector(
        (state : RootState) => state.membersState
    )
    const dispatch = useDispatch();
    const { downloadPdf } = useDownload();

    const [filterTimeout, setFilterTimeout] = useState<NodeJS.Timeout|undefined>(undefined);

    useEffect(() => {

        dispatch(getMembers());

    }, [])

    const onSave = ( member : Partial<IMember>, memberships: Omit<IMembership,"_id">[] ) => {
        console.log(memberships);
        if('_id' in member ) dispatch( putMember(member));
        else dispatch( postMember(member, memberships));
    }

    const onDelete = ( member : IMember ) => {
        dispatch(deleteMember(member));
    }

    const onPDF = async (columns : string[], nameFilter: string, lastNameFilter: string, fiscalCodeFilter: string, statusFilter: boolean|undefined ) => {
        if(columns.length <= 0) return;
        const pdf = await membersService.getPDF(
            columns,
            nameFilter,
            lastNameFilter,
            fiscalCodeFilter,
            statusFilter
        );

        downloadPdf(pdf.data, 'members.pdf');
    }

    const onAddMembership = ( member : IMember, membership : Omit<IMembership,"_id"> ) => {
        dispatch(addMembership(member, membership));
    }

    const onDeleteMembership = ( member : IMember, membership : IMembership ) => {
        dispatch(
            deleteMembership(member, membership)
        );
    }

    const getFilteredMembers = (
        nameFilter: string,
        lastNameFilter: string,
        fiscalCodeFilter: string,
        statusFilter: boolean|undefined
    ) => {
        filterTimeout && clearTimeout(filterTimeout);

        setFilterTimeout(setTimeout(() => {
            dispatch(getMembers(nameFilter, lastNameFilter, fiscalCodeFilter, statusFilter));
        }, 400));
    }

    return (

        <DefaultLayout>

            <MemberComponent
                onDeleteMembership={onDeleteMembership}
                onPDF={onPDF}
                onSave={onSave}
                onDelete={onDelete}
                onAddMembership={onAddMembership}
                getMembers={getFilteredMembers}
                members={membersState.members} />
                
        </DefaultLayout>

    )

}

export default MemberContainer;
