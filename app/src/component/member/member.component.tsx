import React, { useState, useEffect } from 'react';
import { IMember } from '../../features/members/models/IMember';
import MemberTableComponent from './Table/memberTable.component';
import { Grid } from '@material-ui/core';
import MemberModal from './Modal/memberModal.component';
import { IMembership } from '../../features/memberships/models/membership';

interface IMemberComponentProps {
    members : IMember[];
    onSave: ( member : Partial<IMember>) => void;
    onDelete : ( member : IMember ) => void;
    onPDF : ( columns : string[]) => void;
    onAddMembership : (member : IMember, membership : IMembership) => void;
}

const MemberComponent : React.FC<IMemberComponentProps> = props => {

    const [ isOpenNewModal, setIsOpenNewModal ] = useState<boolean>(false);

    const [ member, setMember ] = useState<IMember | undefined>(undefined);

    const toggleModal = () => {

        isOpenNewModal && setMember(undefined);
        setIsOpenNewModal(!isOpenNewModal);
        
    }

    const onEdit = ( member : IMember ) => {
        setMember(member);
        toggleModal();
    }

    useEffect(() => {

        setMember(
            props.members.find( m => m._id === member?._id)
        );

    }, [props.members])

    return (

        <section className="grid">
            <article>

                <Grid container spacing={3} style={{padding:'10px'}}>

                    <Grid item xs={12}>

                        <MemberTableComponent 
                            onPDF={props.onPDF}
                            members={props.members} 
                            onNew={toggleModal} 
                            onDelete={props.onDelete}
                            onEdit={onEdit}/>

                    </Grid>

                </Grid>

                <MemberModal 
                    member={member}
                    onSave={props.onSave}
                    isOpen={isOpenNewModal}
                    onAddMembership={props.onAddMembership} 
                    toggle={toggleModal} />

            </article>
        </section>

    )

}

export default MemberComponent;