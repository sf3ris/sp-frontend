import React from 'react';
import { Modal } from '@material-ui/core';

export interface ISimpleModalProps {
    isOpen: boolean;
    toggle: (...args: any) => void;

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


const SimpleModal : React.FC<ISimpleModalProps> = props => {


    return (

        <Modal open={props.isOpen} onClose={props.toggle}>

            <div style={modalStyle()}>

                {props.children}
            
            </div>

        </Modal>

    )

}

export default SimpleModal;