import { createSlice } from '@reduxjs/toolkit'

import { Request } from '#root/utils'

import { AppThunk } from '.'

const { actions: myQuizesActions, reducer: myQuizesReducer } = createSlice({
  name: 'myQuizes',
  initialState: {
    loading: false,
    quizes: [],
    error: null,
  },
  reducers: {
    loading(state) {
      return {
        ...state,
        loading: true,
      }
    },
    loaded(state, action) {
      return {
        ...state,
        quizes: action.payload,
        loading: false,
      }
    },
    failed(state, action) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    },
  },
})

export const getMyQuizes = (cookie: string): AppThunk => async (dispatch) => {
  dispatch(myQuizesActions.loading())

  const { error, data } = await Request.getOwnersQuizes(cookie)

  if (error) {
    dispatch(myQuizesActions.failed(error.message))
  } else {
    dispatch(myQuizesActions.loaded(data))
  }
}

export const removeMyQuiz = (id: string): AppThunk => async (dispatch) => {
  dispatch(myQuizesActions.loading())

  // returns updated list of quizes
  const { error, data } = await Request.removeMyQuiz(id)

  if (error) {
    dispatch(myQuizesActions.failed(error.message))
  } else {
    dispatch(myQuizesActions.loaded(data))
  }
}

export { myQuizesActions, myQuizesReducer }
