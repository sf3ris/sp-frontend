import React, { useEffect, useState } from 'react'
import { Button, Form, Grid, Input } from 'semantic-ui-react'
import { ISettings } from '../../features/settings/interfaces/ISettings'

interface ISettingsComponentProps {
    settings: ISettings,
    loading: boolean,
    onSave: (settings: ISettings) => void
}

const SettingsComponent: React.FC<ISettingsComponentProps> = props => {
  const [settings, setSettings] = useState<ISettings>(props.settings)
  const onSettingFieldChange = (value: string, field: keyof ISettings) => {
    setSettings({ ...settings, [field]: value })
  }

  useEffect(() => {
    setSettings(props.settings)
  }, [props.settings])

  const onSave = () => {
    props.onSave(settings)
  }

  return (
        <Grid container columns="equal" centered>
            <Grid.Column style={{ backgroundColor: 'white' }}>
                <h3>Club settings</h3>
                <Form loading={props.loading}>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Input
                                label={<label>Club name</label>}
                                value={settings.business_name}
                                onChange={e => onSettingFieldChange(e.target.value, 'business_name')}
                                />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="3">
                        <Form.Field width={12}>
                            <Input
                                label={<label>Address</label>}
                                value={settings.address}
                                onChange={e => onSettingFieldChange(e.target.value, 'address')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                label={<label>Zip Code</label>}
                                value={settings.zip_code}
                                onChange={e => onSettingFieldChange(e.target.value, 'zip_code')}
                                maxLength={5}
                                numeric
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                maxLength={2}
                                label={<label>Province</label>}
                                value={settings.province}
                                onChange={e => onSettingFieldChange(e.target.value, 'province')}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Input
                                label={<label>Phone</label>}
                                value={settings.phone}
                                onChange={e => onSettingFieldChange(e.target.value, 'phone')}
                                />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                label={<label>Fax</label>}
                                value={settings.fax}
                                onChange={e => onSettingFieldChange(e.target.value, 'fax')}
                                />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Input
                                label={<label>VAT Code</label>}
                                value={settings.vat_code}
                                onChange={e => onSettingFieldChange(e.target.value, 'vat_code')}
                                />
                        </Form.Field>
                    </Form.Group>
                    <Button
                        primary
                        onClick={onSave}
                        disabled={props.loading}
                        >Save</Button>
                </Form>
            </Grid.Column>
        </Grid>
  )
}

export default SettingsComponent
