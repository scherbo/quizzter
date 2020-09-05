import { createSlice } from '@reduxjs/toolkit'
import { setCookie } from 'nookies'

import { Request } from '#root/utils'
import { UNAUTHORIZED } from '#root/constants'
import { SigninState, SignupState } from '#root/types'
import { AppThunk } from '.'

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

export const restoreSession = (cookie: string): AppThunk => async (dispatch) => {
  dispatch(sessionActions.sessionLoading())

  const { error } = await Request.getSession(cookie)

  if (error) {
    dispatch(sessionActions.sessionFailed(UNAUTHORIZED))
  } else {
    dispatch(sessionActions.sessionLoaded())
  }
}

export const signinUser = (data: SigninState): AppThunk => async (dispatch) => {
  dispatch(sessionActions.sessionLoading())

  const { error, data: responseData } = await Request.signin(data)

  if (error) {
    dispatch(sessionActions.sessionFailed(error))
  } else {
    setCookie(null, 'token', responseData.token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    location.assign('/')
  }
}

export const signupUser = (data: SignupState): AppThunk => async (dispatch) => {
  dispatch(sessionActions.sessionLoading())

  const { error } = await Request.signup(data)

  if (error) {
    dispatch(sessionActions.sessionFailed(error))
  } else {
    location.assign('/')
  }
}

export { sessionActions, sessionReducer }
