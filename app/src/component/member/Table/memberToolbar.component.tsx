import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MemberPDFModal from '../PDFModal/memberPDFModal'
import ImportModal from './importModal.component'
import { IHeaderMap } from '../../../features/members/models/IMember'
import { Button, Grid, Label } from 'semantic-ui-react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faFileExcel, faFilePdf } from '@fortawesome/free-regular-svg-icons'

interface IMemberToolbarComponentProps {
    onNew: (...args : any) => void;
    onPDF: (columns : string[]) => void;
    onImportModal: (file: File, headers: IHeaderMap[], headerRow: string) => void;
}

const MemberToolbarComponent : React.FC<IMemberToolbarComponentProps> = props => {
  const [isOpenPDFModal, setIsOpenPDFModal] = useState<boolean>(false)
  const [isOpenImportModal, setIsOpenImportModal] = useState<boolean>(false)

  const togglePDFModal = () => setIsOpenPDFModal(!isOpenPDFModal)
  const toggleImportModal = () => setIsOpenImportModal(!isOpenImportModal)

  const onImportModal = (file: File, headers: IHeaderMap[], headerRow: string) => {
    toggleImportModal()
    props.onImportModal(file, headers, headerRow)
  }

  const spanClass: React.CSSProperties = {
    marginLeft: '5px'
  }

  return (
      <div>
          <Button
              primary={true}
              id="idNewButtonMemberTable"
              onClick={props.onNew}>
              <FontAwesomeIcon icon={faPlus}/>
              <span style={spanClass}>New</span>
          </Button>
          <Button
              primary={true}
              id="idPDFButtonMemberTable"
              onClick={togglePDFModal}>
              <FontAwesomeIcon icon={faFilePdf} />
              <span style={spanClass}>Export PDF</span>
          </Button>
          <Button
              primary={true}
              id="idImportButtonMemberTable"
              onClick={toggleImportModal}>
              <FontAwesomeIcon icon={faFileExcel} />
              <span style={spanClass}>Import XLSX</span>
          </Button>

        <MemberPDFModal
            onOk={props.onPDF}
            isOpen={isOpenPDFModal}
            toggle={togglePDFModal} />

        <ImportModal
            onImportMembers={onImportModal}
            isOpen={isOpenImportModal}
            toggle={toggleImportModal} />
      </div>
  )
}

export default MemberToolbarComponent
