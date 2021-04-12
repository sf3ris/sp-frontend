import React, { useEffect } from 'react'
import DefaultLayout from '../layout/DefaultLayout'
import SettingsComponent from '../component/settings/settings.component'
import { useDispatch, useSelector } from 'react-redux'
import { getSettings, saveSettings } from '../features/settings/slices/settingsSlice'
import { RootState } from '../core/store'
import { ISettings } from '../features/settings/interfaces/ISettings'

const SettingsContainer : React.FC<{}> = props => {
  const dispatch = useDispatch()
  const settingsState = useSelector(
    (state: RootState) => state.settingsState
  )

  useEffect(() => {
    dispatch(getSettings())
  }, [])

  const onSave = (settings: ISettings): void => {
    dispatch(saveSettings(settings))
  }

  return (
        <DefaultLayout >
            <SettingsComponent
                settings={settingsState.settings}
                loading={settingsState.loading}
                onSave={onSave}
            />
        </DefaultLayout>
  )
}

export default SettingsContainer
