import { createSlice } from '@reduxjs/toolkit'

import { Request } from '#root/utils'
import { AppThunk } from '.'

const { actions: userActions, reducer: userReducer } = createSlice({
  name: 'user',
  initialState: {
    loading: false,
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

export const updateUser = (data: any): AppThunk => async (dispatch) => {
  dispatch(userActions.userLoading())

  const { error, data: newData } = await Request.updateUser(data)

  if (error) {
    dispatch(userActions.userFailed(error))
  } else {
    dispatch(userActions.userLoaded(newData))
  }
}

export { userActions, userReducer }
