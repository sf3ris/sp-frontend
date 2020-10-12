import React, { useState } from 'react';
import { IMember } from '../../../features/members/models/IMember';
import { Modal, Tabs, Tab } from '@material-ui/core';
import TabPanel from '../../../layout/Tabs/TabPanel';
import MemberPersonalDataFormComponent from './memberPersonalDataForm.component';
import MemberMembershipForm from './memberMemershipForm.component';

interface IMemberModalProps {
    isOpen: boolean;
    toggle: (...args: any) => void;
    onSave: ( member : Partial<IMember> ) => void;
    member? : IMember;
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
        width: '50vw'
    }
}

const MemberModal : React.FC<IMemberModalProps> = props => {

    const [ tab, setTab ] = useState<number>(0);

    const handleTabChange = ( event : React.ChangeEvent<{}>, tab : number) => setTab(tab)

    return (

        <Modal open={props.isOpen} onClose={props.toggle}>

            <div style={modalStyle()}>

                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Dati Anagrafici" />
                    <Tab label="Tesseramenti" disabled={props.member ? false : true} />
                    <Tab label="Documenti" disabled={props.member ? false : true} />
                </Tabs>

                <TabPanel
                    tab={tab} 
                    index={0}>

                        <MemberPersonalDataFormComponent
                            {...props} />

                </TabPanel>

                <TabPanel
                    tab={tab} 
                    index={1}>

                        <MemberMembershipForm />

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