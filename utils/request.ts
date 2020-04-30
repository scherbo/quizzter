import ky from 'ky-universal'

import { QuizData } from '#root/types'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://quizzr-api.herokuapp.com'
const SIGNIN = 'signin'
const SIGNUP = 'signup'
const PING = 'ping'
const QUIZ = 'quiz'

type UserSigninData = {
  email: string
  password: string
}

type UserSignupData = UserSigninData & {
  name: string
}

class RequestConstructor {
  request = ky.create({ prefixUrl: BASE_URL, credentials: 'include' })

  async getSession(cookie: string): Promise<Record<string, any>> {
    try {
      return await this.request.get(PING, { headers: { Cookie: cookie } }).json()
    } catch (error) {
      console.error('PING ERROR: ', error.message)
      return { error: error.message }
    }
  }

  async signin(data: UserSigninData): Promise<Record<string, any>> {
    try {
      return await this.request.post(SIGNIN, { json: data }).json()
    } catch (error) {
      console.error('SIGNIN ERROR: ', error.message)
      return { error: error.message }
    }
  }

  async signup(data: UserSignupData): Promise<Record<string, any>> {
    try {
      return await this.request.post(SIGNUP, { json: data }).json()
    } catch (error) {
      console.log('SIGNUP ERROR: ', error.message)
      return { error: error.message }
    }
  }

  async createQuiz(data: QuizData): Promise<Record<string, any>> {
    try {
      return await this.request.post(QUIZ, { json: data }).json()
    } catch (error) {
      console.log('CREATE QUIZ ERROR: ', error.message)
      return { error: error.message }
    }
  }

  async getAllQuizes(): Promise<Record<string, any>> {
    try {
      return await this.request.get(`${QUIZ}/all`).json()
    } catch (error) {
      console.log('GET ALL QUIZES ERROR: ', error)
      return { error: error.message }
    }
  }

  async getQuiz(id: string): Promise<Record<string, any>> {
    try {
      return await this.request.get(`${QUIZ}/${id}`).json()
    } catch (error) {
      console.log(`GET QUIZ ${id} ERROR: `, error)
      return { error: error.message }
    }
  }
}

export const Request = new RequestConstructor()
