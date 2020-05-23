import React from 'react'
import { useTheme } from 'emotion-theming'
import { useRouter } from 'next/router'

import { Grid, GlobalStyles } from '#root/components'
import { Header, Footer } from './components'

export const Layout = ({ children }: { children: React.ReactChild }) => {
  const theme = useTheme<any>()
  const { pathname } = useRouter()

  const paddingTop = React.useMemo(() => (pathname === '/' ? 0 : 50), [pathname])

  return (
    <>
      <GlobalStyles />
      <Grid.Layout templateRows="50px 1fr auto" css={{ minHeight: '100vh', backgroundColor: theme.colors.background }}>
        <Header />
        <main css={{ paddingTop }}>{children}</main>
        <Footer />
      </Grid.Layout>
    </>
  )
}
