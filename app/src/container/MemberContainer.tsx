import React, { useEffect } from "react";
import Card from "../layout/Card/Card";
import { IMembersState, getMembers, postMember, putMember, deleteMember, addMembership } from "../features/members/slices/memberSlice";
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

    useEffect(() => {

        dispatch(getMembers());

    }, [])

    const onSave = ( member : Partial<IMember> ) => {

        if('_id' in member ) dispatch( putMember(member));
        else dispatch( postMember( member ));


    }

    const onDelete = ( member : IMember ) => {

        dispatch(deleteMember(member));

    }

    const onPDF = async () => {

        const pdf = await membersService.getPDF();

        downloadPdf(pdf.data, 'members.pdf');

    }

    const onAddMembership = ( member : IMember, membership : IMembership ) => {

        dispatch(addMembership(member, membership));

    }

    return (

        <DefaultLayout>

            <MemberComponent 
                onPDF={onPDF}
                onSave={onSave}
                onDelete={onDelete}
                onAddMembership={onAddMembership}
                members={membersState.members} />
                
        </DefaultLayout>

    )

}

export default MemberContainer;