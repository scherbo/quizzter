import { createSlice } from '@reduxjs/toolkit'

import { Request } from '#root/utils'

import { userActions } from './userSlice'

const { actions: sessionActions, reducer: sessionReducer } = createSlice({
  name: 'session',
  initialState: {
    loading: false,
    authenticated: false,
    error: null,
  },
  reducers: {
    sessionLoading(state) {
      return {
        ...state,
        loading: true,
      }
    },
    sessionLoaded(state) {
      return {
        ...state,
        loading: false,
        authenticated: true,
      }
    },
    sessionFailed(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
  },
})

export const restoreSession = async (dispatch: any, cookie: string) => {
  dispatch(sessionActions.sessionLoading())

  const { error, data } = await Request.getSession(cookie)

  if (error) {
    dispatch(sessionActions.sessionFailed(error))
  } else {
    dispatch(sessionActions.sessionLoaded())
    dispatch(userActions.userLoaded(data))
  }
}

export { sessionActions, sessionReducer }
