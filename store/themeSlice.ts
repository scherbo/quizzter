import { createSlice } from '@reduxjs/toolkit'

export const { actions: themeActions, reducer: themeReducer } = createSlice({
  name: 'theme',
  initialState: 'light',
  reducers: {
    toggle(_, actions) {
      return actions.payload
    },
  },
})

export const changeTheme = (dispatch: any, newTheme: string) => {
  localStorage.setItem('theme', newTheme)
  dispatch(themeActions.toggle(newTheme))
}
