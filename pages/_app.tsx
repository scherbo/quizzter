import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'emotion-theming'

import { theme } from '#root/theme'
import { Layout } from '#root/components'
import { isServer } from '#root/utils'
import { restoreSession } from '#root/store'
import { MyAppProps, ExtendedAppContext } from '#root/types'
import withRedux from '#root/lib/withRedux'

const MyApp = ({ Component, pageProps, store }: MyAppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
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
    console.log('APP CONTEXT', ctx.req)
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return { pageProps }
}

export default withRedux(MyApp)
