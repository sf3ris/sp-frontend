import React, { useState } from 'react'
import { IHeaderMap, MemberHeader, memberHeaders } from '../../../features/members/models/IMember'
import { Button, Grid, Input, Label, Modal, Table } from 'semantic-ui-react'

interface IImportModalProps {
    isOpen: boolean;
    toggle: () => void;
    onImportMembers: (file: File, headers: IHeaderMap[], headerRow: string) => void;
}

const ImportModal: React.FC<IImportModalProps> = props => {
  const [headerMaps, setHeaderMaps] = useState<IHeaderMap[]>(
    memberHeaders.map(header => ({ header: header.value, value: header.label }))
  )
  const [fileUpload, setFileUpload] = useState<File|undefined>(undefined)
  const [headerRow, setHeaderRow] = useState<string>('0')

  const handleFileUpload = (files: FileList) => {
    setFileUpload(files[0])
  }

  const onMappingChange = (header: string, value: string) => {
    const headerMapIndex = headerMaps.findIndex((headerMap: IHeaderMap) => headerMap.header === header)
    const tmpHeaderMaps = [...headerMaps]
    headerMapIndex !== -1 && tmpHeaderMaps.splice(headerMapIndex)
    tmpHeaderMaps.push({ header, value })

    setHeaderMaps(tmpHeaderMaps)
  }

  const onImport = () => {
    fileUpload && props.onImportMembers(fileUpload, headerMaps, headerRow)
  }

  const renderMemberHeader = (header: MemberHeader) =>
        <Table.Row key={header.value}>
            <Table.Cell>{header.label}</Table.Cell>
            <Table.Cell>
                <Input
                placeholder={headerMaps.find(item => item.header === header.value)?.value || ''}
                onChange={e => onMappingChange(header.value, e.target.value)}
                />
            </Table.Cell>
        </Table.Row>

  return (
        <Modal open={props.isOpen} onClose={props.toggle}>
            <Modal.Header>
                <h3>Import Configuration</h3>
            </Modal.Header>
            <Modal.Content>
                <div>
                    <Grid columns={3}>
                        <Grid.Column>
                            <Input
                                type="numeric"
                                value={headerRow}
                                onChange={e => setHeaderRow(e.target.value)}
                            />
                            <Label pointing>Header on row...</Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Input
                                type="file"
                                onChange={e => handleFileUpload(e.target.files !!)}
                            />
                        </Grid.Column>
                    </Grid>
                    <Table size="small">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Field</Table.HeaderCell>
                                <Table.HeaderCell>Excel Header</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {memberHeaders.map(renderMemberHeader)}
                        </Table.Body>
                    </Table>
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    disabled={!fileUpload}
                    primary
                    onClick={onImport}
                >
                    Import
                </Button>
            </Modal.Actions>
        </Modal>
  )
}

export default ImportModal
