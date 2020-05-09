import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ThemeProvider } from 'emotion-theming'
import { parseCookies } from 'nookies'

import { lightTheme, darkTheme } from '#root/theme'
import { Layout } from '#root/components'
import { isServer } from '#root/utils'
import { restoreSession, RootState } from '#root/store'
import { MyAppProps, ExtendedAppContext } from '#root/types'
import withRedux from '#root/lib/withRedux'

const MyApp = ({ Component, pageProps, store }: MyAppProps) => {
  const {
    user: { theme },
  } = store.getState()

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }: ExtendedAppContext) => {
  if (isServer()) {
    await restoreSession(ctx.store.dispatch, ctx.req?.headers?.cookie || '')
    console.log('PARSED COOKIES', parseCookies(ctx))
    // console.log('APP CONTEXT', ctx.req)
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return { pageProps }
}

export default withRedux(MyApp)
