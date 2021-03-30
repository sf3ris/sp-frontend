import React from 'react'
import { Confirm } from 'semantic-ui-react'

interface IConfirmDialogProps {
    onOk: (...args : any) => void;
    onDiscard: (...args : any) => void;
    isOpen: boolean;
    title: string;
}

const ConfirmDialog : React.FC<IConfirmDialogProps> = props => {
  return (
        <Confirm
            open={props.isOpen}
            onCancel={props.onDiscard}
            onConfirm={props.onOk} />
  )
}

export default ConfirmDialog
