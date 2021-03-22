import React, { useState } from 'react'
import { Grid, Button, makeStyles, Theme, createStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faFilePdf, faFileExcel } from '@fortawesome/free-regular-svg-icons'
import MemberPDFModal from '../PDFModal/memberPDFModal'
import ImportModal from './importModal.component'
import { IHeaderMap } from '../../../features/members/models/IMember'

interface IMemberToolbarComponentProps {
    onNew: (...args : any) => void;
    onPDF: (columns : string[]) => void;
    onImportModal: (file: File, headers: IHeaderMap[], headerRow: string) => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    margin: theme.spacing(2)
  }
}))

const MemberToolbarComponent : React.FC<IMemberToolbarComponentProps> = props => {
  const classes = useStyles()

  const [isOpenPDFModal, setIsOpenPDFModal] = useState<boolean>(false)
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false)

  const togglePDFModal = () => setIsOpenPDFModal(!isOpenPDFModal)
  const toggleImportModal = () => setIsOpenImportModal(!isOpenImportModal)

  const onImportModal = (file: File, headers: IHeaderMap[], headerRow: string) => {
    toggleImportModal()
    props.onImportModal(file, headers, headerRow)
  }

  return (

        <Grid container >
            <Grid item xs={12}>
                <Button className={classes.button} variant="contained" id="idNewButtonMemberTable" onClick={props.onNew} color="primary">
                    <FontAwesomeIcon icon={faPlusSquare} /> <span style={{ marginLeft: '5px' }}>Nuovo</span>
                </Button>

                <Button className={classes.button} variant="contained" id="idPDFButtonMemberTable" onClick={togglePDFModal} color="primary">
                    <FontAwesomeIcon icon={faFilePdf} /> <span style={{ marginLeft: '5px' }}>PDF</span>
                </Button>

                <Button className={classes.button} variant="contained" id="idImportButtonMemberTable" onClick={toggleImportModal} color="primary">
                    <FontAwesomeIcon icon={faFileExcel} /><span style={{ marginLeft: '5px' }}>Import</span>
                </Button>
            </Grid>

            <MemberPDFModal
                onOk={props.onPDF}
                isOpen={isOpenPDFModal}
                toggle={togglePDFModal} />

            <ImportModal
                onImportMembers={onImportModal}
                isOpen={isOpenImportModal}
                toggle={toggleImportModal} />
        </Grid>
  )
}

export default MemberToolbarComponent
