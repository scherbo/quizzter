import React from 'react'

import { Header, Grid, GlobalStyles } from '#root/components'

export const Layout = ({ children }: { children: React.ReactChild }) => (
  <>
    <GlobalStyles />
    <Grid.Layout templateRows="50px 1fr" css={{ minHeight: '100vh' }}>
      <Header />
      <main>{children}</main>
    </Grid.Layout>
  </>
)
