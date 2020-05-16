import React from 'react'
import { Provider, useSelector } from 'react-redux'
import { ThemeProvider } from 'emotion-theming'
import { AppProps } from 'next/app'

import { lightTheme, darkTheme } from '#root/theme'
import { Layout } from '#root/components'
import { isServer } from '#root/utils'
import { restoreSession, RootState } from '#root/store'
import { MyAppProps, ExtendedAppContext } from '#root/types'
import withRedux from '#root/lib/withRedux'

/*
  I needed to rerender the whole application on theme change
  so I had to make to comopnents
*/
const AppWithStoreProvider = ({ store, ...rest }: MyAppProps) => {
  return (
    <Provider store={store}>
      <App {...rest} />
    </Provider>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useSelector<RootState, string>((s) => s.user.theme)

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

AppWithStoreProvider.getInitialProps = async ({ Component, ctx }: ExtendedAppContext) => {
  if (isServer()) {
    await restoreSession(ctx.store.dispatch, ctx.req?.headers?.cookie || '')
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return { pageProps }
}

export default withRedux(AppWithStoreProvider)
