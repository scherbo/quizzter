import { createSlice } from '@reduxjs/toolkit'

import { Request } from '#root/utils'
import { SigninState, SignupState } from '#root/types'

const { actions: userActions, reducer: userReducer } = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    theme: 'light',
    name: null,
    email: null,
    error: null,
  },
  reducers: {
    userLoading(state) {
      return {
        ...state,
        loading: true,
      }
    },
    userLoaded(state, action) {
      return {
        ...state,
        ...action.payload,
        loading: false,
      }
    },
    userFailed(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    },
  },
})

export const singinUser = async (dispatch: any, data: SigninState, cb: () => void) => {
  dispatch(userActions.userLoading())

  const { error } = await Request.signin(data)

  if (error) {
    dispatch(userActions.userFailed(error))
  } else {
    cb()
  }
}

export const signupUser = async (dispatch: any, data: SignupState, cb: () => void) => {
  dispatch(userActions.userLoading())

  const { error } = await Request.signup(data)

  if (error) {
    dispatch(userActions.userFailed(error))
  } else {
    cb()
  }
}

export const updateUser = async (dispatch: any, data: any) => {
  dispatch(userActions.userLoading())

  const { error, data: newData } = await Request.updateUser(data)

  if (error) {
    dispatch(userActions.userFailed(error))
  } else {
    dispatch(userActions.userLoaded(newData))
  }
}

export { userActions, userReducer }
