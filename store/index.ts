import { configureStore } from '@reduxjs/toolkit'
import { sessionReducer } from './sessionSlice'
import { userReducer } from './userSlice'
import { allQuizesReducer } from './allQuizesSlise'

export const initStore = (initialState: Record<string, any>) =>
  configureStore({
    reducer: {
      session: sessionReducer,
      user: userReducer,
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
export { singinUser, signupUser, updateUser } from './userSlice'
