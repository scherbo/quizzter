import { AppProps, AppContext } from 'next/app'
import { NextPageContext } from 'next'
import { Store } from '@reduxjs/toolkit'

export type MyAppProps = AppProps & { store: Store }
export type ExtendedNextPageContext = NextPageContext & { store: Store }
export type ExtendedAppContext = AppContext & { ctx: ExtendedNextPageContext }

export type SigninState = {
  email: string
  password: string
}

export type SignupState = {
  name: string
  email: string
  password: string
  passwordRepeat: string
}

export interface Answer {
  answer: string
  correct: boolean
  _id: string
}

export interface Question {
  question: string
  answers: Answer[]
  _id: string
}

export type QuizData = {
  title: string
  description: string
  questions: Question[]
}
