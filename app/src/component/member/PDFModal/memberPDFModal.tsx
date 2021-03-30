import React, { useState } from 'react'
import { IMember, memberHeaders, MemberHeader } from '../../../features/members/models/IMember'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-regular-svg-icons'
import { Button, Checkbox, CheckboxProps, Form, Modal } from 'semantic-ui-react'

interface IMemberPDFModal {
    isOpen: boolean;
    onOk : (columns : string[]) => void;
    toggle : (...args : any) => void;
}

interface HeaderCheck extends MemberHeader {
    checked : boolean
}

const MemberPDFModal : React.FC<IMemberPDFModal> = props => {
  const [checkedHeaders, setCheckedHeaders] = useState<HeaderCheck[]>(memberHeaders.map(header => ({ ...header, checked: true })))

  const handleHeaderChange = (e : React.FormEvent<HTMLInputElement>, data: CheckboxProps, header : HeaderCheck) => {
    const i = checkedHeaders.findIndex(h => h.value === header.value)

    const tmpCheckedHeader = [...checkedHeaders]
    tmpCheckedHeader[i].checked = data.checked as boolean

    setCheckedHeaders(
      tmpCheckedHeader
    )
  }

  const renderCheckboxHeader = (header : HeaderCheck, index : number) =>
      <Form.Field key={index}>
          <Checkbox
              toggle={true}
              checked={header.checked}
              label={<label>{header.label}</label>}
              onChange={(e, data) => handleHeaderChange(e, data, header)} />
      </Form.Field>

  const onPdf = () => {
    props.onOk(
      checkedHeaders.filter(header => header.checked === true).map(header => header.value)
    )
  }

  return (

        <Modal open={props.isOpen} onClose={props.toggle}>
            <Modal.Header>
                <h3> Seleziona Colonne da esportare </h3>
            </Modal.Header>
            <Modal.Content>
                <div>
                    <Form>
                        {checkedHeaders.map(renderCheckboxHeader)}
                    </Form>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    primary
                    disabled={!checkedHeaders.some(header => header.checked)}
                    onClick={onPdf}
                    startIcon={<FontAwesomeIcon icon={faFilePdf} />} >
                    Esporta
                </Button>
            </Modal.Actions>
        </Modal>
  )
}

export default MemberPDFModal
