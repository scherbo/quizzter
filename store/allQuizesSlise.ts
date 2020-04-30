import { createSlice } from '@reduxjs/toolkit'

import { Request } from '#root/utils'

const { actions: allQuizesActions, reducer: allQuizesReducer } = createSlice({
  name: 'allQuizes',
  initialState: {
    loading: false,
    quizes: [],
    error: null,
  },
  reducers: {
    allQuizesLoading(state) {
      return {
        ...state,
        loading: true,
      }
    },
    allQuizesLoaded(state, action) {
      return {
        ...state,
        quizes: action.payload,
        loading: false,
      }
    },
    allQuizesFailed(state, action) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    },
  },
})

export const getAllQuizes = async (dispatch: any) => {
  dispatch(allQuizesActions.allQuizesLoading())

  const { error, data } = await Request.getAllQuizes()

  if (error) {
    dispatch(allQuizesActions.allQuizesFailed(error.message))
  } else {
    dispatch(allQuizesActions.allQuizesLoaded(data))
  }
}

export { allQuizesActions, allQuizesReducer }
