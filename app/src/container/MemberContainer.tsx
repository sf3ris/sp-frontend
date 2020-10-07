import React, { useEffect } from "react";
import Card from "../layout/Card/Card";
import { IMembersState, getMembers, postMember, putMember, deleteMember } from "../features/members/slices/memberSlice";
import { RootState } from "../core/store";
import { useSelector, useDispatch } from 'react-redux';
import MemberComponent from "../component/member/member.component";
import { IMember } from "../features/members/models/IMember";
import DefaultLayout from "../layout/DefaultLayout";

const MemberContainer : React.FC<{}> = props => {

    const membersState : IMembersState = useSelector(
        (state : RootState) => state.membersState
    )

    const dispatch = useDispatch();

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

    return (

        <DefaultLayout>

            <MemberComponent 
                onSave={onSave}
                onDelete={onDelete}
                members={membersState.members} />
                
        </DefaultLayout>

    )

}

export default MemberContainer;