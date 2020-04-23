import { NextPageContext } from 'next'
import { isServer } from './index'

const reduceCookies = (cookies: string): Record<string, any> =>
  cookies.split(';').reduce((acc, cur) => {
    const [key, value] = cur.trim().split('=')
    return {
      ...acc,
      [key]: value,
    }
  }, {})

type getCookiesProps = {
  ctx: NextPageContext
  key?: string
}

export const getCookies = ({ ctx, key }: getCookiesProps) => {
  if (isServer()) {
    return key ? reduceCookies(ctx.req?.headers.cookie || '')[key] : reduceCookies(ctx.req?.headers.cookie || '')
  }

  return key ? reduceCookies(document.cookie)[key] : reduceCookies(document.cookie)
}
