import { ISettings } from '../interfaces/ISettings'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../../../core/store'
import { settingsService } from '../services/settings.service'

export interface ISettingsState {
    settings: ISettings;
    loading: boolean;
    error: {
        message: string|undefined;
        status: number|undefined;
    }
}

const initialState = {
  settings: {
    business_name: '',
    address: '',
    zip_code: '',
    fax: '',
    phone: '',
    vat_code: '',
    province: '',
    city: ''
  },
  loading: false,
  error: {
    message: undefined,
    status: undefined
  }
}

const settingsSlices = createSlice({
  name: 'settingsState',
  initialState,
  reducers: {
    settingsFetching (state: ISettingsState, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },

    settingsFetchedSuccessfully (state: ISettingsState, action: PayloadAction<ISettings>) {
      state.settings = action.payload
      state.loading = false
    },

    settingsFetchedWithError (state: ISettingsState, action: PayloadAction<{message: string, status: number}>) {
      state.error = { ...action.payload }
      state.loading = false
    }
  }
})

export const { settingsFetching, settingsFetchedSuccessfully, settingsFetchedWithError } = settingsSlices.actions
export default settingsSlices.reducer

export const getSettings = () : AppThunk => async dispatch => {
  try {
    dispatch(settingsFetching(true))
    const response = await settingsService.getSettings()
    dispatch(settingsFetchedSuccessfully(response.data))
  } catch (e) {
    dispatch(settingsFetchedWithError({ message: '', status: e.response?.status || 500 }))
  }
}

export const saveSettings = (settings: ISettings): AppThunk => async dispatch => {
  try {
    dispatch(settingsFetching(true))
    const response = await settingsService.putSettings(settings)
    dispatch(settingsFetchedSuccessfully(response.data))
  } catch (e) {
    dispatch(settingsFetchedWithError({ message: '', status: e.response.status }))
  }
}
