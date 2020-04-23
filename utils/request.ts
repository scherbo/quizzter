import ky from 'ky-universal'

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'http://quizzr-web.herokuapp.com'
const SIGNIN = 'signin'
const SIGNUP = 'signup'
const PING = 'ping'

type UserSignInData = {
  email: string
  password: string
}

type UserSignUpData = UserSignInData & {
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

  async signIn(data: UserSignInData): Promise<Record<string, any>> {
    try {
      return await this.request.post(SIGNIN, { json: data }).json()
    } catch (error) {
      console.error('SIGNIN ERROR: ', error.message)
      return { error: error.message }
    }
  }

  async signUp(data: UserSignUpData): Promise<Record<string, any>> {
    try {
      return await this.request.post(SIGNUP, { json: data }).json()
    } catch (error) {
      console.log('SIGNUP ERROR: ', error.message)
      return { error: error.message }
    }
  }
}

export const Request = new RequestConstructor()
