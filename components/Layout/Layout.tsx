import React from 'react'
import { useTheme } from 'emotion-theming'

import { Header, Grid, GlobalStyles } from '#root/components'

export const Layout = ({ children }: { children: React.ReactChild }) => {
  const theme = useTheme<any>()

  return (
    <>
      <GlobalStyles />
      <Grid.Layout templateRows="50px 1fr" css={{ minHeight: '100vh', backgroundColor: theme.colors.background }}>
        <Header />
        <main>{children}</main>
      </Grid.Layout>
    </>
  )
}
