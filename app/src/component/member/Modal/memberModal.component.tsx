import React, { useEffect, useState } from 'react';
import { IMember } from '../../../features/members/models/IMember';
import { Modal, Tabs, Tab } from '@material-ui/core';
import TabPanel from '../../../layout/Tabs/TabPanel';
import MemberPersonalDataFormComponent from './memberPersonalDataForm.component';
import MemberMembershipForm from './memberMemershipForm.component';
import { IMembership } from '../../../features/memberships/models/membership';

interface IMemberModalProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    onSave: ( member : Partial<IMember>, memberships: Omit<IMembership,"_id">[] ) => void;
    member? : IMember;
    onAddMembership: ( member : IMember, membership: Omit<IMembership,"_id">) => void;
    onDeleteMembership: ( member : IMember, membership : IMembership ) => void;
}

const modalStyle = () : React.CSSProperties => {
    const top = '10vh';
    const left = '25vw';

    return {
        top : top,
        left: left,
        backgroundColor:'#fff',
        position:'absolute',
        padding:'10px',
        width: '50vw',
        height: '80vh',
        overflow:'scroll'
    }
}

const MemberModal : React.FC<IMemberModalProps> = props => {

    const [ tab, setTab ] = useState<number>(0);

    const handleTabChange = ( event : React.ChangeEvent<{}>, tab : number) => setTab(tab)

    const [temporaryMemberships, setTemporaryMemberships] = useState<Omit<IMembership,"_id">[]>([]);

    const onAddMembership = (membership: Omit<IMembership,"_id">) => {
        setTemporaryMemberships([...temporaryMemberships, membership]);
    }

    const onSave =  ( member : Partial<IMember> ) => {
        props.onSave(
            member,
            temporaryMemberships
        );
    }

    return (

        <Modal open={props.isOpen} onClose={props.toggle}>

            <div style={modalStyle()}>

                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Dati Anagrafici" />
                    <Tab label="Tesseramenti" />
                    <Tab label="Documenti" disabled={props.member ? false : true} />
                </Tabs>

                <TabPanel
                    tab={tab} 
                    index={0}>

                        <MemberPersonalDataFormComponent
                            onSave={onSave}
                            isOpen={props.isOpen}
                            toggle={props.toggle}
                            member={props.member}
                            />

                </TabPanel>

                <TabPanel
                    tab={tab} 
                    index={1}>

                        <MemberMembershipForm
                            onTemporaryAddMembership={onAddMembership}
                            member={props.member}
                            onDeleteMembership={props.onDeleteMembership}
                            onAddMembership={props.onAddMembership}/>

                </TabPanel>

                <TabPanel
                    tab={tab} 
                    index={2}>

                </TabPanel>

            </div>

        </Modal>

    )

}

export default MemberModal;
