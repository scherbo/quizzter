import React from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { ThemeProvider } from 'emotion-theming'
import { AppProps } from 'next/app'

import { lightTheme, darkTheme } from '#root/theme'
import { Layout } from '#root/components'
import { isServer } from '#root/utils'
import { restoreSession, RootState, changeTheme } from '#root/store'
import { MyAppProps, ExtendedAppContext } from '#root/types'
import withRedux from '#root/lib/withRedux'

/*
  I needed to rerender the whole application on theme change
  so I had to make two comopnents
*/
const AppWithStoreProvider = ({ store, ...rest }: MyAppProps) => {
  return (
    <Provider store={store}>
      <App {...rest} />
    </Provider>
  )
}

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useSelector<RootState, string>((s) => s.theme)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    dispatch(changeTheme(savedTheme))
  }, [])

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
    await ctx.store.dispatch(restoreSession(ctx.req?.headers?.cookie || '') as any)
  }

  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

  return { pageProps }
}

export default withRedux(AppWithStoreProvider)
