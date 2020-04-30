import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer } from './sessionSlice'
import { allQuizesReducer } from './allQuizesSlise'

export const initStore = (initialState: Record<string, any>) =>
  configureStore({
    reducer: {
      session: sessionReducer,
      allQuizes: allQuizesReducer,
    },
    preloadedState: initialState,
  })

// this call is only for extracting RootState
// didn't find better way to do it
const store = initStore({})
export type RootState = ReturnType<typeof store.getState>
export { restoreSession } from './sessionSlice'
export { getAllQuizes } from './allQuizesSlise'
