import { createSlice } from '@reduxjs/toolkit'

import { AppThunk } from '.'

export const { actions: themeActions, reducer: themeReducer } = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    toggle(_, actions) {
      return actions.payload
    },
  },
})

export const changeTheme = (newTheme: string): AppThunk => async (dispatch) => {
  localStorage.setItem('theme', newTheme)
  dispatch(themeActions.toggle(newTheme))
}
