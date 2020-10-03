import React, { useEffect } from "react";
import Card from "../layout/Card/Card";
import { IMembersState, getMembers, postMember } from "../features/members/slices/memberSlice";
import { RootState } from "../core/store";
import { useSelector, useDispatch } from 'react-redux';
import MemberComponent from "../components/member.component";
import { IMember } from "../features/members/models/IMember";

const MemberContainer : React.FC<{}> = props => {

    const membersState : IMembersState = useSelector(
        (state : RootState) => state.membersState
    )

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getMembers());

    }, [])

    const onSave = ( member : Partial<IMember> ) => {

        dispatch( postMember( member ));

    }

    return (

        <MemberComponent 
            onSave={onSave}
            members={membersState.members} />

    )

}

export default MemberContainer;