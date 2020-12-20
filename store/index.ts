import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { sessionReducer } from './sessionSlice'
import { userReducer } from './userSlice'
import { allQuizesReducer } from './allQuizesSlise'
import { themeReducer } from './themeSlice'
import { myQuizesReducer } from './myQuizesSlice'

export const initStore = (initialState: Record<string, any>) =>
  configureStore({
    reducer: {
      session: sessionReducer,
      user: userReducer,
      allQuizes: allQuizesReducer,
      myQuizes: myQuizesReducer,
      theme: themeReducer,
    },
    preloadedState: initialState,
  })

// this call is only for extracting RootState
// didn't find better way to do it
const store = initStore({})
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
export type AppDispatch = typeof store.dispatch

export { restoreSession, signinUser, signupUser } from './sessionSlice'
export { getAllQuizes } from './allQuizesSlise'
export { getMyQuizes, removeMyQuiz } from './myQuizesSlice'
export { updateUser } from './userSlice'
export { changeTheme } from './themeSlice'
