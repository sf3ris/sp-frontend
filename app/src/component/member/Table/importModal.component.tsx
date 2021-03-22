import {
  Button, Grid,
  Input,
  InputLabel,
  Modal,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core'
import React, { useState } from 'react'
import { IHeaderMap, MemberHeader, memberHeaders } from '../../../features/members/models/IMember'

interface IImportModalProps {
    isOpen: boolean;
    toggle: () => void;
    onImportMembers: (file: File, headers: IHeaderMap[], headerRow: string) => void;
}

const modalStyle = (): React.CSSProperties => {
  const top = '10vh'
  const left = '25vw'

  return {
    top: top,
    left: left,
    backgroundColor: '#fff',
    position: 'absolute',
    padding: '10px',
    width: '50vw',
    height: '80vh',
    overflow: 'scroll'
  }
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
        <TableRow>
            <TableCell>{header.label}</TableCell>
            <TableCell>
                <Input
                placeholder={headerMaps.find(item => item.header === header.value)?.value || ''}
                onChange={e => onMappingChange(header.value, e.target.value)}
                />
            </TableCell>
        </TableRow>

  return (
        <Modal open={props.isOpen} onClose={props.toggle}>
            <div style={modalStyle()}>
                <div>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Field</TableCell>
                                    <TableCell>Excel Header</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {memberHeaders.map(renderMemberHeader)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{ marginTop: '30px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <InputLabel>Header row on Excel</InputLabel>
                            <Input
                                type="numeric"
                                value={headerRow}
                                onChange={e => setHeaderRow(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <input
                                type="file"
                                onChange={e => handleFileUpload(e.target.files !!)}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <Button
                                disabled={!fileUpload}
                                variant="contained"
                                onClick={onImport}
                            >
                                Import
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Modal>
  )
}

export default ImportModal
