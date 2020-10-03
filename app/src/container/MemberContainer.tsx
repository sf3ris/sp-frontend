import React, { useEffect } from "react";
import Card from "../layout/Card/Card";
import { IMembersState, getMembers } from "../features/members/slices/memberSlice";
import { RootState } from "../core/store";
import { useSelector, useDispatch } from 'react-redux';
import MemberComponent from "../components/member.component";

const MemberContainer : React.FC<{}> = props => {

    const membersState : IMembersState = useSelector(
        (state : RootState) => state.membersState
    )

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(getMembers());

    }, [])

    return (

        <MemberComponent members={membersState.members} />

    )

}

export default MemberContainer;