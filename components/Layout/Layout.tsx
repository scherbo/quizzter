import React from 'react'
import { useTheme } from 'emotion-theming'
import { useRouter } from 'next/router'

import { Header, Grid, GlobalStyles, Link } from '#root/components'

export const Layout = ({ children }: { children: React.ReactChild }) => {
  const theme = useTheme<any>()
  const { pathname } = useRouter()

  const paddingTop = React.useMemo(() => (pathname === '/' ? 0 : 50), [pathname])

  return (
    <>
      <GlobalStyles />
      <Grid.Layout templateRows="50px 1fr" css={{ minHeight: '100vh', backgroundColor: theme.colors.background }}>
        <Header />
        <main css={{ paddingTop }}>{children}</main>
        <footer css={{ padding: '20px 0', textAlign: 'center' }}>
          created by{' '}
          <Link href="https://github.com/scherbo" size="sm" target="_blank" external>
            Sergey Scherbo
          </Link>
        </footer>
      </Grid.Layout>
    </>
  )
}
