import React, { useState, useEffect } from 'react';
import { IMember } from '../features/members/models/IMember';
import MemberTableComponent from './Table/memberTable.component';
import MemberNewModalComponent from './Modal/memberNewModal.component';
import { Grid } from '@material-ui/core';

interface IMemberComponentProps {
    members : IMember[];
    onSave: ( member : Partial<IMember>) => void;
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

    const onDelete = ( member : IMember ) => {
        console.log("DELETE");
    }

    return (

        <section className="grid">
            <article>

                <Grid container spacing={3} style={{padding:'10px'}}>

                    <Grid item xs={12}>

                        <MemberTableComponent 
                            members={props.members} 
                            onNew={toggleModal} 
                            onDelete={onDelete}
                            onEdit={onEdit}/>

                    </Grid>

                </Grid>

                <MemberNewModalComponent 
                    member={member}
                    onSave={props.onSave}
                    isOpen={isOpenNewModal} 
                    toggle={toggleModal} />

            </article>
        </section>

    )

}

export default MemberComponent;